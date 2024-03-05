import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';

export default function AtachSimNumber() {
    const [empName, setEmpName] = useState("")
    const [Device, setDevice] = useState([])
    const [Sim, setSim] = useState("")
    const [deviceTerm, setDeviceTerm] = useState('')
    const [simTerm, setSimTerm] = useState("")
    const [Attach,setAttach]=useState({
        device_serialno:"",
        sim_no:"",
        representative:""
    })

    const searchDevice = async () => {
        if (deviceTerm.trim() !== "") {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/get_device_no`,
                    { search_term: deviceTerm },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );

                console.log(response); // use response.data to get the server response

                if (response.status === 200) {
                    setDevice(response.data.data)
                    setAttach({
                        ...Attach,
                        device_serialno:response.data.data.device_serialno,
                        representative:empName
                    })
                    console.log("Request successful");
                    toast.success('Device Added Successfully')
                    console.log(Device)
                } else {
                    toast.error("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    setDevice()
                    toast.error("This device Already Installed");
                }
                else if (error.response.status === 402) {
                    setDevice()
                    toast.error("Device Not Found")
                } else {
                    setDevice()
                    console.log("Internal Server Error", error);
                    toast.error("Internal Server Error")
                }
            }
        } else {
            toast.error("Please Enter The Device Num")
        }
    }

    const searchSim = async () => {
        if (simTerm.trim() !== "") {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/get_sim_no`,
                    { search_term: simTerm },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );

                console.log(setSim);

                if (response.status === 200) {
                    setSim(response.data.data)
                    setAttach({
                        ...Attach,
                        sim_no:response.data.data.sim_no,
                        representative:empName
                    })
                    console.log("Request successful");
                    toast.success('Sim Founded Successfully')
                    console.log(Attach)
                    return
                } else {
                    toast.error("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    setSim()
                    toast.error("This Sim Already Installed");
                }
                else if (error.response.status === 402) {
                    setSim()
                    toast.error("Sim Not Found")
                } else {
                    setSim()
                    console.log("Internal Server Error", error);
                    toast.error("Internal Server Error")
                }
            }
        } else {
            toast.error("Please Enter The Sim Num")
        }
    }

    const cookies = new Cookies();

    const attachDevice = async (e) => {
        const { device_serialno, sim_no, representative } = Attach
        if (device_serialno && sim_no && representative ) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/create_merge_inventory`,
                    Attach,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );

                console.log(response); 
                if (response.status === 200) {
                    setDevice()
                    setAttach()
                    console.log("Request successful");
                    toast.success('Device Attached  Successfully')
                } else {
                    toast.error("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    toast.error("Error In Submision ");
                }
                else if (error.response.status === 402) {
                    toast.error("Please Fill All the Feilds")
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
        setDevice({
            ...Device,
            representative: empName,
        });
    }, [empName]);

    return (
        <div>
            <ToastContainer position="top-center"/>
            <div className='flex grid lg:grid-cols-2 md:grid-cols-1 my-4'>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-content-center my-3 mb-5'>
                        <input onChange={(e) => setDeviceTerm(e.target.value)} className='w-96 mx-4  p-2 custum_input' placeholder='Enter Device Num' />
                        <button className='theme_btn_md rounded-0 ' onClick={searchDevice}>Search</button>
                    </div>
                    <div className=' flex flex-col justify-between'>
                        <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Device Serial No :</p><input readOnly value={Device && Device.device_serialno} className=' ml-3 custum_input cursor-not-allowed  p-1 ' style={{ width: "55%" }} /> </div>
                        <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> IMEI Number :</p><input readOnly value={Device && Device.imei_no} className=' ml-3 custum_input cursor-not-allowed p-1 ' style={{ width: "55%" }} /> </div>
                        <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Vender:</p><input readOnly value={Device && Device.vendor} className=' ml-3 custum_input cursor-not-allowed p-1 ' style={{ width: "55%" }} /> </div>
                    </div>
                </div>
                <div className=' flex flex-col justify-between'>
                    <div className='flex justify-content-center my-3 mb-5'>
                        <input onChange={(e) => setSimTerm(e.target.value)} className='w-96 mx-4  p-2 custum_input' placeholder='Enter Device Num' />
                        <button className='theme_btn_md rounded-0 ' onClick={searchSim}>Search</button>
                    </div>
                    <div className=' flex flex-col justify-between'>
                        <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Sim Num :</p><input readOnly value={Sim && Sim.sim_no} className=' ml-3 custum_input cursor-not-allowed  p-1 ' style={{ width: "55%" }} /> </div>
                        <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> ICC ID  :</p><input readOnly value={Sim && Sim.icc_id} className=' ml-3 custum_input cursor-not-allowed p-1 ' style={{ width: "55%" }} /> </div>
                        <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Provider :</p><input readOnly value={Sim && Sim.provider} className=' ml-3 custum_input cursor-not-allowed p-1 ' style={{ width: "55%" }} /> </div>

                    </div>
                </div>
            </div >
            <button className='theme_btn_md float-end my-4 rounded-0' onClick={attachDevice}>Attach    </button>
        </div>
    )
}
