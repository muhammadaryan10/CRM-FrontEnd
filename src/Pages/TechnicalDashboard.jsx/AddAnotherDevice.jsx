import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';

export default function AddAnotherDevice() {
    const [search_term, setSearch_term] = useState("");
    const [data, setData] = useState([])
    const [search_Device, setSearch_Device] = useState("")
    const [apiResult, setApiResult] = useState([]);
    const [isListOpen, setIsListOpen] = useState(false);
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [newDevice, setNewDevice] = useState({
        client_id: "",
        primary_device: "",
        technical_id: "",
        secondary_device: "",
        reg_no: "",
        customer_name: ""
    })

    const addDevice = async (e) => {
        const { client_id, device_id_1 } = newDevice
        // if (client_id && device_id_1) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/create_another_device`,
                    newDevice,
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
                    toast.success('Device Added Successfully')
                } else {
                    toast.error("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    console.log(error);
                    toast.error("Already have 2 devices");
                }
                else if (error.response.status === 402) {
                    toast.error("Please Fill All the Feilds")
                }
                else if (error.response.status === 401) {
                    console.log(error)
                    toast.error("Device Is Already Installed")
                } else {
                    console.log("Internal Server Error", error);
                    toast.error("Internal Server Error")
                }
            }
        // } else {
        //     toast.error("Plesae Fill All the feilds")
        // }
    }
    const getDeviceData = async (e) => {
        const { name, value } = e.target;
        if (name === "device_id") {
            setIsListOpen(value.trim().length > 0); // Close list only if value is not empty
        } else {
            setIsListOpen(true);
        }

        setSelectedDeviceId(value)
        const search_term = [value];
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
    const handleDeviceIdSelect = (deviceId) => {
        setSelectedDeviceId(deviceId);
        setNewDevice(prevState => ({
            ...prevState,
            secondary_device: deviceId,
        }));
        setIsListOpen(false)
        console.log(newDevice)
    };

    const close = async (e) => {
        setIsListOpen(false)
        setNewDevice({
            ...newDevice,
            secondary_device: "",
        })
    }
    const SearchDevice = async (e) => {
        if (search_term.trim() !== "") {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/seach_secondary_device`,
                    { search_term },
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
                    toast.success('Data Founded Successfully')
                    setData(response.data)
                    setNewDevice({
                        ...newDevice,
                        client_id: response.data.user.id,
                        customer_name:response.data.user.customer_name,
                        primary_device:response.data.technical.device_id,
                        technical_id:response.data.technical.technical_id,
                        reg_no: response.data.user.registeration_no
                    })
                } else {
                    toast.error("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    toast.error("Data not Found");
                }
                else if (error.response.status === 402) {
                    toast.error("Please Enter A Valid Device Num")
                } else {
                    console.log("Internal Server Error", error);
                    toast.error("Internal Server Error")
                }
            }
        } else {
            toast.error("Plesae Fill All the feilds")
        }
    }

    return (
        <div>
            <div className='flex justify-content-center my-3 mb-5'>
                <input onChange={(e) => setSearch_term(e.target.value)} name="search_term" className='w-96 mx-4  p-2 custum_input' placeholder='Enter Registration Num' />
                <button className='theme_btn_md rounded-0 ' onClick={SearchDevice}>Search</button>
            </div>
            <ToastContainer position="top-center" />
            <div className='flex grid lg:grid-cols-2 md:grid-cols-1 my-4'>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Custumer Name :</p><input name='device_serialno' value={data.user && data.user.customer_name} className=' ml-3 custum_input  p-1  cursor-not-allowed' style={{ width: "55%" }} readOnly /> </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Engine Num :</p><input value={data.user && data.user.engine_no} className=' ml-3 custum_input  p-1 cursor-not-allowed ' style={{ width: "55%" }} readOnly /> </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Device ID :</p><input name='sim_no' value={data.technical && data.technical.device_id} className=' ml-3 custum_input p-1 cursor-not-allowed ' style={{ width: "55%" }} readOnly /> </div>

                </div>
                <div className=' flex flex-col'>
                    {/* <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>  Device :</p><input  className=' ml-3 custum_input p-1 ' name='device_id_1' onChange={(e)=> setNewDevice({...newDevice,device_id_1:e.target.value})} style={{ width: "55%" }} placeholder='Enter Secendory Device ID ' /> </div> */}
                    <div className='flex justify-center my-2'><p className='text-start md:text-start' style={{ width: "40%" }}> Device ID :</p><input value={selectedDeviceId} onChange={getDeviceData} name='device_id' className=' ml-3 custum_input p-1 relative' style={{ width: "55%" }} /> </div>
                    {isListOpen && (
                        <div className='flex justify-center my-2 relative' >
                            <div className='absolute -top-2 right-2 z-0 bg-white overflow-y-scroll shadow' style={{ width: "55%", maxHeight: "300px" }}>
                                <div className='flex flex-col justify-center items-center  space-y-2  p-2'>
                                    {apiResult.map(item => (
                                        <div key={item.id} className='w-100 hover:bg-gray-300 p-1' onClick={() => handleDeviceIdSelect(item.device_serialno)}>
                                            {item.device_serialno}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
            <button className='theme_btn_md float-end my-4 rounded-0' onClick={addDevice}>Submit</button>
        </div>
    )
}
