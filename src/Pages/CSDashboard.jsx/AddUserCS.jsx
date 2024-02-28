import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CS_Sidebar from '../../Components/CS_Sidebar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddUserCS = () => {
  const [newCustomer, setnewCustomer] = useState({
    id: "",
    customer_name: "",
    father_name: "",
    address: "",
    mobileno_1: "",
    mobileno_2:"",
    mobileno_3:"",
    cnic: "",
    seconadryuser_name: "",
    relationship: "",
    secondaryuser_con1: "",
    registeration_no: "",
    engine_no: "",
    chasis_no: "",
    CC: "",
    make: "",
    model: "",
    year: "",
    color: "",
    installation_loc: "",
    campaign_point: "",
    dealership: "",
    dealer_name: "",
    sales_person: "",
    insurance_partner: "",
    tracker_charges: "",
    date_of_installation: "",
    int_comission: "",
    ext_comission: "",
    discount: "",
    remarks: "",
    renewal_charges: "",
    engine_type: "",
    transmission: "",
    vas: "",
    vas_options: [],
    demo_duration: "",
    segment: "",
    representative: ""
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDemoFields, setShowDemoFields] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [userName, setUserName] = useState("");
  const cookies = new Cookies();
  const [errorAlert, setErrorAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [successAlert, setSuccessAlert] = useState(false)

  const hideAlerts = () => {
    setSuccessAlert(false)
    setErrorAlert(false);
  };

  let name, value
  const getUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "registeration_no") {
      // Convert the value to uppercase
      const uppercaseValue = value.toUpperCase();
  
      // Update the state with the uppercase value
      setnewCustomer({
        ...newCustomer,
        representative: userName,
        [name]: uppercaseValue
      });
      return
    }


    setnewCustomer({
      ...newCustomer,
      representative: userName,
      [name]: value
    });
    console.log(newCustomer);
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [option, setOption] = useState('');

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

  const handleSegmentChange = (e) => {
    const value = e.target.value;

    setShowDemoFields(value === 'demo');

    // Update the segment in the state
    setnewCustomer((prevState) => ({
      ...prevState,
      segment: value,
      demo_duration: (value === "demo") ? "" : null,
    }));

    // Show additional fields for 'Demo' segment
    console.log("showDemoFields:", showDemoFields);

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

  const GetNewId = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user`);
    const response = await res.json();
    console.log(response)
    setnewCustomer((prevCustomer) => ({
      ...prevCustomer,
      id: response.client_id,
    }));
    console.log(response.client_id)
  }

  // const [serviceList, setServiceList] = useState([{ mobileno_1: "" }]);

  // const handleServiceChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...serviceList];
  //   list[index][name] = value;
  //   setServiceList(list);
  // };

  // const handleServiceRemove = (index) => {
  //   const list = [...serviceList];
  //   list.splice(index, 1);
  //   setServiceList(list);
  // };

  // const handleServiceAdd = (index) => {
  //   setServiceList([...serviceList, 
  //     { `mobile_${index}`: "" }
  //   ]);
  // };


  const sendData = async (e) => {
    e.preventDefault();
    const { id, customer_name,mobileno_2,mobileno_3, father_name, address, mobileno_1, remarks, cnic, seconadryuser_name, relationship, secondaryuser_con1, registeration_no, engine_no, chasis_no, CC, make, model, year, color, installation_loc, date, campaign_point, dealership, dealer_name, sales_person, conatct_person, insurance_partner, tracker_charges, date_of_installation, int_comission, ext_comission, discount, renewal_charges,  engine_type, transmission, vas, vas_options, segment, demo_duration, representative } = newCustomer;
    const vasOptionsString = JSON.stringify(newCustomer.vas_options).replace(/[\[\]"]+/g, '');

    // Include the converted string in the data you send to the backend
    const dataToSend = {
      id,
      vas_options: vasOptionsString,
      customer_name,
      representative,
      father_name, address,  mobileno_1,mobileno_2,mobileno_3, remarks, cnic, seconadryuser_name, relationship, secondaryuser_con1, registeration_no, engine_no, chasis_no, CC, make, model, year, color, installation_loc, date, campaign_point, dealership, dealer_name, sales_person, conatct_person, insurance_partner, tracker_charges, date_of_installation, int_comission, ext_comission, discount, renewal_charges,  engine_type, transmission, vas, segment, demo_duration
    };


    if (customer_name && father_name && address && mobileno_1 && cnic && seconadryuser_name && relationship && secondaryuser_con1 && registeration_no && engine_no && chasis_no && CC && make && model && year && color && installation_loc && remarks && campaign_point && dealership && dealer_name && sales_person && insurance_partner && tracker_charges && date_of_installation && int_comission && ext_comission && discount && renewal_charges && engine_type && transmission && vas) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/storedata`,
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
        } else if (response.response.request.status === 402) {
          setErrorAlert(true)
          setMsg("validations Fail")
        } else {

          console.log("Please Try Again Later.");
        }
      } catch (error) {
        if (error.response.status === 400) {
          console.log("Error:", "User Already Registered With This Credentials", error);
          setErrorAlert(true);
          let errorMessage = "";
          for (const key in error.response.data.message) {
            errorMessage += ` ${error.response.data.message[key].join(", ")}\n`;
          }
          setMsg(errorMessage);
        }
             
         else if (error.response.status === 500) {
          console.log("Internal Server Error", error);
          setErrorAlert(true)
          setMsg("Internal Server Error")
        }
        else {
          console.log(error)
        }
      }
    } else {
      setErrorAlert(true)
      setMsg("Plesae Fill All the feilds")
    }
  }


  useEffect(() => {
    GetNewId()
    const userNameFromCookie = cookies.get('name');
    setUserName(userNameFromCookie);
  }, []);


  return (
    <div className='flex h-[100vh] bg-black'>
      {isSidebarOpen && (
        <div className="sidebar"><CS_Sidebar /></div>
      )}
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
      <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll'>
        <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
        <div className='p-3 mt-3'>
          <div className='flex grid lg:grid-cols-2 gap-x-2 md:grid-cols-1'>
            <div className=' flex flex-col  space-y-3'>
              <h1 className='text-lg font-bold bg-black text-white p-2'>User Details</h1>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}>Client ID :</p><input className=' ml-3 p-1 custum_input ' value={newCustomer.id} style={{ width: "55%" }} /></div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Customer Name :</p><input onChange={getUserData} name="customer_name" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Father Name:</p><input onChange={getUserData} name="father_name" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Address :</p><input onChange={getUserData} name="address" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Mobile Number :</p><input onChange={getUserData} name="mobileno_1" type='number' className=' ml-3 p-1 custum_input no-spinners ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> 2 Mobile Number :</p><input onChange={getUserData} name="mobileno_2" type='number' className=' ml-3 p-1 custum_input no-spinners ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> 3 Mobile Number :</p><input onChange={getUserData} name="mobileno_3" type='number' className=' ml-3 p-1 custum_input  no-spinners' style={{ width: "55%" }} /> </div>
              {/* <div className="flex items-center space-x-2">
                            <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Telephone Residence :</p><input onChange={getUserData} name="telephone_residence" type='number' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>

                {serviceList.map((singleService, index) => (
                  <div key={index} className="services">
                    <div className="first-division">
                    
                      <input
                        name="service"
                        type="text"
                        id="service"
                        value={singleService.service}
                        onChange={(e) => handleServiceChange(e, index)}
                        required
                      />
                      {serviceList.length - 1 === index && serviceList.length < 4 && (
                        <button
                          type="button"
                          onClick={handleServiceAdd}
                          className="add-btn"
                        >
                          <span>Add a Service</span>
                        </button>
                      )}
                    </div>
                    <div className="second-division">
                      {serviceList.length !== 1 && (
                        <button
                          type="button"
                          onClick={() => handleServiceRemove(index)}
                          className="remove-btn"
                        >
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div> */}
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> CNIC :</p><input onChange={getUserData} name="cnic" className=' ml-3 p-1 custum_input no-spinners ' style={{ width: "55%" }} /> </div>
              {/* <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Primary  User :</p><input onChange={getUserData} name="primaryuser_name" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div> */}
              {/* <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Primary User CNIC :</p><input onChange={getUserData} name="primaryuser_cnic" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div> */}
              {/* <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Primary User Contact:</p><input onChange={getUserData} name="primaryuser_con1" type='number' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div> */}
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Secondary User :</p><input onChange={getUserData} name="seconadryuser_name" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Relationship with Primary  User :</p><input onChange={getUserData} name="relationship" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Secondary User Contact:</p><input onChange={getUserData} name="secondaryuser_con1" type='number' className=' ml-3 p-1 custum_input no-spinners' style={{ width: "55%" }} /> </div>
            </div >
            <div className='space-y-3'>
              <div className=' flex flex-col justify-center space-y-3'>
                <h1 className='text-lg font-bold bg-black text-white p-2'>Vehicle Details</h1>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Registration Number :</p><input onChange={getUserData} name="registeration_no" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Engine Number :</p><input onChange={getUserData} name="engine_no" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Chassis Number :</p><input onChange={getUserData} name="chasis_no" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> CC :</p><input onChange={getUserData} name="CC" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Make :</p><input onChange={getUserData} name="make" type="text" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Model :</p><input onChange={getUserData} name="model" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Year :</p><input onChange={getUserData} name="year" type='number' className=' ml-3 p-1 custum_input no-spinners' style={{ width: "55%" }} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Color  :</p><input onChange={getUserData} name="color" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Engine Type  :</p>
                  {/* <input onChange={getUserData} name="engine_type" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} />  */}
                  <select className='input-field  ml-4 p-1  border bg-white' name='engine_type' onChange={getUserData} style={{ width: "55%" }} aria-label=".form-select-lg example">
                    <option value="">Select Engine Type </option>
                    <option value="Petrol">Petrol </option>
                    <option value="Diesel">Diesel </option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Transmission :</p>
                  {/* <input onChange={getUserData} name="transmission" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> */}
                  <select className='input-field  ml-4 p-1  border bg-white' name='transmission' onChange={getUserData} style={{ width: "55%" }} aria-label=".form-select-lg example">
                    <option value="">Select Transmission </option>
                    <option value="Auto">Auto </option>
                    <option value="Manual">Manual </option>
                  </select>
                </div>
                {/* <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Date :</p><input onChange={getUserData} name="date" type="date" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div> */}
              </div>
            </div>
            {/* Product Details  */}
            <div className=' flex flex-col justify-center space-y-3 mt-4'>
              <h1 className='text-lg font-bold bg-black text-white p-2'>Product Details</h1>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}>Insurance Partner :</p><input onChange={getUserData} name="insurance_partner" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}>VAS :</p>
                <div className=' ml-3 p-1  flex justify-start space-x-3' style={{ width: "55%" }} >
                  <div className='flex'><input type="radio" className='mr-2' name='vas' value='Yes'
                    onChange={handleVasOptionChange} />Yes
                  </div>
                  <div className='flex justify-between'><input type="radio" name='vas'
                    value='No'
                    onChange={handleVasOptionChange} className='mr-2' />No </div>
                </div>
              </div>
              {showAdditionalFields && (
                <div className='space-y-2'>
                  <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Ignition On :</p><input onChange={handleCheckboxChange} value="Ignition On " type='checkbox' className=' ml-3 p-1 custum_input' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Ignition Off :</p><input onChange={handleCheckboxChange} value="Ignition Off" type='checkbox' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Webtrack :</p><input onChange={handleCheckboxChange} value="Webtrack" type='checkbox' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Geofence Alerts :</p><input onChange={handleCheckboxChange} value="Geofence Alerts" type='checkbox' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Mobile App :</p><input onChange={handleCheckboxChange} value="Mobile App" type='checkbox' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-center mb-3'><p className='text-start text-sm' style={{ width: "40%" }}> Over Speed :</p><input onChange={handleCheckboxChange} value="Over Speed" type='checkbox' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
                </div>
              )}
            </div >
            {/* Other Details  */}
            <div className=' flex flex-col justify-center space-y-3'>
              <h1 className='text-lg font-bold bg-black text-white p-2'>Other Details</h1>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> dealership :</p><input onChange={getUserData} name="dealership" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Dealer Name :</p><input onChange={getUserData} name="dealer_name" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Sales Person :</p><input onChange={getUserData} name="sales_person" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Installation Location :</p><input onChange={getUserData} name="installation_loc" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              {/* <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Contact Person :</p><input onChange={getUserData} name="conatct_person" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div> */}
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Remarks :</p><input onChange={getUserData} name="remarks" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
            </div >
            {/* Payment Details  */}
            <div className=' flex flex-col justify-center space-y-3'>
              <h1 className='text-lg font-bold bg-black text-white p-2'>Payment Details</h1>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}>Campaign Point Allocation :</p><input onChange={getUserData} name="campaign_point" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}>Renewal Charges :</p><input onChange={getUserData} name="renewal_charges" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}>Segment :</p>
                <div className=' ml-3 p-1 text-sm flex justify-start grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 space-x-1' style={{ width: "55%" }} >
                  <div className='flex'><input type="radio" className='mr-2' onChange={handleSegmentChange} name="segment" value="cash" />Cash </div>
                  <div className='flex'><input type="radio" className='mr-2' onChange={handleSegmentChange} name="segment" value="rental" />Cash Rental </div>
                  <div className='flex'><input type="radio" className='mr-2' onChange={handleSegmentChange} name="segment" value="demo" />Demo </div>
                </div>
              </div>
              {showDemoFields && (
                <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Demo Duration :</p><input onChange={getUserData} name="demo_duration" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              )}
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Tracker Charges :</p><input onChange={getUserData} name="tracker_charges" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Installation Date :</p><input onChange={getUserData} name="date_of_installation" type='date' className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Internal Commission :</p><input onChange={getUserData} name="int_comission" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> External Commission :</p><input onChange={getUserData} name="ext_comission" className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center'><p className='text-start text-sm' style={{ width: "40%" }}> Discount :</p><input onChange={getUserData} name="discount" className=' ml-3 p-1 custum_input  ' style={{ width: "55%" }} /> </div>
            </div >
          </div>
          <button className='theme_btn_md rounded-0 float-end my-3' onClick={sendData}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default AddUserCS;