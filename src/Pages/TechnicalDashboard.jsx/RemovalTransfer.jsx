import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';

export default function RemowalTransfer() {
  const navigate = useNavigate();
  const [removal, setRemoval] = useState({
    client_id: "",
    old_reg: "",
    old_chasis: "",
    old_eng: "",
    old_make: "",
    old_model: "",
    old_cc: "",
    old_color: "",
    old_trans: "",
    old_mob: "",
    old_device: "",
    new_reg: "",
    new_chasis: "",
    new_eng: "",
    new_make: "",
    new_cc: "",
    new_color: "",
    new_trans: "",
    new_mob: "",
    remarks: "",
    customer_name: "",
    old_year: "",
    new_year: "",
    new_model: "",
    new_device: "",
    old_inst_date: "",
    new_inst_date: "",
    representative: "",
    eng_type:"",
    mobilizer:"",
    device_id:""
  });

  const cookies = new Cookies();
  const [search_term, setSearch_term] = useState("")
  const [empName, setEmpName] = useState("") // Corrected initialization
  const [apiResult, setApiResult] = useState([]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  let value, name;

  const getUserdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "registeration_no") {
      // Convert the value to uppercase
      const uppercaseValue = value.toUpperCase();

      // Update the state with the uppercase value
      setRemoval({
        ...removal,
        [name]: uppercaseValue
      })
    }
    else {
      setRemoval({
        ...removal,
        [name]: value,
        representative: empName,
      });
      console.log(removal);
    }
  };

  const getDeviceData = async (e) => {
    const { name, value } = e.target;
    if (name === "new_device") {
      setIsListOpen(value.trim().length === 0);
      setIsListOpen(false) // Close list only if value is not empty
    }

    const search_term = [value];
    setRemoval({ ...removal, [name]: value });
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/getdevices`,
        { search_term: value },
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      setApiResult(response.data.data || [])
      console.log(apiResult);
      setIsListOpen(true)
    }
    catch (error) {
      console.log(error)
    }
  };

  const handleDeviceIdSelect = (deviceId, vender, imei, sim) => {
    setSelectedDeviceId(deviceId);
    setRemoval(removal => ({
      ...removal,
      new_device: deviceId,
    }));
    setIsListOpen(false)
  };

  const getRemoavalData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/removalate`,
        { search_term: search_term }
      );
      if (response.status == 200) {

        if (!empName) {
          console.log(empName)
        }
        console.log(response)
        setRemoval({
          ...removal,
          client_id: response.data.user.id,
          old_reg: response.data.user.registeration_no,
          old_chasis: response.data.user.chasis_no,
          old_eng: response.data.user.engine_no,
          old_make: response.data.user.make,
          old_model: response.data.user.model,
          old_cc: response.data.user.CC,
          old_color: response.data.user.color,
          old_trans: response.data.user.transmission,
          old_mob: response.data.user.mobileno_1,
          old_device: response.data.device.device,
          customer_name: response.data.user.customer_name,
          old_year: response.data.user.year,
          old_inst_date: response.data.user.date_of_installation,
          device_id:response.data.device.device_id
          // new_device:response.data.device.device
        })
        console.log(removal)
        return
      }
    }
    catch (error) {
      console.log(error)
      if (error.response.status === 402) {
        toast.error("Please Enter A Valid Registration Number")
      }
      else if (error.response.status === 401) {
        console.log(error);
        toast.error("Removal Already Done")
      }
      else if (error.response.status === 400) {
        setRemoval({
          client_id: "",
          old_reg: "",
          old_chasis: "",
          old_eng: "",
          old_make: "",
          old_model: "",
          old_cc: "",
          old_color: "",
          old_trans: "",
          old_mob: "",
          old_device: "",
          new_reg: "",
          new_chasis: "",
          new_eng: "",
          new_make: "",
          new_cc: "",
          new_color: "",
          new_trans: "",
          new_mob: "",
          remarks: "",
          customer_name: "",
          old_year: "",
          new_year: "",
          new_model: "",
          new_device: ""
        })
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
      }
      else {
        toast.error("Internal Server Error")
      }
    }
  };

  const SubmitRemoval = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/create_removal_transfer`,
        removal,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      if (response.status === 200) {
        toast.success("Removal TransFer Done")
        setTimeout(() => {
          navigate('/tech'); 
      }, 3000);
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
      } 
      else if (err.response.status === 400) {
        console.log(err);
        toast.error(err.response.data.message)
      }
      else if (err.response.status === 402) {
        console.log(err);
        toast.error("Please Fill All the Feilds")
      }
    }
  };

  useEffect(() => {
    const emp_name = cookies.get('name');
    setEmpName(emp_name)
  }, [removal])


  return (
    <div className='p-3'>
      <ToastContainer />
      <div className='flex justify-content-center mb-8'>
        <input className='w-96 mx-4  p-2' placeholder='Enter Registration , Engine or  Chassis Number ' onChange={(e) => setSearch_term(e.target.value)} />
        <button className='theme_btn_md mx-4 rounded' onClick={getRemoavalData}>Search</button>
      </div>

      <div className='flex grid lg:grid-cols-2 gap-x-2 md:grid-co ls-1'>

        <div className=' flex flex-col justify-center space-y-3'>
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Customer Name  :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} value={removal.customer_name} readOnly />
          </div>
          {/* <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Old Contact Number :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} onChange={getUserdata} value={removal.old_mob} name="mobileno_1" readOnly />
          </div> */}
          {/* <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}>  Contact Number :</p>
            <input className='ml-3 p-1 custom_input ' style={{ width: "55%" }} onChange={getUserdata} name="new_mob" />
          </div> */}
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Old Registration Number:</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} onChange={getUserdata} value={removal.old_reg} name="registeration_no" readOnly />
          </div>
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> New Registration Number:</p>
            <input className='ml-3 p-1 custom_input ' style={{ width: "55%" }} onChange={getUserdata} name="new_reg" />
          </div>
          {/* <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}>  Old Make :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} value={removal.old_make} readOnly />
          </div> */}
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}>  Make  :</p>
            <input className='ml-3 p-1 custom_input ' style={{ width: "55%" }} name='new_make' onChange={getUserdata} />
          </div>
          {/* <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Old Model :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} value={removal.old_model} readOnly />
          </div> */}
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}>  Model :</p>
            <input className='ml-3 p-1 custom_input ' style={{ width: "55%" }} name='new_model' onChange={getUserdata} />
          </div>
          {/* <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Old Year :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed  ' style={{ width: "55%" }} value={removal && removal.old_year}  readOnly/>
          </div> */}
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}>  Year :</p>
            <input className='ml-3 p-1 custom_input ' style={{ width: "55%" }} name='new_year' onChange={getUserdata} />
          </div>
          {/* <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Old  Color :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} value={removal.old_color} readOnly />
          </div> */}
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}>  Color :</p>
            <input className='ml-3 p-1 custom_input ' style={{ width: "55%" }} name='new_color' onChange={getUserdata} />
          </div>
          {/* <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}> Old Device :</p>
            <input className='ml-3 p-1 custom_input cursor-not-allowed' style={{ width: "55%" }} value={removal && removal.old_device} readOnly />
          </div> */}
          <div className='flex justify-center'>
            <p className='text-start text-sm' style={{ width: "40%" }}>  Device :</p>
            <input className='ml-3 p-1 custom_input ' style={{ width: "55%" }} value={removal && removal.new_device} name='new_device' onChange={getDeviceData} />

          </div>
          {isListOpen && (
            <div className='flex justify-center my-2 relative' >
              <div className='absolute -top-2 right-2 z-0 bg-white overflow-y-scroll shadow' style={{ width: "55%", maxHeight: "300px" }}>
                <div className='flex flex-col justify-center items-center  space-y-2  p-2'>
                  {apiResult.map(item => (
                    <div key={item.id} className='w-100 hover:bg-gray-300 p-1' onClick={() => handleDeviceIdSelect(item.device_serialno, item.vendor, item.imei_no, item.sim.id)}>
                      {item.device_serialno}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div >
        <div className='space-y-3'>
          <div className=' flex flex-col justify-center space-y-3'>
            {/* <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Old Engine Number :</p><input className=' ml-3 p-1 custum_input cursor-not-allowed' style={{ width: "55%" }} value={removal.old_eng} readOnly /> </div> */}
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}>  Engine Number :</p><input className=' ml-3 p-1 custum_input' style={{ width: "55%" }} onChange={getUserdata} name="new_eng" /> </div>
            {/* <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Old Chassis Number :</p><input className=' ml-3 p-1 custum_input cursor-not-allowed' style={{ width: "55%" }} value={removal.old_chasis} onChange={getUserdata} name="chasis_no" readOnly /> </div> */}
            {/* <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Old Transmision :</p><input className=' ml-3 p-1 custum_input cursor-not-allowed' style={{ width: "55%" }} value={removal.old_trans} onChange={getUserdata} name="chasis_no" readOnly /> </div> */}
            {/* <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}>  Transmision :</p><input className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} onChange={getUserdata} name="new_trans" /> </div> */}
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Transmission :</p>
              {/* <input onChange={getUserData} name="transmission" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> */}
              <select className='input-field  ml-4 p-1  border bg-white' name='new_trans' onChange={getUserdata} style={{ width: "55%" }} aria-label=".form-select-lg example">
                <option value="">Select Transmission </option>
                <option value="Auto">Auto </option>
                <option value="Manual">Manual </option>
              </select>
            </div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Engine Type  :</p>
                  {/* <input onChange={getUserData} name="engine_type" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} />  */}
                  <select className='input-field  ml-4 p-1  border bg-white' name='eng_type' onChange={getUserdata} style={{ width: "55%" }} aria-label=".form-select-lg example">
                    <option value="">Select Engine Type </option>
                    <option value="Petrol">Petrol </option>
                    <option value="Diesel">Diesel </option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
            <div className='flex justify-around ' >
              <div className='w-50'>
                Mobilizer
              </div>
              <div className='flex justify-around space-x-5'>
                <div class="form-check">
                  <input class="border" type="radio" name="mobilizer" value="Yes" onChange={getUserdata} />
                  <label class="ml-3" for="new_mob">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input class="border" type="radio" name="mobilizer" value="No" onChange={getUserdata} />
                  <label class="ml-3" for="new_mob">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}>  Chassis Number :</p><input className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} onChange={getUserdata} name="new_chasis" /> </div>
            {/* <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Old cc :</p><input className=' ml-3 p-1 custum_input cursor-not-allowed' style={{ width: "55%" }} value={removal.old_cc} onChange={getUserdata} name="chasis_no" readOnly /> </div> */}
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}>  cc :</p><input className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} onChange={getUserdata} name="new_cc" /> </div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Transfer Date :</p><input type="date" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} onChange={getUserdata} name="new_inst_date" /> </div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Remarks :</p><input className=' ml-3 p-1 ' style={{ width: "55%" }} value={removal.remarks} onChange={getUserdata} name="remarks" /> </div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Transfer Charges :</p><input className=' ml-3 p-1 ' style={{ width: "55%" }} value={removal.remarks} onChange={getUserdata} name="remarks" /> </div>
          </div>
        </div>
      </div>
      <button className='theme_btn_md rounded-0 float-end my-3' onClick={SubmitRemoval}>Submit</button>
    </div>
  )
}




