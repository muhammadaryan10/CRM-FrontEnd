import React, { useEffect, useState } from 'react'
import SuperVisorSidebar from '../../Components/SuperVisorSidebar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddUserSuperVisor() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const { reg_no } = useParams();
    const navigate = useNavigate();
    console.log(reg_no)

    const [ data , setData ]=useState()
    const [customer, setCustomer] = useState({
        customer_email: "",
        emergency_pass: "",
        emergency_person: "",
        security_ques: "",
        security_ans: "",
        password: "",
        emergency_person_contact: "",
        client_code: "",
        representative:""
    })
    const [empName, setEmpName] = useState("")
    const cookies = new Cookies();

    let name, value
    const getUserData = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
        console.log(customer);
    };

    const getUserInfo = async () => {
        try {
            console.log(reg_no)
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tech_reg/${reg_no}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res}`);
            }

            const response = await res.json();
            console.log("data>>", response);
            setData(response.data)
           
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const sendData = async (e) => {
        e.preventDefault();
        const { client_code, customer_email, emergency_pass, emergency_person, security_ques, security_ans, password, emergency_person_contact, representative } = customer
        if (client_code, emergency_pass, emergency_person, security_ques, security_ans, emergency_person_contact, representative,password) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/security_create`,
                    customer,
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
                    toast.success('User Register Succfully')
                    setTimeout(() => {
                        navigate('/sv'); 
                    }, 1000);
                } 
            } catch (error) {
                if (error.response.status === 420) {
                    console.log("Device is already installed", error);
                    toast.error("Device is already installed");
                } 
               else if (error.response.status === 400) {
                    console.log("Device not found", error);
                    toast.error("Error In Submision");
                } 
                else if (error.response.status === 402) {
                    console.log("Device is already installed", error);
                    toast.error("Please Enter a valid Email Address")
                }  else {
                    console.log("Internal Server Error", error);
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

    useEffect(() => {
        setEmpName(cookies.get('name'));
        console.log(empName)    
        setCustomer({
            ...customer,
            client_code:data && data.client_id,
            representative: empName,
        });
    }, [data]);

 
    return (
        <div className='flex h-[100vh] bg-black'>
            {isSidebarOpen && (
                <div className="sidebar"><SuperVisorSidebar /></div>
            )}
            <form onSubmit={sendData} className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll bg'>
                <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
                    <div className='flex grid lg:grid-cols-2 md:grid-cols-1'>
                        <div className=' flex flex-col mt-3 p-2'>
                            <h1 className='text-xl font-semibold bg-gray-400 p-2 m-2'>User Details</h1>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Customer Email :</p><input  onChange={getUserData} name='customer_email' type='email' className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Password :</p><input required onChange={getUserData} name='password' className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Emergency Password :</p><input required onChange={getUserData} name='emergency_pass' className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Emergency Person </p><input required onChange={getUserData} name='emergency_person' className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Emergency Person Contact:</p><input required onChange={getUserData} name='emergency_person_contact' className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Security Question :</p><input required onChange={getUserData} name='security_ques' className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Security Answer :</p><input required onChange={getUserData} name='security_ans' className=' ml-3 custum_input p-1 ' /> </div>

                        </div >
                        <div className=' flex flex-col mt-3 p-2'>
                            <h1 className='text-xl font-semibold bg-gray-400 p-2 m-2'>Other Details</h1>
                            <div className='flex  my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Customer Name :</p><input required value={data && data.customer_name} className=' ml-3 custum_input p-1 ' readOnly /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Registration Number :</p><input required value={data && data.reg_no} className=' ml-3 custum_input p-1 ' readOnly /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Chassis Number :</p><input required value={data && data.chasis_no} className=' ml-3 custum_input p-1 ' readOnly /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Engine Number :</p><input required value={data && data.engine_no} className=' ml-3 custum_input p-1 ' readOnly /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start' style={{ width: "40%" }}>Contact Number :</p><input required value={data && data.coontact_no} className=' ml-3 custum_input p-1 ' readOnly /> </div>
                        </div >
                    </div>
                    <div className='bg-gray-200 flex justify-end p-2 mx-2'>
                        <p className='bg-black p-1'>
                        <button className='theme_btn_md rounded-0' type='submit'>Submit</button></p>
                    </div>
            </form>
        </div>
    )
}
