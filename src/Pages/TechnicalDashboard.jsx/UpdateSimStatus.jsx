import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';

export default function UpdateSimStatus() {
    const [empName, setEmpName] = useState("");
    const [icc_id, seticc_id] = useState("");
    const [newDevice, setNewDevice] = useState({
        sim_no: "",
        sim_id:"",
        icc_id: "",
        provider: "",
        status: "",
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
        const { imei_no, sim_no, icc_id, sim_id } = newDevice
        if ( imei_no && sim_no && icc_id, sim_id) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/create_update_sim_inventory`,
                    newDevice,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );

                console.log(response); // use response.data.data to get the server response

                if (response.status === 200) {
                    console.log("Request successful");
                    toast.success('Sim updated Successfully')
                } else {
                    toast.error("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    console.log(error);
                    toast.error("This device already exists");
                }
                else if (error.response.status === 402) {
                    toast.error("Sim OR ICC Id is not found in the Inventory")
                } else {
                    console.log("Internal Server Error", error);
                    toast.error("Internal Server Error")
                }
            }
        } else {
            toast.error("Plesae Fill All the feilds")
        }
    }

    const SearchDevice = async (e) => {
        if (icc_id.trim() !== "") {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/search_update_sim_inventory`,
                    { icc_id },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );

                console.log(response); // use response.data.data to get the server response

                if (response.status === 200) {
                    console.log("Request successful");
                    toast.success('Updated Successfully')
                    setNewDevice({
                        ...newDevice,
                        sim_id: response.data.data.id,
                        sim_no: response.data.data.sim_no || "",
                        icc_id: response.data.data.icc_id,
                        provider: response.data.data.provider,
                        status:response.data.data.status
                    })
                    console.log("newDevice",newDevice)
                } else {
                    toast.error("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    // console.log("Error:", "User Already Registered With This Credentails", error);
                    toast.error("Sim NOt Found");
                }
                else if (error.response.status === 402) {
                    toast.error("Please Enter A Valid Device Num")
                } else {
                    console.log("Internal Server Error", error);
                    toast.error("Internal Server Error")
                }
            }
        } else {
            toast.error("Plesae Enter An ICC ID")
        }
    }

    useEffect(() => {
        setEmpName(cookies.get('name'));
    }, [empName]);

    return (
        <div>
            <ToastContainer position="top-center"/>
            <div className='flex justify-content-center my-3 mb-5'>
                <input onChange={(e) => seticc_id(e.target.value)} name="search_term" className='w-96 mx-4  p-2 custum_input' placeholder='Enter ICC ID' />
                <button className='theme_btn_md rounded-0 ' onClick={SearchDevice}>Search</button>
            </div>
            <div>
            <div className='flex grid lg:grid-cols-2 md:grid-cols-1 my-4'>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Sim Num :</p><input name='sim_no' onChange={getUserData} className=' ml-3 custum_input  p-1 ' style={{ width: "55%" }} value={newDevice && newDevice.sim_no}/> </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> ICC ID  :</p><input name='icc_id' onChange={getUserData} readOnly className=' ml-3 custum_input p-1 cursor-not-allowed' style={{ width: "55%" }} value={newDevice && newDevice.icc_id}/> </div>
                </div>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Nature of Sim</p><select className='input-field  ml-4 p-1  border bg-white' onChange={getUserData} name='status' style={{ width: "55%" }} aria-label=".form-select-lg example" value={newDevice && newDevice.status}>
                        <option value="">Select Nature Of Sim </option>
                        <option value="availiable">Available</option>
                        <option value="in stock">IN Stock </option>
                        <option value="blanked">Blanked</option>
                    </select>
                    </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Provider :</p><input name='provider' onChange={getUserData} readOnly value={newDevice && newDevice.provider} className=' ml-3 custum_input p-1 cursor-not-allowed' style={{ width: "55%" }} /> </div>
                </div>
            </div >
            <button className='theme_btn_md float-end my-4 rounded-0' onClick={addDevice}>Submit</button>
        </div>
        </div>
    )
}
