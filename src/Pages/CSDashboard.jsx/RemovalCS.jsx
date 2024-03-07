import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RemovalCS() {
  const [errorAlert, setErrorAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [successAlert, setSuccessAlert] = useState(false)
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const [empName, setEmpName] = useState("");
  const cookies = new Cookies();
  const [searchTerm, setSearchTerm] = useState("")
  const [newCustomer, setnewCustomer] = useState({
    id: '',
    customer_name: "",
    father_name: "",
    address: "",
    mobileno_1: "",
    mobileno_2: "",
    mobileno_3: "",
    cnic: "",
    secondary_user: "",
    relationship: "",
    secondary_user_con: "",
    insurance_partner: "",
    vas: "",
    vas_options: [],
    customer_email: "",
    emergency_pass: "",
    emergency_per: "",
    emergency_per_con: "",
    security_ques: "",
    security_ans: "",
    password: "",
    compaign_point_alo: "",
    renewal_charges: "",
    segment: "",
    Demo_duration: "",
    int_comission: "",
    ext_comission: "",
    discount: "",
    representative: ""
  })
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const getSearchItem = (e) => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

  const handleChange = (event) => {
    let name = event.target.name
    let input = event.target.value.replace(/\D/g, '');
    // Remove non-numeric characters
    if (input.length > 4) {
      input = input.slice(0, 4) + '-' + input.slice(4); // Add hyphen after the first four characters
    }
      // Ensure mobile number doesn't exceed 11 characters
      if (input.length > 12) {
        return; // Don't update state if mobile number exceeds 11 characters
      }
    setnewCustomer({
      ...newCustomer,
      [name]: input
    }
    );
  };

  const hideAlerts = () => {
    setSuccessAlert(false)
    setErrorAlert(false);
  };

  const getRemoavalData = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/seach_ownership",
          { search_term: searchTerm }
        );
        if (response.status == 200) {
          console.log("data", response.status)
          // console.log(response)
          setData(response.data.data)
          setnewCustomer({
            ...newCustomer,
            id: response.data.data.user.id,
            customer_name: response.data.data.user.customer_name,
            father_name: response.data.data.user.father_name,
            address: response.data.data.user.address,
            mobileno_1: response.data.data.user.mobileno_1,
            mobileno_2: response.data.data.user.mobileno_2,
            mobileno_3: response.data.data.user.mobileno_3,
            cnic: response.data.data.user.cnic,
            secondary_user: response.data.data.user.seconadryuser_name,
            relationship: response.data.data.user.relationship,
            secondary_user_con: response.data.data.user.seconadryuser_name,
            insurance_partner: response.data.data.user.insurance_partner,
            vas: response.data.data.user.vas,
            vas_options: response.data.data.user.vas_options,
            customer_email: response.data.data.security.customer_email,
            emergency_pass: response.data.data.security.emergency_pass,
            emergency_per: response.data.data.security.emergency_person,
            emergency_per_con: response.data.data.security.emergency_person_contact,
            security_ques: response.data.data.security.security_ques,
            security_ans: response.data.data.security.security_ans,
            password: response.data.data.security.password,
            compaign_point_alo: response.data.data.user.campaign_point,
            renewal_charges: response.data.data.renewal_charges.renewal_charges,
            segment: response.data.data.user.segment,
            Demo_duration: response.data.data.user.demo_duration,
            int_comission: response.data.data.user.int_comission,
            ext_comission: response.data.data.user.ext_comission,
            discount: response.data.data.user.discount,
            representative: empName
          })
          setMsg("")
          console.log("data >>", data)
          console.log("Customer >>", newCustomer)
          return
        }
      }
      catch (error) {
        console.log(error)
        if (error.response.status === 402) {
          setMsg("Plase Enter A Registration Number ")
          console.log("Validation Error")
        }
        else if (error.response.status === 400) {
          setnewCustomer(null)
          console.log(error.response.data.message)
          setMsg(error.response.data.messsage)
          setErrorAlert(true)
        }
        else {
          console.log("Internal Server Error")
        }
      }
    } else {
      setMsg("Please Enter A Valid Registration")
      setErrorAlert(true)
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;

    console.log(value); // Debugging: Check if value is correct

    let updatedOptions = [...newCustomer.vas_options]; // Copy the existing array

    if (checked) {
      updatedOptions.push(value); // Add to array if checked
    } else {
      updatedOptions = updatedOptions.filter((option) => option !== value); // Remove from array if unchecked
    }

    setnewCustomer({
      ...newCustomer,
      vas_options: updatedOptions, // Update vas_options in the state
    });

    console.log(newCustomer);
  };

  const handleVasOptionChange = (e) => {
    const value = e.target.value;

    // For "Yes," show additional fields
    setShowAdditionalFields(value === 'Yes');

    // Update the vas_options array based on the selected value
    setnewCustomer((prevState) => ({
      ...prevState,
      vas: value,
      vas_options: value === 'Yes' ? [] : null, // Initialize as an empty array if 'Yes', otherwise null
    }));
  };

  const getUserData = (e) => {
    let name, value
    name = e.target.name;
    value = e.target.value;
    setnewCustomer({
      ...newCustomer,
      representative: empName,
      [name]: value
    });
    console.log(newCustomer);
  };

  const handleSegmentChange = (e) => {
    const value = e.target.value;
    setnewCustomer((prevState) => ({
      ...prevState,
      segment: value,
      Demo_duration: (value === "demo") ? "" : null,
    }));
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { id, customer_name, father_name, address, telephone, mobileno_1, mobileno_2, mobileno_3, ntn, cnic, primary_user, representative, primary_user_cnic, primary_user_con, secondary_user, relationship, secondary_user_con, insurance_partner, vas, vas_options, customer_email, emergency_pass, emergency_per, emergency_per_con, security_ques, security_ans, password, compaign_point_alo, renewal_charges, segment, Demo_duration, int_comission, ext_comission, discount } = newCustomer;
    const vasOptionsString = JSON.stringify(newCustomer.vas_options).replace(/[\[\]"]+/g, '');

    // Include the converted string in the data you send to the backend
    const dataToSend = {
      vas_options: vasOptionsString,
      id, customer_name, father_name, representative, address, mobileno_1, mobileno_2, mobileno_3, cnic,  secondary_user, relationship, secondary_user_con, insurance_partner, vas, vas_options, customer_email, emergency_pass, emergency_per, emergency_per_con, security_ques, security_ans, password, compaign_point_alo, renewal_charges, segment, Demo_duration, int_comission, ext_comission, discount
    };


    if (id && customer_name && father_name && address  && mobileno_1 && representative  && cnic  && secondary_user && relationship && secondary_user_con && insurance_partner && vas && vas_options && customer_email && emergency_pass && emergency_per && emergency_per_con && security_ques && security_ans && password && compaign_point_alo && renewal_charges && segment && int_comission && ext_comission && discount) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/createrownership`,
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        console.log(response); // use response.data to get the server response

        if (response.status === 200) {
          console.log("Request successful");
          setMsg('User Register Succfully')
          setSuccessAlert(true)
        } else {
          console.log("Please Try Again Later.");
        }
      } catch (error) {
        if (error.response.status === 422) {
          console.log("Error:", "User Already Registered With This Credentails", error);
          setErrorAlert(true)
          setMsg("User Already Registered With This Credentails");
        }
        else if (error.response.status === 402) {
          setErrorAlert(true)
          console.log(error)
          setMsg("validations Fail")
        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error);
          setErrorAlert(true)
          setMsg("Internal Server Error")
        }
      }
    } else {
      setErrorAlert(true)
      setMsg("Plesae Fill All the feilds")
    }
  }

  useEffect(() => {
    const emp_name = cookies.get('name');
    setEmpName(emp_name)
  }, [])
  return (
    <>
      <div className='p-3'>
        <div className='flex justify-content-center mb-8'>
          <input placeholder='Enter ' className='w-96 mx-4  p-2' placeholder='Enter Registrations' onChange={getSearchItem} />
          <button className='theme_btn_md mx-4 rounded' onClick={getRemoavalData}>Search</button>
        </div>
        {successAlert && (
          <div className="overlay">
            <div className="popup">
              <div className="alert alert-success" role="alert">
                <div className="flex justify-end">
                  <button onClick={hideAlerts}><FontAwesomeIcon className='h-8' icon={faCircleXmark} /></button>
                </div>
                <h1 className="font-bold fs-4 my-2">Succes</h1>
                {msg}
              </div>
            </div>
          </div>
        )}
        {errorAlert && (
          <div className="overlay">
            <div className="popup">
              <div className="alert alert-danger" role="alert">
                <div className="flex justify-end">
                  <button onClick={hideAlerts}><FontAwesomeIcon className='h-8' icon={faCircleXmark} /></button>
                </div>
                <h1 className="font-bold fs-4 my-2">An Errro Occured</h1>
                {msg}
              </div>
            </div>
          </div>
        )}
        <h1 className='text-lg font-bold bg-black text-white p-2 my-2'>User Details</h1>
        <div className='flex grid lg:grid-cols-2 gap-x-2 space-y-3 md:grid-co ls-1'>
          <div className=' flex flex-col justify-center space-y-3'>
            <div className='flex justify-center'>
              <p className='text-start text-sm' style={{ width: "40%" }}> Client ID :</p>
              <input placeholder='Enter Client ID' onChange={getUserData} className='ml-3 p-1 custum_input  cursor-not-allowed' style={{ width: "55%" }} value={newCustomer && newCustomer.id || ""} />
            </div>
            <div className='flex justify-center'>
              <p className='text-start text-sm' style={{ width: "40%" }}> Customer Name :</p>
              <input placeholder='Enter Customer Name' onChange={getUserData} className='ml-3 p-1 custum_input  ' style={{ width: "55%" }} value={newCustomer && newCustomer.customer_name || ""} name='customer_name' />
            </div>
            <div className='flex justify-center'>
              <p className='text-start text-sm' style={{ width: "40%" }}> Father Name :</p>
              <input placeholder='Enter Father Name' onChange={getUserData} className='ml-3 p-1 custum_input  ' style={{ width: "55%" }} value={newCustomer && newCustomer.father_name || ""} name='father_name' />
            </div>
            <div className='flex justify-center'>
              <p className='text-start text-sm' style={{ width: "40%" }}> Address :</p>
              <input placeholder='Enter Address' onChange={getUserData} className='ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.address || ""} name="address" />
            </div>

            <div className='flex justify-center'>
              <p className='text-start text-sm' style={{ width: "40%" }}> Mobile Number :</p>
              <input placeholder='Enter Mobile Number' onChange={handleChange} className='ml-3 p-1 custum_input  ' style={{ width: "55%" }} value={newCustomer && newCustomer.mobileno_1 || ""} name="mobileno_1" />
            </div>
            <div className='flex justify-center'>
              <p className='text-start text-sm' style={{ width: "40%" }}> 2 Mobile Number :</p>
              <input placeholder='Enter Second Mobile Number' onChange={handleChange} className='ml-3 p-1 custum_input   ' style={{ width: "55%" }} value={newCustomer && newCustomer.mobileno_2 || ""} name="mobileno_2" />
            </div>
            <div className='flex justify-center'>
              <p className='text-start text-sm' style={{ width: "40%" }}> 3 Mobile Number :</p>
              <input placeholder='Enter Third Mobile Number' onChange={handleChange} className='ml-3 p-1 custum_input   ' style={{ width: "55%" }} value={newCustomer && newCustomer.mobileno_3 || ""} name="mobileno_3" />
            </div>
          </div >
          <div className='space-y-3'>
            <div className=' flex flex-col justify-center space-y-3'>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> CNIC  :</p><input placeholder='Enter CNIC' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.cnic || ""} name="cnic" /> </div>
              {/* <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Primary User  :</p><input placeholder='Enter ' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.primary_user || ""} name="primary_user" /> </div>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Primary User CNIC :</p><input placeholder='Enter ' onChange={getUserData} type="number" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.primary_user_cnic || ""} name="primary_user_cnic" /> </div>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Primary User Contact :</p><input placeholder='Enter ' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.primary_user_con || ""} name="primary_user_con" /> </div> */}
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Secondary User  :</p><input placeholder='Enter Secondary User' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.secondary_user || ""} name="secondary_user" /> </div>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Relationship with Primary User :</p><input placeholder='Enter Relationship' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.relationship || ""} name="relationship" /> </div>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Secondary User Contact :</p><input placeholder='Enter Secondary User Contact' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.secondary_user_con || ""} name="secondary_user_con" /> </div>
            </div>
          </div>
          <div className='space-y-3'>
            <div className=' flex flex-col justify-center space-y-3'>
              {/* Product Details  */}
              <div className=' flex flex-col justify-center space-y-3'>
                <h1 className='text-lg font-bold bg-black text-white p-2'>Product Details</h1>
                <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}>Insurance Partner :</p><input placeholder='Enter Insurance Partner' onChange={getUserData} name="insurance_partner" className=' ml-3 p-1 custum_input' value={newCustomer && newCustomer.insurance_partner || ""} style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}>VAS :</p>
                  <div className=' ml-3 p-1  flex justify-start space-x-3' style={{ width: "55%" }} >
                    <div className='flex'><input placeholder='Enter ' onChange={handleVasOptionChange} type="radio" className='mr-2' name='vas' value='Yes' />Yes
                    </div>
                    <div className='flex justify-between'><input placeholder='Enter ' onChange={handleVasOptionChange} type="radio" name='vas'
                      value='No' className='mr-2' />No </div>
                  </div>
                </div>
                {showAdditionalFields && (
                  <div className='space-y-2'>
                    <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Location on Call :</p><input placeholder='Enter ' onChange={handleCheckboxChange} value="Location on Call" type='checkbox' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Ignition On :</p><input placeholder='Enter ' onChange={handleCheckboxChange} value="Ignition On " type='checkbox' className=' ml-3 p-1 custum_input' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Ignition Off :</p><input placeholder='Enter ' onChange={handleCheckboxChange} value="Ignition Off" type='checkbox' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Webtrack :</p><input placeholder='Enter ' onChange={handleCheckboxChange} value="Webtrack" type='checkbox' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Geofence Alerts :</p><input placeholder='Enter ' onChange={handleCheckboxChange} value="Geofence Alerts" type='checkbox' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Mobile App :</p><input placeholder='Enter ' onChange={handleCheckboxChange} value="Mobile App" type='checkbox' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center mb-3'><p className='text-start text-sm' style={{ width: "40%" }}> Over Speed :</p><input placeholder='Enter ' onChange={handleCheckboxChange} value="Over Speed" type='checkbox' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                  </div>
                )}
              </div >
              {/* Payment Details  */}
              <div className=' flex flex-col justify-center space-y-3'>
                <h1 className='text-lg font-bold bg-black text-white p-2'>Payment Details</h1>
                <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}>Campaign Point Allocation :</p><input placeholder='Enter Campaign Point Allocation' onChange={getUserData} name="compaign_point_alo" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} value={newCustomer && newCustomer.compaign_point_alo || ""} /> </div>
                <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}>Renewal Charges :</p><input placeholder='Enter Renewal Charges' onChange={getUserData} name="renewal_charges" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} value={newCustomer && newCustomer.renewal_charges || ""} /> </div>
                <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}>Segment :</p>
                  <div className=' ml-3 p-1 text-sm flex justify-start grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 space-x-1' style={{ width: "55%" }} >
                    <div className='flex'><input placeholder='Enter ' onChange={handleSegmentChange} type="radio" className='mr-2' name="segment" value="cash" />Cash </div>
                    <div className='flex'><input placeholder='Enter ' onChange={handleSegmentChange} type="radio" className='mr-2' name="segment" value="rental" />Cash Rental </div>
                    <div className='flex'><input placeholder='Enter ' onChange={handleSegmentChange} type="radio" className='mr-2' name="segment" value="demo" />Demo </div>
                  </div>
                </div>
                <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Demo Duration :</p><input placeholder='Enter Demo Duration' type='date' onChange={getUserData} name="Demo_duration" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} value={newCustomer && newCustomer.Demo_duration || ""} /> </div>
                <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Internal Commission :</p><input placeholder='Enter Internal Commission' onChange={getUserData} name="int_comission" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.int_comission || ""} /> </div>
                <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> External Commission :</p><input placeholder='Enter External Commission' onChange={getUserData} name="ext_comission" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.ext_comission || ""} /> </div>
                <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Discount :</p><input placeholder='Enter Discount' onChange={getUserData} name="discount" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} value={newCustomer && newCustomer.discount || ""} /> </div>
              </div >
            </div>
          </div>
          <div className='space-y-3'>
            <div className=' flex flex-col justify-center space-y-3'>
              <h1 className='text-lg font-bold bg-black text-white p-2'>Security Details</h1>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Customer Email :</p><input placeholder='Enter Customer Email' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.customer_email || ""} name="customer_email" /> </div>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Emergency Password  :</p><input placeholder='Enter Emergency Password' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.emergency_pass || ""} name="emergency_pass" /> </div>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Emergency Person  :</p><input placeholder='Enter Emergency Person' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.emergency_per || ""} name="emergency_per" /> </div>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Emergency Person Contact :</p><input placeholder='Enter Emergency Person Contact' onChange={getUserData} type="number" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.emergency_per_con || ""} name="emergency_per_con" /> </div>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Security Question :</p><input placeholder='Enter Security Question' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.security_ques || ""} name="security_ques" /> </div>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Security Answer  :</p><input placeholder='Enter Security Answer' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.security_ans || ""} name="security_ans" /> </div>
              <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Password :</p><input placeholder='Enter Password' onChange={getUserData} className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} value={newCustomer && newCustomer.password || ""} name="password" /> </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-black block">
          <button className='theme_btn_md rounded-0 float-end my-3' onClick={sendData}>Submit</button>
        </div>
      </div>
      <div className='block grid lg:grid-cols-2 md:grid-cols-1 gap-x-3  mt-5'>
        {/* Vehicle Information  */}
        {/* <div className='bg-white mt-3 border border-gray-600'>
          <h1 className='text-xl font-semibold bg-black text-white p-2 '>Vehicle Information</h1>
          <div className='p-2'>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Registration # :</p>
              <p className='text-sm  w-60'>{data && data.user.registeration_no || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Engine #:</p>
              <p className='text-sm  w-60'>{data && data.user.engine_no || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Chassis #:</p>
              <p className='text-sm  w-60'>{data && data.user.chasis_no || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Make :</p>
              <p className='text-sm  w-60'>{data && data.user.make || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Model :</p>
              <p className='text-sm  w-60'>{data && data.user.model || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Year :</p>
              <p className='text-sm  w-60'>{data && data.user.year || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Color :</p>
              <p className='text-sm  w-60'>{data && data.user.color || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Mobilizer :</p>
              <p className='text-sm  w-60'>{data && data.technical.mobilizer || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Transmission :</p>
              <p className='text-sm  w-60'>{data && data.user.transmission || "NOt Available"}</p>
            </div>
          </div>
        </div>
        <div className='bg-white mt-3 border border-gray-600'>
          <h1 className='text-xl font-semibold bg-black text-white p-2 '>Technical Information</h1>
          <div className='p-2'>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Vendor :</p>
              <p className='text-sm  w-60'>{data && data.device_information.vendor || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>IMEI #:</p>
              <p className='text-sm  w-60'>{data && data.technical.IMEI_no || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>GSM #:</p>
              <p className='text-sm  w-60'>{data && data.technical.Gsm_no || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Device ID:</p>
              <p className='text-sm  w-60'>{data && data.technical.device_id || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Sim Activation:</p>
              <p className='text-sm  w-60'>{data && data.technical.sim || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>GPS Activation :</p>
              <p className='text-sm  w-60'>{data && data.technical.Gps_check || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Tavl. Management Id :</p>
              <p className='text-sm  w-60'>{data && data.technical.Tavl_mang_id || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Operational Status :</p>
              <p className='text-sm  w-60'>{data && data.technical.operational_status || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Webtrack Id :</p>
              <p className='text-sm  w-60'>{data && data.technical.webtrack_id || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Webtrack Password :</p>
              <p className='text-sm  w-60'>{data && data.technical.webtrack_pass || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>SMS Alert :</p>
              <p className='text-sm  w-60'>{data && data.technical.hh || "NOt Available"}</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-bold w-40'>Speed Alert :</p>
              <p className='text-sm  w-60'>{data && data.technical.overspeed_alerts || "NOt Available"}</p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )

}