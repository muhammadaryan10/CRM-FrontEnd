import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CS_Sidebar from '../../Components/CS_Sidebar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { faCircleXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Watch } from 'react-loader-spinner';


const AddUserCS = () => {
  const [mobile2, setmobile2] = useState(false)
  const [mobile3, setmobile3] = useState(false)

  const [newCustomer, setnewCustomer] = useState({
    id: "",
    customer_name: "",
    father_name: "",
    address: "",
    mobileno_1: "",
    mobileno_2: "",
    mobileno_3: "",
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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


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

  const sendData = async (e) => {
    setLoading(true)
    e.preventDefault();
    const { id, customer_name, mobileno_2, mobileno_3, father_name, address, mobileno_1, remarks, cnic, seconadryuser_name, relationship, secondaryuser_con1, registeration_no, engine_no, chasis_no, CC, make, model, year, color, installation_loc, date, campaign_point, dealership, dealer_name, sales_person, conatct_person, insurance_partner, tracker_charges, date_of_installation, int_comission, ext_comission, discount, renewal_charges, engine_type, transmission, vas, vas_options, segment, demo_duration, representative } = newCustomer;
    const vasOptionsString = JSON.stringify(newCustomer.vas_options).replace(/[\[\]"]+/g, '');

    // Include the converted string in the data you send to the backend
    const dataToSend = {
      id,
      vas_options: vasOptionsString,
      customer_name,
      representative,
      father_name, address, mobileno_1, mobileno_2, mobileno_3, remarks, cnic, seconadryuser_name, relationship, secondaryuser_con1, registeration_no, engine_no, chasis_no, CC, make, model, year, color, installation_loc, date, campaign_point, dealership, dealer_name, sales_person, conatct_person, insurance_partner, tracker_charges, date_of_installation, int_comission, ext_comission, discount, renewal_charges, engine_type, transmission, vas, segment, demo_duration
    };


    // if (customer_name && father_name && address && mobileno_1 && cnic && seconadryuser_name && relationship && secondaryuser_con1 && registeration_no && engine_no && chasis_no && CC && make && model && year && color && installation_loc && remarks && campaign_point && dealership && dealer_name && sales_person && insurance_partner && tracker_charges && date_of_installation && int_comission && ext_comission && discount && renewal_charges && engine_type && transmission && vas) {
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
        setLoading(false)
        console.log("Request successful");
        setMsg('User Register Succfully')
        setSuccessAlert(true)
        setSuccessAlert(true);
        setTimeout(() => {
          navigate('/cs');
        }, 1000);
      } else if (response.response.request.status === 402) {
        setLoading(false)
        setErrorAlert(true)
        setMsg("validations Fail")
      } else {

        console.log("Please Try Again Later.");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setLoading(false)
        console.log("Error:", "User Already Registered With This Credentials", error);
        setErrorAlert(true);
        let errorMessage = "";
        for (const key in error.response.data.message) {
          errorMessage += ` ${error.response.data.message[key].join(", ")}\n`;
        }
        setMsg(errorMessage);
      }

      else if (error.response.status === 500) {
        setLoading(false)
        console.log("Internal Server Error", error);
        setErrorAlert(true)
        setMsg("Internal Server Error")
      }
      else {
        setLoading(false)
        setErrorAlert(true)
        setMsg("Internal Server Error")
        console.log(error)
      }
    }
    // } else {
    //   setErrorAlert(true)
    //   setMsg("Plesae Fill All the feilds")
    // }
  }


  useEffect(() => {
    GetNewId()
    const userNameFromCookie = cookies.get('name');
    setUserName(userNameFromCookie);
  }, []);


  return (
    <>
      {loading && (
        <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
          <Watch
            visible={true}
            width="80"
            radius="48"
            color="#000000"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

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

        <div className='rounded-xl m-2 p-2 w-100 overflow-y-scroll' style={{ backgroundColor: "#F0F0F0" }}>
          <button onClick={toggleSidebar}>
            <img
              src={isSidebarOpen ?
                'data:image/png;base64,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'
                :
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC"
              }
              className='h-6 w-6'
            />
          </button>
          <form className='p-3 mt-3' >
            <div className='flex grid lg:grid-cols-2 gap-x-2 md:grid-cols-1'>
              <div className=' flex flex-col  space-y-3'>
                <h1 className='text-lg font-bold bg-black text-white p-2'>User Details</h1>
                {/* <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}>Client ID :</p><input required placeholder='Enter   ' className=' ml-3 p-1  custum_input required ' value={newCustomer.id} style={{ width: "55%" }} /></div> */}
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Customer Name :</p><input required placeholder='Enter Customer Name' onChange={getUserData} name="customer_name" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Father Name:</p><input required placeholder='Enter Father Name' onChange={getUserData} name="father_name" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Address :</p><input required placeholder='Enter Address' onChange={getUserData} name="address" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Mobile Number :</p><input required placeholder='Enter First Mobile ' onChange={handleChange} name="mobileno_1" type='text' className=' ml-3 p-1  custum_input required no-spinners ' style={{ width: "55%" }} value={newCustomer.mobileno_1} /> </div>
                <div className='flex justify-between my-2'><button onClick={(e) => setmobile2(true)} className='bg-white p-1 rounded-1'><FontAwesomeIcon icon={faPlus} /></button>
                  {mobile2 && (<> <button onClick={(e) => setmobile2(false)} className='bg-white ml-2 p-1 rounded-1'><FontAwesomeIcon icon={faMinus} /></button> <input placeholder='Enter Second Mobile Number' onChange={handleChange} name='mobileno_2' className='mr-3  custum_input required p-1 ' style={{ width: "55%" }} value={newCustomer.mobileno_2} />  </>
                  )} </div>
                <div className='flex justify-between my-2'><button onClick={(e) => setmobile3(true)} className='bg-white p-1 rounded-1'><FontAwesomeIcon icon={faPlus} /></button>
                  {mobile3 && (<> <button onClick={(e) => setmobile3(false)} className='bg-white ml-2 p-1 rounded-1'><FontAwesomeIcon icon={faMinus} /></button> <input placeholder='Enter Third Mobile Number' onChange={handleChange} name='mobileno_3' className=' mr-3  custum_input required p-1 ' style={{ width: "55%" }} value={newCustomer.mobileno_3} />  </>
                  )} </div>
                {/* <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> 3 Mobile Number :</p><input required placeholder='Enter   ' onChange={getUserData} name="mobileno_3" type='number' className=' ml-3 p-1  custum_input required  no-spinners' style={{ width: "55%" }} /> </div> */}
                {/* <div className="flex items-center space-x-2">
                            <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Telephone Residence :</p><input required placeholder='Enter   ' onChange={getUserData} name="telephone_residence" type='number' className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>

                {serviceList.map((singleService, index) => (
                  <div key={index} className="services">
                    <div className="first-division">
                    
                      <input required placeholder='Enter   '
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
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> CNIC :</p><input required placeholder='Enter CNIC' onChange={getUserData} name="cnic" className=' ml-3 p-1  custum_input required no-spinners ' style={{ width: "55%" }} value={newCustomer.cnic} type='text' /> </div>
                {/* <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Primary  User :</p><input required placeholder='Enter   ' onChange={getUserData} name="primaryuser_name" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div> */}
                {/* <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Primary User CNIC :</p><input required placeholder='Enter   ' onChange={getUserData} name="primaryuser_cnic" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div> */}
                {/* <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Primary User Contact:</p><input required placeholder='Enter   ' onChange={getUserData} name="primaryuser_con1" type='number' className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div> */}
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Secondary User :</p><input required placeholder='Enter Secondary User Name' onChange={getUserData} name="seconadryuser_name" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Relationship with Primary  User :</p><input required placeholder='Enter Relation' onChange={getUserData} name="relationship" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Secondary User Contact:</p><input required placeholder='Enter Secondary User Contact' onChange={handleChange} name="secondaryuser_con1" type='text' className=' ml-3 p-1  custum_input required no-spinners' style={{ width: "55%" }} value={newCustomer.secondaryuser_con1} /> </div>
              </div >
              <div className='space-y-3'>
                <div className=' flex flex-col justify-center space-y-3'>
                  <h1 className='text-lg font-bold bg-black text-white p-2'>Vehicle Details</h1>
                  <div className='flex justify-between'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Registration Number :</p><input required placeholder='Enter Registration Number' onChange={getUserData} name="registeration_no" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-between'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Engine Number :</p><input required placeholder='Enter Engine Number' onChange={getUserData} name="engine_no" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-between'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Chassis Number :</p><input required placeholder='Enter Chassis Number' onChange={getUserData} name="chasis_no" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-between'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> CC :</p><input required placeholder='Enter CC' onChange={getUserData} name="CC" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-between'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Make :</p><input required placeholder='Enter Make' onChange={getUserData} name="make" type="text" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-between'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Model :</p><input required placeholder='Enter Model' onChange={getUserData} name="model" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-between'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Year :</p><input required placeholder='Enter Year' onChange={getUserData} name="year" type='number' className=' ml-3 p-1  custum_input required no-spinners' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-between'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Color  :</p><input required placeholder='Enter Color' onChange={getUserData} name="color" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                  <div className='flex justify-between'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Engine Type  :</p>
                    {/* <input required placeholder='Enter   ' onChange={getUserData} name="engine_type" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} />  */}
                    <select className='input required-field  ml-4 p-2  border bg-white' name='engine_type' onChange={getUserData} style={{ width: "55%" }} aria-label=".form-select-lg example">
                      <option value="">Select Engine Type </option>
                      <option value="Petrol">Petrol </option>
                      <option value="Diesel">Diesel </option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className='flex justify-between'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Transmission :</p>
                    {/* <input required placeholder='Enter   ' onChange={getUserData} name="transmission" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> */}
                    <select className='input required-field  ml-4 p-1  border bg-white' name='transmission' onChange={getUserData} style={{ width: "55%" }} aria-label=".form-select-lg example">
                      <option value="">Select Transmission </option>
                      <option value="Auto">Auto </option>
                      <option value="Manual">Manual </option>
                    </select>
                  </div>
                  {/* <div className='flex justify-between'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Date :</p><input required placeholder='Enter   ' onChange={getUserData} name="date" type="date" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div> */}
                </div>
              </div>
              {/* Product Details  */}
              <div className=' flex flex-col justify-center space-y-3 mt-4'>
                <h1 className='text-lg font-bold bg-black text-white p-2'>Product Details</h1>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}>Insurance Partner :</p><input required placeholder='Enter Insurance Partner' onChange={getUserData} name="insurance_partner" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}>VAS :</p>
                  <div className=' ml-3 p-2 rounded-0  flex justify-start space-x-3' style={{ width: "55%" }} >
                    <div className='flex'><input required placeholder='Enter   ' type="radio" className='mr-2' name='vas' value='Yes'
                      onChange={handleVasOptionChange} />Yes
                    </div>
                    <div className='flex justify-between'><input required placeholder='Enter   ' type="radio" name='vas'
                      value='No'
                      onChange={handleVasOptionChange} className='mr-2' />No </div>
                  </div>
                </div>
                {showAdditionalFields && (
                  <div className='space-y-2'>
                    <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Ignition On :</p><input required placeholder='Enter   ' onChange={handleCheckboxChange} value="Ignition On " type='checkbox' className=' ml-3 p-2 rounded-0 custum_input required' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Ignition Off :</p><input required placeholder='Enter   ' onChange={handleCheckboxChange} value="Ignition Off" type='checkbox' className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Webtrack :</p><input required placeholder='Enter   ' onChange={handleCheckboxChange} value="Webtrack" type='checkbox' className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Geofence Alerts :</p><input required placeholder='Enter   ' onChange={handleCheckboxChange} value="Geofence Alerts" type='checkbox' className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Mobile App :</p><input required placeholder='Enter   ' onChange={handleCheckboxChange} value="Mobile App" type='checkbox' className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center mb-3'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Over Speed :</p><input required placeholder='Enter   ' onChange={handleCheckboxChange} value="Over Speed" type='checkbox' className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                  </div>
                )}
              </div >
              {/* Other Details  */}
              <div className=' flex flex-col justify-center space-y-3'>
                <h1 className='text-lg font-bold bg-black text-white p-2'>Other Details</h1>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Dealership :</p><input required placeholder='Enter Dealership' onChange={getUserData} name="dealership" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Dealer Name :</p><input required placeholder='Enter Dealer Name' onChange={getUserData} name="dealer_name" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Sales Person :</p><input required placeholder='Enter Sales Person' onChange={getUserData} name="sales_person" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Installation Location :</p><input required placeholder='Enter Installation Location' onChange={getUserData} name="installation_loc" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
                {/* <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Contact Person :</p><input required placeholder='Enter   ' onChange={getUserData} name="conatct_person" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div> */}
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Special Instruction :</p><input required placeholder='Enter Special Instruction' onChange={getUserData} name="remarks" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
              </div >
              {/* Payment Details  */}
              <div className=' flex flex-col justify-center space-y-3'>
                <h1 className='text-lg font-bold bg-black text-white p-2'>Payment Details</h1>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}>Campaign Point Allocation :</p><input required placeholder='Enter Campaign Point' onChange={getUserData} name="campaign_point" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}>Renewal Charges :</p><input required placeholder='Enter Renewal Charges' onChange={getUserData} name="renewal_charges" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}>Segment :</p>
                  <div className=' ml-3 p-2 rounded-0 text-sm flex justify-start grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 space-x-1' style={{ width: "55%" }} >
                    <div className='flex'><input required placeholder='Enter   ' type="radio" className='mr-2' onChange={handleSegmentChange} name="segment" value="cash" />OwnerShip </div>
                    <div className='flex'><input required placeholder='Enter   ' type="radio" className='mr-2' onChange={handleSegmentChange} name="segment" value="rental" />Rental </div>
                    <div className='flex'><input required placeholder='Enter   ' type="radio" className='mr-2' onChange={handleSegmentChange} name="segment" value="demo" />Demo </div>
                  </div>
                </div>
                {showDemoFields && (
                  <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Demo Duration :</p><input required placeholder='Enter Demo Duration' onChange={getUserData} name="demo_duration" className=' ml-3 p-1  custum_input required  ' type='date' style={{ width: "55%" }} /> </div>
                )}
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Tracker Charges :</p><input required placeholder='Enter Tracker Charges' onChange={getUserData} name="tracker_charges" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Installation Date :</p><input required placeholder='Enter   ' onChange={getUserData} name="date_of_installation" type='date' className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Internal Commission :</p><input required placeholder='Enter Internal Commission' onChange={getUserData} name="int_comission" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> External Commission :</p><input required placeholder='Enter External Commission' onChange={getUserData} name="ext_comission" className=' ml-3 p-1  custum_input required ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-center'><p className='text-start text-xs font-bold' style={{ width: "40%" }}> Discount :</p><input required placeholder='Enter Discount' onChange={getUserData} name="discount" className=' ml-3 p-1  custum_input required  ' style={{ width: "55%" }} /> </div>
              </div >
            </div>
            <button className='theme_btn_md rounded-0 float-end my-3' onClick={sendData}>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddUserCS;