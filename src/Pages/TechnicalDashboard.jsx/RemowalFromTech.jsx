import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';

export default function RemowalFromTech() {
  const [removal, setRemoval] = useState({
    id: "",
    make: "",
    model: "",
    sales_per: "",
    color: "",
    client_id: "",
    customer_name: "",
    reg_no: "",
    device: "",
    eng_no: "",
    chasis: "",
    contact_no: "",
    representative: "",
    remarks: "",
    install_loc: "",
    install_date: ""
  });

  const cookies = new Cookies();
  const [search_term, setSearch_term] = useState("")
  const [empName, setEmpName] = useState("") // Corrected initialization

  let value, name;

  const getUserdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setRemoval({ ...removal, [name]: value });
    console.log(removal);
  };

  const SubmitRemoval = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/createremoval`,
        removal,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Removal Done")
      } else {
        toast.error("Internal Server Error");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 420) {
        console.log(err);
        // setMsg(err.response.data.message);
        // setErrorPopup(true);
        // console.log("Removal already done")
        toast.error(err.response.data.message)
      } else if (err.response.status === 404) {
        console.log(err);
        toast.error(err.response.data.message)
      } else if (err.response.status === 402) {
        console.log(err);
        toast.error("Please Fill All the Feilds")
      }
    }
  };

  const getRemoavalData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/removal_search`,
        { search_term: search_term }
      );
      
      // Log the entire response object to inspect its structure
      console.log(response);
      
      // Check if the response is successful and contains the expected data
      if (response && response.data && response.data.data) {
        const responseData = response.data.data;
        setRemoval({
          id: responseData.removal_id,
          make: responseData.user.make,
          model: responseData.user.model,
          color: responseData.user.color,
          client_id: responseData.user.id,
          customer_name: responseData.user.customer_name,
          reg_no: responseData.user.registeration_no,
          device: responseData.device.device_serialno,
          eng_no: responseData.user.engine_no,
          chasis: responseData.user.chasis_no,
          contact_no: responseData.user.mobileno_1,
          sales_per: responseData.user.sales_person,
          representative: empName,
          install_loc: responseData.user.installation_loc,
          install_date: responseData.user.date_of_installation
        });
        console.log(removal);
      } else {
        console.error("Unexpected response structure:", response);
        // Handle unexpected response structure or missing data
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 422) {
         toast.error("Please Enter Registration Number First ")
        }
        else if (error.response.status === 400) {
          setRemoval({
            id: "",
            make: "",
            model: "",
            sales_per: "",
            color: "",
            client_id: "",
            customer_name: "",
            reg_no: "",
            device: "",
            eng_no: "",
            chasis: "",
            contact_no: "",
            representative: "",
            remarks: "",
            install_loc: "",
            install_date: ""
          })
          // console.log(error.response.data.message)
          toast.error(error.response.data.message)
        }
        else {
          toast.error("Internal Server Error")
        }
    }
  };
  
  useEffect(() => {
    console.log(search_term)
    console.log(removal)
    const emp_name = cookies.get('name');
    setEmpName(emp_name)
  }, [removal, search_term])


  return (
    <div className='p-3'>
      <ToastContainer />
      <div className='flex justify-content-center mb-8'>
        <input className='w-96 mx-4  p-2' placeholder='Enter Device Id' onChange={(e) => setSearch_term(e.target.value)} />
        <button className='theme_btn_md mx-4 rounded' onClick={getRemoavalData}>Search</button>
      </div>

      <div className='flex grid lg:grid-cols-2 gap-x-2 md:grid-co ls-1'>

        <div className=' flex flex-col justify-center space-y-3'>
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Customer Name  :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} value={removal.customer_name} readOnly />
          </div>
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Contact Number :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} onChange={getUserdata} value={removal.contact_no} name="mobileno_1" readOnly />
          </div>
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Registration Number:</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} onChange={getUserdata} value={removal.reg_no} name="registeration_no" readOnly />
          </div>
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Sales Person :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} onChange={getUserdata} value={removal.sales_per} name="sales_person" readOnly />
          </div>
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Make / Model :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} value={removal.make} readOnly />
          </div>
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Color :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} value={removal.color} readOnly />
          </div>
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Device :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} value={removal && removal.device} readOnly />
          </div>
        </div >
        <div className='space-y-3'>
          <div className=' flex flex-col justify-center space-y-3'>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Engine Number :</p><input className=' ml-3 p-1 custum_input cursor-not-allowed' style={{ width: "55%" }} value={removal.eng_no} onChange={getUserdata} name="engine_no" readOnly /> </div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Chassis Number :</p><input className=' ml-3 p-1 custum_input cursor-not-allowed' style={{ width: "55%" }} value={removal.chasis} onChange={getUserdata} name="chasis_no" readOnly /> </div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Install Location :</p><input className=' ml-3 p-1 custum_input cursor-not-allowed' style={{ width: "55%" }} value={removal.install_loc} onChange={getUserdata} name="installation_loc" readOnly /> </div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Date :</p><input type="date" className=' ml-3 p-1 custum_input cursor-not-allowed' style={{ width: "55%" }} value={removal.install_date} onChange={getUserdata} name="date_of_installation" readOnly /> </div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Remarks :</p><input className=' ml-3 p-1 ' style={{ width: "55%" }} value={removal.remarks} onChange={getUserdata} name="remarks" /> </div>
          </div>
        </div>
      </div>
      <button className='theme_btn_md rounded-0 float-end my-3' onClick={SubmitRemoval}>Submit</button>
    </div>
  )
}
