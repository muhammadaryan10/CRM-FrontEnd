import React, { useEffect, useState } from 'react'
import SuperVisorSidebar from '../../Components/SuperVisorSidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';

export default function AddPayment() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [additionalFields, setAdditionalFields] = useState(false);
    const [data, setData] = useState();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [empName, setEmpName] = useState("")
    const cookies = new Cookies();

    const [addPayment, setAddPayment] = useState({
        renewal_id: "",
        status: "",
    })
    const { reg_no } = useParams();

    const getUserInfo = async () => {
        try {
            console.log(reg_no)
            const res = await fetch(`http://127.0.0.1:8000/api/renewals_info/${reg_no}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res}`);
            }

            const response = await res.json();
            console.log("data>>", response);
            setAddPayment({
                renewal_id: response.data.renewal_id,
            })
            setData(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    let name, value
    const getUserdata = (e) => {
        name = e.target.name;
        value = e.target.value;
        setAddPayment({ ...addPayment, [name]: value });
        console.log(addPayment)
    }

    const addNewPayment = async () => {
        const {  status, renewal_id } = addPayment
        if ( status, renewal_id) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/update_status_renewal",
                    addPayment,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );

                console.log(response);
                if (response.status === 200) {
                    // console.log("Request successful");
                    toast.success('Status Updated Succfully')
                }
            } catch (error) {
                if (error.response.status === 400) {
                    // console.log("Device not found", error);
                    toast.error("Device not found");
                }
                else if (error.response.status === 402) {
                    // console.log(error);
                    toast.error("validations Fail")
                } else {
                    // console.log("Internal Server Error", error);
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
    return (
        <div>
            <div className='flex h-[100vh] bg-black'>
                {isSidebarOpen && (
                    <div className="sidebar"><SuperVisorSidebar /></div>
                )}
                   <ToastContainer/>
                <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll bg'>
                    <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
                    <div className='border-2 border-black rounded-2 shadow-lg '>
                        <h1 className='text-xl font-semibold bg-black text-white p-2 '>Renewal Information  </h1>
                        <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-x-3 mt-2 p-2'>
                            <div className='p-2 space-y-2'>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Segment :
                                    </p>
                                    <p className='text-md  w-60'>{data && data.segment}
                                    </p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Customer Name :
                                    </p>
                                    <p className='text-md  w-60'>{data && data.customer_name}</p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Contact :</p>
                                    <p className='text-md  w-60'>{data && data.contact}</p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Tracker Charges:</p>
                                    <p className='text-md  w-60'>{data && data.tracker_charges}</p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Registration # :</p>
                                    <p className='text-md  w-60'>{data && data.Reg_no}</p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Sales Person:</p>
                                    <p className='text-md  w-60'>{data && data.sales_person}</p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Date of Renewal :
                                    </p>
                                    <p className='text-md  w-60'>{data && data.renewal_date}</p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Month :
                                    </p>
                                    <p className='text-md  w-60'>{data && data.month}</p>
                                </div>
                            </div>
                            <div className='p-2 space-y-2'>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'> City :</p>
                                    <p className='text-md  w-60'>{data && data.city}</p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Date of Installation :
                                    </p>
                                    <p className='text-md  w-60'>{data && data.date_of_installation}</p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Renewal Amount :
                                    </p>
                                    <p className='text-md  w-60'>{data && data.renewal_charges}</p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>
                                        Engine # :</p>
                                    <p className='text-md  w-60'>{data && data.engine}</p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Reference # :</p>
                                    <p className='text-md  w-60'>{data && data.reference}</p>
                                </div>
                                <div className='flex border p-2 border-black'>
                                    <p className='text-md font-bold w-40'>Chassis # :</p>
                                    <p className='text-md  w-60'>{data && data.chasis_no}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <h1 className='text-xl font-bold mt-4 m-2'>Change Status</h1>
                        <div className='grid grid-cols-2 m-2'>
                            <div>
                                <div className='my-4'>
                                    <label className='mr-3 w-40' >Status :</label>
                                    <select class='input-field  ml-4 p-1  border bg-white' name='status' onChange={getUserdata} style={{ width: "55%" }} aria-label=".form-select-lg example">
                                        <option value="">Select Status </option>
                                        <option value="paid">Paid</option>
                                        <option value="unpaid">Un Paid </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end m-4">
                            <button className="p-2 bg-black text-white rounded-1" onClick={addNewPayment}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
