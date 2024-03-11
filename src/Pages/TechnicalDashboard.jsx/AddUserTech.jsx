import React, { useEffect, useState } from 'react'
import Technical_Sidebar from '../../Components/Technical_Sidebar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';

export default function AddUserTech() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const { reg_no } = useParams();
    const [secondDevice, setSecondDevice] = useState(false)
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [isListOpen, setIsListOpen] = useState(false);
    const [isListOpen1, setIsListOpen1] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [apiResult, setApiResult] = useState([]);
    const [customer, setCustomer] = useState({
        client_code: "",
        vendor_name: "",
        vendor_name_1: "",
        device_id: "",
        device_id_1: "",
        IMEI_no: "",
        IMEI_no_1: "",
        technician_name: "",
        sim: "",
        sim_1: "",
        Gps_check: "",
        mobilizer: "",
        webtrack_id: "",
        webtrack_pass: "",
        contact_1: "",
        customer_name: "",
        representative: "",
        reg_no: "",
        customer_name: "",
        chasis_no: "",
        engine_no: "",
        cc: "",
        tracker_position:""
    })

    const [empName, setEmpName] = useState("")
    const [vas, setVas] = useState();
    const cookies = new Cookies();

    let name, value
    const getUserData = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
        console.log(customer);
    };

    const navigate = useNavigate();

    const getDeviceData = async (e) => {
        const { name, value } = e.target;
        if (name === "device_id") {
            setIsListOpen(value.trim().length > 0); // Close list only if value is not empty
        } else {
            setIsListOpen1(true);
        }
        if (name === "device_id_1") {
            setIsListOpen1(value.trim().length > 0); // Close list only if value is not empty
        } else {
            setIsListOpen1(false);
        }

        const search_term = [value];
        setCustomer({ ...customer, [name]: value });
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
        }
        catch (error) {
            console.log(error)
        }
    };

    const handleDeviceIdSelect = (deviceId, vender, imei, sim) => {
        setSelectedDeviceId(deviceId);
        setCustomer(prevState => ({
            ...prevState,
            device_id: deviceId,
            vendor_name: vender,
            sim: sim,
            IMEI_no: imei
        }));
        setIsListOpen(false)
    };

    const close =async (e) =>{
        setSecondDevice(false)
        setIsListOpen1(false)
        setCustomer({
            ...customer,
            device_id_1:"",
            IMEI_no_1:'',
            sim_1:"",
        })
    }

    // const handleDeviceIdSelect1 = (deviceId, vender, imei, sim) => {
    //     setSelectedDeviceId(deviceId);
    //     setCustomer(prevState => ({
    //         ...prevState,
    //         device_id_1: deviceId,
    //         vendor_name_1: vender,
    //         sim_1: sim,
    //         IMEI_no_1: imei
    //     }));
    //     setIsListOpen1(false)
    // };

    const getUserInfo = async () => {
        try {
            console.log(reg_no)
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tech_reg/${reg_no}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res}`);
            }

            const response = await res.json();
            console.log("data>>", response);
            if (Array.isArray(response.vas_options) && response.vas_options.length > 0) {
                const vasString = response.vas_options[0];
                const vasArray = vasString.split(',');
                setVas(vasArray);
                const containsWebtrack = vasArray.includes('Webtrack');
                const containsMobileApp = vasArray.includes('Mobile App');
                if (containsWebtrack || containsMobileApp) {
                    setShowAdditionalFields(true)
                }
                console.log(vasArray);
            } else {
                console.error("Vas options is not a valid array:", response.vas_options);
                // Handle the case where vas_options is not a valid array
            }



            // setData(response);
            setCustomer({
                ...customer,
                client_code: response.data.client_id,
                contact_1: response.data.coontact_no,
                customer_name: response.data.customer_name,
                reg_no: response.data.reg_no,
                customer_name: response.data.customer_name,
                chasis_no: response.data.chasis_no,
                engine_no: response.data.engine_no,
                cc: response.data.cc
            })
            // setCount(response.count)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleVasOptionChange = (e) => {
        const value = e.target.value;

        // For "Yes," show additional fields
        setShowAdditionalFields(value === 'Yes');
        if (value === "No") {
            setCustomer((prevState) => ({
                ...prevState,
                operational_status: value,
                webtrack_id: null,
                webtrack_pass: null
            }));
        }

        // Update the vas_options array based on the selected value
        setCustomer((prevState) => ({
            ...prevState,
            operational_status: value,
        }));
    };

    const sendData = async () => {
        const { client_code, vendor_name, IMEI_no, Gsm_no, Tavl_mang_id, device_id, technician_name, sim, Gps_check, mobilizer, operational_status, webtrack_id, webtrack_pass } = customer
        if (client_code, vendor_name, IMEI_no, Gsm_no, Tavl_mang_id, device_id, technician_name, sim, mobilizer) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/technical_create`,
                    customer,
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
                    toast.success('User Register Succfully')
                    setTimeout(() => {
                        navigate('/tech'); 
                    }, 1000);
                }
            } catch (error) {
                if (error.response.status === 420) {
                    console.log("Device is already installed", error);
                    toast.error("This Device is already installed");
                }
                else if (error.response.status === 400) {
                    console.log("Device not found", error);
                    toast.error("Device not found");
                }
                else if (error.response.status === 401) {
                    console.log("Device not found", error);
                    toast.error("Error In Submision");
                }
                else if (error.response.status === 402) {
                    console.log("Device not found", error);
                    toast.error("validations Fail")
                } else {
                    console.log("Internal Server Error", error);
                    toast.error("Internal Server Error")
                }
            }
        } else {
            toast.error("Plesae Fill All the feilds")
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        setEmpName(cookies.get('name'));
        console.log(empName)
        setCustomer({
            ...customer,
            representative: empName,
        });
    }, [vas]);

    return (
        <div className='flex h-[100vh] bg-black'>
            {isSidebarOpen && (
                <div className="sidebar"><Technical_Sidebar /></div>
            )}
                  <ToastContainer position="top-center" />

            <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll bg'>
                <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
                <div className='m-2 p-2 bg-white mt-0'>
                    <h1 className='text-xl font-semibold bg-gray-400 p-2 m-2'>Technical Details</h1>
                    <div className='flex grid lg:grid-cols-2 md:grid-cols-1'>
                        <div className=' flex flex-col justify-center'>
                            <div className='flex justify-center my-2'><p className='text-start md:text-start' style={{ width: "40%" }}> Customer Id :</p><input onChange={getUserData} className=' ml-3 custum_input p-1 ' value={customer.client_code} style={{ width: "55%" }} readOnly /> </div>
                            {/* <div className='flex justify-center my-2'><p className='text-start md:text-start' style={{ width: "40%" }}> Vender:</p><input onChange={getUserData} name='vendor_name' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div> */}
                            <div className='flex justify-center my-2'><p className='text-start md:text-start' style={{ width: "40%" }}> Device ID :</p><input value={customer.device_id} onChange={getDeviceData} name='device_id' className=' ml-3 custum_input p-1 relative' style={{ width: "55%" }} /> </div>
                            {isListOpen && (
                                <div className='flex justify-center my-2 relative' >
                                    <div className='absolute -top-2 right-2 z-0 bg-white overflow-y-scroll shadow' style={{ width: "55%",maxHeight:"300px"  }}>
                                        <div className='flex flex-col justify-center items-center  space-y-2  p-2'>
                                            {apiResult.map(item => (
                                                <div key={item.id} className='w-100 hover:bg-gray-300 p-1' onClick={() => handleDeviceIdSelect(item.device_serialno, item.vendor, item.imei_no, item.sim.sim_no)}>
                                                    {item.device_serialno}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* <div className='flex justify-start my-2'><button onClick={(e) => setSecondDevice(true)} className='bg-gray-300 p-2 rounded-1'>Add another Device</button> {secondDevice && (<> <button onClick={close} className='bg-red-600 text-white ml-2 p-1 rounded-1'>Remove</button> <input onChange={getDeviceData} name='device_id_1' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} value={customer.device_id_1} /> </>)} </div>
                            {isListOpen1 && (
                                <div className='flex justify-center my-2 relative' >
                                    <div className='absolute -top-2 right-4 z-0 bg-white' style={{ width: "55%" }}>
                                        <div className='flex flex-col justify-center items-center shadow-lg space-y-2  p-2'>
                                            {apiResult.map(item => (
                                                <div key={item.id} className='p-1 w-100 hover:bg-gray-300' onClick={() => handleDeviceIdSelect1(item.device_serialno, item.vendor, item.imei_no, item.sim.sim_no)}>
                                                    {item.device_serialno}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )} */}
                            {/* <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> IMEI Number :</p><input onChange={getUserData} name='IMEI_no' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div> */}
                            {/* <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%"    }}> GSM Number :</p><input onChange={getUserData} name='Gsm_no' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div> */}
                            <div className='flex justify-center my-2'><p className='text-start md:text-start' style={{ width: "40%" }}> Designated Technician:</p><input onChange={getUserData} name='technician_name' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                        </div >
                        <div className='space-y-3'>
                            {/* <div className='flex justify-around ' >
                                <div className='w-50'>
                                    Sim Activated
                                </div>
                                <div className='flex justify-around space-x-5'>
                                    <div class="form-check">
                                        <input class="border" type="radio" name="sim" value="Yes" onChange={getUserData} />
                                        <label class="ml-3" for="sim">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="border" type="radio" name="sim" value="No" onChange={getUserData} />
                                        <label class="ml-3" for="sim">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-around ' >
                                <div className='w-50'>
                                    GPS Check
                                </div>
                                <div className='flex justify-around space-x-5'>
                                    <div class="form-check">
                                        <input class="border" type="radio" name="Gps_check" value="Yes" onChange={getUserData} />
                                        <label class="ml-3" for="Gps_check">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="border" type="radio" name="Gps_check" value="No" onChange={getUserData} />
                                        <label class="ml-3" for="Gps_check">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                            <div className='flex justify-around ' >
                                <div className='w-50'>
                                    Mobilizer
                                </div>
                                <div className='flex justify-around space-x-5'>
                                    <div class="form-check">
                                        <input class="border" type="radio" name="mobilizer" value="Yes" onChange={getUserData} />
                                        <label class="ml-3" for="mobilizer">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="border" type="radio" name="mobilizer" value="No" onChange={getUserData} />
                                        <label class="ml-3" for="mobilizer">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex justify-center my-2'><p className='text-start md:text-start' style={{ width: "40%" }}> Tracker Position:</p><input onChange={getUserData} name='tracker_position' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                            {/* <div className='flex justify-around ' >
                                <div className='w-50'>
                                    Operational Status
                                </div>
                                <div className='flex justify-around space-x-5'>
                                    <div class="form-check">
                                        <input class="border" type="radio" name="operational_status" value='Yes' onChange={handleVasOptionChange} />
                                        <label class="ml-3" for="operational_status">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="border" type="radio" name="operational_status" value='No' onChange={handleVasOptionChange} />
                                        <label class="ml-3" for="operational_status">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                            {showAdditionalFields && (
                                <div className='space-y-2 justify-start px-4'>
                                    <div className='flex justify-center my-2'><p className='text-start ' style={{ width: "40%" }}> WebTrack Login ID :</p><input onChange={getUserData} name='webtrack_id' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                                    <div className='flex justify-center my-2'><p className='text-start ' style={{ width: "40%" }}> WebTrack Password :</p><input onChange={getUserData} name='webtrack_pass' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                                </div>
                            )}
                        </div>
                        <div className=' flex flex-col mt-3 p-2'>
                            <h1 className='text-xl font-semibold bg-gray-400 p-2 m-2'>VAS</h1>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Igination On :</p><input onChange={getUserData} name='' readOnly value={vas && vas.includes('Ignition On ') ? 'Yes' : 'No'} className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Igination Off :</p><input onChange={getUserData} name='' readOnly value={vas && vas.includes('Ignition Off') ? 'Yes' : 'No'} className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Geo Fencing  :</p><input onChange={getUserData} name='' readOnly value={vas && vas.includes('Geofence Alerts') ? 'Yes' : 'No'} className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Mobile App :</p><input onChange={getUserData} name='' readOnly value={vas && vas.includes('Mobile App') ? 'Yes' : 'No'} className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Over Speed Alerts :</p><input onChange={getUserData} name='' readOnly value={vas && vas.includes('Over Speed') ? 'Yes' : 'No'} className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Web Track :</p><input onChange={getUserData} name='' readOnly value={vas && vas.includes('Webtrack') ? 'Yes' : 'No'} className=' ml-3 custum_input p-1 ' /> </div>
                        </div >
                        <div className=' flex flex-col mt-3 p-2'>
                            <h1 className='text-xl font-semibold bg-gray-400 p-2 m-2'>Other Details</h1>
                            <div className='flex  my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Customer Name :</p><input onChange={getUserData} name='' readOnly value={customer.customer_name} className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Registration Number :</p><input onChange={getUserData} name='' readOnly value={customer.reg_no} className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Chassis Number :</p><input onChange={getUserData} name='' readOnly value={customer.chasis_no} className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Engine Number :</p><input onChange={getUserData} name='' readOnly value={customer.engine_no} className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Contact Number :</p><input onChange={getUserData} name='' readOnly value={customer.contact_1} className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> CC:</p><input onChange={getUserData} name='' readOnly value={customer.cc} className=' ml-3 custum_input p-1 ' /> </div>
                        </div >
                    </div>
                    <div className='bg-gray-200 flex justify-end p-2 mx-2'>
                        <button className='theme_btn_md rounded-0' onClick={sendData}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
