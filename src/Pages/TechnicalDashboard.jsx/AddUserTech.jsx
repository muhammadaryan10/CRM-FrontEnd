import React, { useEffect, useState } from 'react'
import Technical_Sidebar from '../../Components/Technical_Sidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function AddUserTech() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const { reg_no } = useParams();
    console.log(reg_no)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [customer, setCustomer] = useState({
        client_code: "",
        vendor_name: "",
        device_id: "",
        IMEI_no: "",
        Gsm_no: "",
        Tavl_mang_id: "",
        technician_name: "",
        sim: "",
        Gps_check: "",
        mobilizer: "",
        operational_status: "",
        webtrack_id: "",
        webtrack_pass: "",
        chasis_no: "",
        cc: "",
        contact_1: "",
        customer_name: "",
        engine_no: "",
        reg_no: "",
        representative:""

    })
    const [empName, setEmpName] = useState("")
    const [ vas ,setVas ]=useState();
    const cookies = new Cookies();

    let name, value
    const getUserData = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
        console.log(customer);
    };

    const getUserInfo = async () => {
        try {
            console.log(reg_no)
            const res = await fetch(`http://127.0.0.1:8000/api/tech_reg/${reg_no}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res}`);
            }

            const response = await res.json();
            console.log("data>>", response);
            if (Array.isArray(response.vas_options) && response.vas_options.length > 0) {
                const vasString = response.vas_options[0];
                const vasArray = vasString.split(',');
                setVas(vasArray);
                console.log(vasArray);
            } else {
                console.error("Vas options is not a valid array:", response.vas_options);
                // Handle the case where vas_options is not a valid array
            }
            // setData(response);
            setCustomer({
                ...customer,
                client_code: response.data.client_id,
                chasis_no: response.data.chasis_no,
                cc: response.data.cc,
                contact_1: response.data.coontact_no,
                customer_name: response.data.customer_name,
                engine_no: response.data.engine_no,
                reg_no: response.data.reg_no,
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
        if (client_code, vendor_name, IMEI_no, Gsm_no, Tavl_mang_id, device_id, technician_name, sim, Gps_check, mobilizer, operational_status, webtrack_id, webtrack_pass) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/technical_create",
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
                    window.alert('user Register Succfully')
                } 
            } catch (error) {
                if (error.response.status === 420) {
                    console.log("Device is already installed", error);
                    window.alert("Device is already installed");
                } 
               else if (error.response.status === 400) {
                    console.log("Device not found", error);
                    window.alert("Device not found");
                } 
                else if (error.response.status === 402) {
                    window.alert("validations Fail")
                }  else {
                    console.log("Internal Server Error", error);
                    window.alert("Internal Server Error")
                }
            }
        } else {
            window.alert("Plesae Fill All the feilds")
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
            <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll bg'>
                <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
                <div className='m-2 p-2 bg-white mt-0'>
                    <h1 className='text-xl font-semibold bg-gray-400 p-2 m-2'>Technical Details</h1>
                    <div className='flex grid lg:grid-cols-2 md:grid-cols-1'>
                        <div className=' flex flex-col justify-center'>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Customer Id :</p><input onChange={getUserData} className=' ml-3 custum_input p-1 ' value={customer.client_code} style={{ width: "55%" }} readOnly/> </div>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Vender:</p><input onChange={getUserData} name='vendor_name' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Device ID :</p><input onChange={getUserData} name='device_id' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> IMEI Number :</p><input onChange={getUserData} name='IMEI_no' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> GSM Number :</p><input onChange={getUserData} name='Gsm_no' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> TAVL mang. ID :</p><input onChange={getUserData} name='Tavl_mang_id' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Designated Technician:</p><input onChange={getUserData} name='technician_name' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                        </div >
                        <div className='space-y-3'>
                            <div className='flex justify-around ' >
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
                            </div>
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
                            <div className='flex justify-around ' >
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
                            </div>
                            {showAdditionalFields && (
                                <div className='space-y-2 justify-start px-4'>
                                    <div className='flex justify-center my-2'><p className='text-start ' style={{ width: "40%" }}> WebTrack Login ID :</p><input onChange={getUserData} name='webtrack_id' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                                    <div className='flex justify-center my-2'><p className='text-start ' style={{ width: "40%" }}> WebTrack Password :</p><input onChange={getUserData} name='webtrack_pass' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                                </div>
                            )}
                        </div>
                        <div className=' flex flex-col mt-3 p-2'>
                            <h1 className='text-xl font-semibold bg-gray-400 p-2 m-2'>VAS</h1>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Location On Call :</p><input onChange={getUserData} name='' readOnly  value={vas && vas.includes('Location on Call') ? 'Yes' : 'No'} className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Igination On :</p><input onChange={getUserData} name='' readOnly value={vas && vas.includes('Ignition On') ? 'Yes' : 'No'} className=' ml-3 custum_input p-1 ' /> </div>
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
