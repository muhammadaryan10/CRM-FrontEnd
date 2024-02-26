import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';

export default function AddAnotherDevice() {
    const [search_term, setSearch_term] = useState("");
    const [data ,setData ]=useState([])
    const [newDevice, setNewDevice] = useState({
        client_id: "",
        device_id_1: "",
    })

    const addDevice = async (e) => {
        const {  client_id , device_id_1 } = newDevice
        if (client_id && device_id_1 ) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/create_another_device",
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
                    window.alert('Device Added Successfully')
                } else {
                    window.alert("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    console.log( error);
                    window.alert("Already have 2 devices");
                }
                else if (error.response.status === 402) {
                    window.alert("Please Fill All the Feilds")
                }
                else if (error.response.status === 401) {
                    console.log(error)
                    window.alert("Device Is Already Installed")
                } else {
                    console.log("Internal Server Error", error);
                    window.alert("Internal Server Error")
                }
            }
        } else {
            window.alert("Plesae Fill All the feilds")
        }
    }

    const SearchDevice = async (e) => {
        if (search_term.trim() !== "") {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/seach_secondary_device",
                    {search_term},
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
                    window.alert('Data Founded Successfully')
                    setData(response.data)
                    setNewDevice({
                        ...newDevice,
                        client_id:response.data.user.id,

                    })
                } else {
                    window.alert("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    window.alert("Device is installed please unisntall first");
                }
                else if (error.response.status === 402) {
                    window.alert("Please Enter A Valid Device Num")
                } else {
                    console.log("Internal Server Error", error);
                    window.alert("Internal Server Error")
                }
            }
        } else {
            window.alert("Plesae Fill All the feilds")
        }
    }

    return (
        <div>
            <div className='flex justify-content-center my-3 mb-5'>
                <input onChange={(e) => setSearch_term(e.target.value)} name="search_term" className='w-96 mx-4  p-2 custum_input' placeholder='Enter Registration Num' />
                <button className='theme_btn_md rounded-0 ' onClick={SearchDevice}>Search</button>
            </div>
            <div className='flex grid lg:grid-cols-2 md:grid-cols-1 my-4'>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Custumer Name :</p><input name='device_serialno'  value={data.user && data.user.customer_name} className=' ml-3 custum_input  p-1  cursor-not-allowed' style={{ width: "55%" }}  readOnly/> </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Engine Num :</p><input  value={data.user && data.user.engine_no} className=' ml-3 custum_input  p-1 cursor-not-allowed ' style={{ width: "55%" }} readOnly /> </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Device ID :</p><input name='sim_no'  value={data.technical && data.technical.device_id} className=' ml-3 custum_input p-1 cursor-not-allowed ' style={{ width: "55%" }} readOnly /> </div>
                    
                </div>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Secendory Device :</p><input  className=' ml-3 custum_input p-1 ' name='device_id_1' onChange={(e)=> setNewDevice({...newDevice,device_id_1:e.target.value})} style={{ width: "55%" }} placeholder='Enter Secendory Device ID ' /> </div>
                </div>
            </div >
            <button className='theme_btn_md float-end my-4 rounded-0' onClick={addDevice}>Submit</button>
        </div>
    )
}
