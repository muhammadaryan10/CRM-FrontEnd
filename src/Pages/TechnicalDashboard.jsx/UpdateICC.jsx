import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';

export default function UpdateICC() {
    const [empName, setEmpName] = useState("");
    const [search_term, setSearch_term] = useState("");
    const [newDevice, setNewDevice] = useState({
        device_serialno: "",
        imei_no: "",
        sim_no: "",
        icc_id: "",
        sim_id: "",
    })
    const cookies = new Cookies();


    let name, value
    const getUserData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setNewDevice({
            ...newDevice,
            representative: empName,
            [name]: value
        });
        console.log(newDevice);
    };

    const addDevice = async (e) => {
        const { device_serialno, imei_no, sim_no, icc_id, sim_id } = newDevice
        if (device_serialno && imei_no && sim_no && icc_id, sim_id) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/update_merge_inventory`,
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
                    console.log(error);
                    window.alert("This device already exists");
                }
                else if (error.response.status === 402) {
                    window.alert("Sim OR ICC Id is not found in the Inventory")
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
                    `${process.env.REACT_APP_BACKEND_URL}/search_merge_inventory`,
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
                    window.alert('Device Added Successfully')
                    setNewDevice({
                        ...newDevice,
                        device_serialno: response.data.device_details.device_serialno,
                        imei_no: response.data.device_details.imei_no,
                        sim_no: response.data.sim_details.sim_no,
                        icc_id: response.data.sim_details.icc_id,
                        sim_id: response.data.device_details.sim_id,
                    })
                } else {
                    window.alert("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    // console.log("Error:", "User Already Registered With This Credentails", error);
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

    useEffect(() => {
        setEmpName(cookies.get('name'));
    }, [empName]);

    return (
        <div>
            <div className='flex justify-content-center my-3 mb-5'>
                <input onChange={(e) => setSearch_term(e.target.value)} name="search_term" className='w-96 mx-4  p-2 custum_input' placeholder='Enter Device Num' />
                <button className='theme_btn_md rounded-0 ' onClick={SearchDevice}>Search</button>
            </div>
            <div className='flex grid lg:grid-cols-2 md:grid-cols-1 my-4'>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Device Num :</p><input name='device_serialno' onChange={getUserData} readOnly value={newDevice.device_serialno} className=' ml-3 custum_input  p-1 ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>IMEI Num :</p><input name='imei_no' onChange={getUserData} readOnly value={newDevice.imei_no} className=' ml-3 custum_input  p-1 ' style={{ width: "55%" }} /> </div>
                </div>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Sim Num :</p><input name='sim_no' onChange={getUserData} value={newDevice.sim_no} className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> ICC ID :</p><input name='icc_id' onChange={getUserData} value={newDevice.icc_id} className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                </div>
            </div >
            <button className='theme_btn_md float-end my-4 rounded-0' onClick={addDevice}>Submit</button>
        </div>
    )
}
