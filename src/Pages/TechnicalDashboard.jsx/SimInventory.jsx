import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';

export default function SimInventory() {
    const [empName, setEmpName] = useState("")
    const [newSim, setNewSim] = useState({
        sim_no: "",
        icc_id: "",
        provider: "",
        status: "",
        representative:""
    })
    const cookies = new Cookies();


    let name, value
    const getUserData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setNewSim({ ...newSim, [name]: value });
        console.log(newSim);
    };

    const addDevice = async (e) => {
        const { sim_no, icc_id, provider, status } = newSim
        if (  icc_id && provider && status) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/create_sim_inventtory`,
                    newSim,
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
                    toast.success('Sim Added Successfully')
                } else {
                    toast.error("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    // console.log("Error:", "User Already Registered With This Credentails", error);
                    toast.error("This Sim already exists");
                }
                else if (error.response.status === 402) {
                    console.log(error);
                    toast.error("This SimmNo Or ICC ID has Been Already Registered")
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

        setEmpName(cookies.get('name'));
        console.log(empName)
        setNewSim({
            ...newSim,
            representative: empName,
        });
    }, [empName]);


    return (
        <div>
            <ToastContainer position="top-center"/>
            <div className='flex grid lg:grid-cols-2 md:grid-cols-1 my-4'>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Sim Num :</p><input name='sim_no' onChange={getUserData} className=' ml-3 custum_input  p-1 ' style={{ width: "55%" }} /> </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> ICC ID  :</p><input name='icc_id' onChange={getUserData} className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                </div>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Nature of Sim</p><select className='input-field  ml-4 p-1  border bg-white' onChange={getUserData} name='status' style={{ width: "55%" }} aria-label=".form-select-lg example">
                        <option value="">Select Nature Of Sim </option>
                        <option value="availiable">Available</option>
                        <option value="in stock">IN Stock </option>
                        <option value="blanked">Blanked</option>
                    </select>
                    </div>
                    <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Provider :</p><input name='provider' onChange={getUserData} className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                </div>
            </div >
            <button className='theme_btn_md float-end my-4 rounded-0' onClick={addDevice}>Submit</button>
        </div>
    )
}
