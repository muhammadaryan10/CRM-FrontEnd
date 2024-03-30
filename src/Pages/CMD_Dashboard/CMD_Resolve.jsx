import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import CMD_Sidebar from '../../Components/CMD_Sidebar';

export default function CMD_Resolve() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const cookies = new Cookies();
    const [resolvedComplains, setResolvedComplains] = useState({
        nature: "",
        complain_id: "",
        status: "",
        remarks: "",
        representative: ""
    })
    const { complain_id } = useParams();

    const getUserInfo = async () => {
        try {

            console.log(complain_id)
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/complain_resolve/${complain_id}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res}`);
            }

            const response = await res.json();
            console.log("data>>", response);
            setResolvedComplains({
                nature: response.data.nature,
                complain_id: response.data.complain_id,
                representative: userName
            })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    let name, value
    const getUserdata = (e) => {
        name = e.target.name;
        value = e.target.value;
        setResolvedComplains({ ...resolvedComplains, 
            representative:userName,
            [name]: value });
        console.log(resolvedComplains)
    }

    const ResolveComplain = async () => {
        const { nature, complain_id, status, remarks } = resolvedComplains
        if (nature, complain_id, status, remarks) {
            try {
                console.log(userName)
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/create_resolve_complain`,
                    resolvedComplains,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                ); 
                console.log(response);
                if (response.status === 200) {
                    console.log("Request successful");
                    toast.success('Complain Resolved Succfully')
                    setTimeout(() => {
                        navigate('/cmd'); 
                    }, 500);
                }
            } catch (error) {
                if (error.response.status === 400) {
                    // console.log("Device not found", error);
                    toast.error("Device not found");
                }
                else if (error.response.status === 402) {
                    // console.log(error);
                    toast.error("Please Fill All the feilds")
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
        const userNameFromCookie = cookies.get('name');
        setUserName(userNameFromCookie)
        getUserInfo();
    }, []);

    return (
        <div className='flex h-[100vh] bg-black'>
            {isSidebarOpen && (
                <div className="sidebar"><CMD_Sidebar /></div>
            )}
            <ToastContainer />
            <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll bg'>
                <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
                <div className='m-2 p-2 bg-white mt-0'>
                    <h1 className='text-xl font-semibold bg-gray-400 p-2 m-2'>Complain Resolve Form</h1>
                    <div className='flex grid lg:grid-cols-2 md:grid-cols-1'>
                        <div className=' flex flex-col justify-center'>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Complain ID :</p><input value={resolvedComplains.complain_id} name='client_code' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Complain :</p><input value={resolvedComplains.nature} name='vendor_name' className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                        </div >
                        <div className=' flex flex-col justify-center'>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Remarks :</p><input name='remarks' onChange={getUserdata} className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start' style={{ width: "40%" }}> Type :</p>
                                <select class='input-field  ml-4 p-1  border bg-white' name='status' onChange={getUserdata} style={{ width: "55%" }} aria-label=".form-select-lg example">
                                    <option value="">Select Type Of complain </option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Update">Update </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-200 flex justify-end p-2 mx-2'>
                        <button className='theme_btn_md rounded-0' onClick={ResolveComplain}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
