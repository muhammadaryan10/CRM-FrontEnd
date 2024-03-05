import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Cookies from 'universal-cookie'

export default function DeviceInventoryTech() {
    const [empName, setEmpName] = useState("")
    const [newDevice, setNewDevice] = useState({
        device_serialno: "",
        imei_no: "",
        vendor: "",
        representative: "",
    })
    const cookies = new Cookies();


    let name, value
    const getUserData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setNewDevice({ ...newDevice, [name]: value });
        console.log(newDevice);
    };

    const addDevice = async (e) => {
        const { device_serialno, imei_no, vendor } = newDevice
        if (device_serialno && imei_no && vendor  ) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/storeinventory`,
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
                }else {
                    toast.error("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    // console.log("Error:", "User Already Registered With This Credentails", error);
                    console.log(error)
                    toast.error("This device already exists");
                }
                else if (error.response.status === 402) {
                    toast.error("Please Fill All the Feilds")
                    console.log(error)
                }  else {
                    console.log("Internal Server Error", error);
                    toast.error("Internal Server Error")
                }
            }
        } else {
            window.alert("Plesae Fill All the feilds")
        }
    }

    useEffect(() => {
        
        setEmpName(cookies.get('name'));
        console.log(empName)
        setNewDevice({
            ...newDevice,
            representative: empName,
        });
    }, [empName]);


    return (
        <div>
            <ToastContainer position="top-center"/>
            <div className='flex grid lg:grid-cols-2 md:grid-cols-1 my-4' >
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Device ID :</p><input name='device_serialno' onChange={getUserData} className=' ml-3 custum_input  p-1 ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> IMEI Number :</p><input name='imei_no' onChange={getUserData} className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                </div>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Vendor :</p><input name='vendor' onChange={getUserData} className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                </div>
            </div >
            <button className='theme_btn_md float-end my-4 rounded-0' onClick={addDevice}>Submit</button>
        </div>
    )
}
