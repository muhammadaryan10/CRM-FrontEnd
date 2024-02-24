import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';

export default function UpdateICC() {
    const [empName, setEmpName] = useState("");
    const [search_term, setSearch_term] = useState("");
    const [newDevice, setNewDevice] = useState({
        device_serialno: "",
        imei_no: "",
        vendor: "",
        devciesim_no: "",
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
        const { device_serialno, imei_no, vendor, devciesim_no } = newDevice
        if (device_serialno && imei_no && vendor && devciesim_no) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/storeinventory",
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
                    // console.log("Error:", "User Already Registered With This Credentails", error);
                    window.alert("This device already exists");
                }
                else if (error.response.status === 402) {
                    window.alert("Please Fill All the Feilds")
                } else {
                    console.log("Internal Server Error", error);
                    window.alert("Internal Server Error")
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
       <div className='flex justify-content-center my-3 mb-5'>
        <input onChange={(e) => setSearch_term(e.target.value)} name="search_term" className='w-96 mx-4  p-2 custum_input' placeholder='Enter Device Num' />
        <button className='theme_btn_md rounded-0 ' onClick="">Search</button>
      </div>
      <div className='flex grid lg:grid-cols-2 md:grid-cols-1 my-4'>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Device Num :</p><input name='device_serialno' onChange={getUserData} className=' ml-3 custum_input  p-1 ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>IMEI Num :</p><input name='device_serialno' onChange={getUserData} className=' ml-3 custum_input  p-1 ' style={{ width: "55%" }} /> </div>
                </div>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Sim Num :</p><input name='vendor' onChange={getUserData} className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> ICC ID :</p><input name='vendor' onChange={getUserData} className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                </div>
            </div >
            <button className='theme_btn_md float-end my-4 rounded-0' onClick={addDevice}>Submit</button>
    </div>
  )
}
