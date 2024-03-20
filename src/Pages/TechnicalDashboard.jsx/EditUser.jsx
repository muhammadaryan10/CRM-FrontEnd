import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Technical_Sidebar from '../../Components/Technical_Sidebar';

export default function EditUser() {
    const [search_term, setSearch_term] = useState("")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState({
        customer_name: "",
        address: "",
        registeration_no: "",
        mobileno_1: "",
        mobileno_2: "",
        mobileno_3: "",
        cnic: "",
        seconadryuser_name: "",
        relationship: "",
        secondaryuser_con1: "",
        installation_loc: "",
        tracker_charges: "",
        date_of_installation: "",
        remarks: "",
        renewal_charges: "",
        customer_email: "",
        emergency_pass: "",
        emergency_person: "",
        security_ques: "",
        security_ans: "",
        password: "",
        emergency_person_contact: "",
        representative: ""
    })

    const getUserInfo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/serach_user`,
                { search_term: search_term }
            );

            // Log the entire response object to inspect its structure
            console.log(response);

            // Check if the response is successful and contains the expected data
            if (response && response.data && response.data.data) {
                const data = response.data.data;
                setUser({
                    customer_name: data.user.customer_name,
                    address: data.user.address,
                    registeration_no: data.user.registeration_no,
                    mobileno_1: data.user.mobileno_1,
                    mobileno_2: data.user.mobileno_2,
                    mobileno_3: data.user.mobileno_3,
                    cnic: data.user.cnic,
                    seconadryuser_name: data.user.seconadryuser_name,
                    relationship: data.user.relationship,
                    secondaryuser_con1: data.user.secondaryuser_con1,
                    installation_loc: data.user.installation_loc,
                    tracker_charges: data.user.tracker_charges,
                    date_of_installation: data.user.date_of_installation,
                    remarks: data.user.remarks,
                    renewal_charges: data.renewal_charges,
                    customer_email: data.security.customer_email,
                    emergency_pass: data.security.emergency_pass,
                    emergency_person: data.security.emergency_person,
                    security_ques: data.security.security_ques,
                    security_ans: data.security.security_ans,
                    password: data.security.password,
                    emergency_person_contact: data.security.emergency_person_contact,
                    representative: ""
                });
                console.log(user)
            } else {
                console.error("Unexpected response structure:", response);
                // Handle unexpected response structure or missing data
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response.status === 422) {
                toast.error("Please Enter Registration Number First ")
            }
            else if (error.response.status === 400) {
                console.log(error.response.data.message)
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Internal Server Error")
            }
        }
    };

    let name, value
    const getUserdata = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
        console.log(user);
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='flex h-[100vh] bg-black'>
            <ToastContainer />
            {isSidebarOpen && (
                <div className="sidebar"><Technical_Sidebar /></div>
            )}
            <div className=' rounded-xl m-2 p-2 w-100 overflow-y-scroll' style={{ backgroundColor: "#F0F0F0" }}>
                <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
                <div className='flex justify-content-center mb-8'>
                    <input className='w-96 mx-4  p-2' placeholder='Enter Registration Num' onChange={(e) => setSearch_term(e.target.value)} />
                    <button className='theme_btn_md mx-4 rounded' onClick={getUserInfo}>Search</button>
                </div>
                <div className='flex grid lg:grid-cols-2 gap-x-2 md:grid-co ls-1'>
                    <div className=' flex flex-col justify-center space-y-3'>
                        <div className='flex justify-center'>
                            <p className='text-start text-sm' style={{ width: "40%" }}> Customer Name  :</p>
                            <input className='ml-3 p-1 custom_input' style={{ width: "55%" }} value={user && user.customer_name} />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-start text-sm' style={{ width: "40%" }}> Registration Number:</p>
                            <input className='ml-3 p-1 custom_input' style={{ width: "55%" }}  value={user && user.registeration_no} name="registeration_no" />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-start text-sm' style={{ width: "40%" }}> CNIC :</p>
                            <input className='ml-3 p-1 custom_input' style={{ width: "55%" }} onChange={getUserdata} value={user && user.cnic} name="cnic" />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-start text-sm' style={{ width: "40%" }}> Contact Number :</p>
                            <input className='ml-3 p-1 custom_input' style={{ width: "55%" }} onChange={getUserdata} value={user && user.mobileno_1} name="mobileno_1" />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-start text-sm' style={{ width: "40%" }}> 2 Contact Number :</p>
                            <input className='ml-3 p-1 custom_input' style={{ width: "55%" }} onChange={getUserdata} value={user && user.mobileno_2} name="mobileno_2" />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-start text-sm' style={{ width: "40%" }}> 3 Contact Number :</p>
                            <input className='ml-3 p-1 custom_input' style={{ width: "55%" }} value={user && user.mobileno_3} name="mobileno_3" />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-start text-sm' style={{ width: "40%" }}> Address :</p>
                            <input className='ml-3 p-1 custom_input' style={{ width: "55%" }} value={user && user.address} name="address" />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-start text-sm' style={{ width: "40%" }}> Secondary User :</p>
                            <input className='ml-3 p-1 custom_input' style={{ width: "55%" }} value={user && user.seconadryuser_name} name="seconadryuser_name" />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-start text-sm' style={{ width: "40%" }}> Secondary User Contact  :</p>
                            <input className='ml-3 p-1 custom_input' style={{ width: "55%" }} onChange={getUserdata} value={user && user.secondaryuser_con1} name="secondaryuser_con1" />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-start text-sm' style={{ width: "40%" }}> Relationship with Secondary User :</p>
                            <input className='ml-3 p-1 custom_input' style={{ width: "55%" }} onChange={getUserdata} value={user && user.relationship} name="relationship" />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-start text-sm' style={{ width: "40%" }}>Special Instruction :</p>
                            <input className='ml-3 p-1 custom_input' style={{ width: "55%" }} onChange={getUserdata} value={user && user.remarks} name="remarks" />
                        </div>
                    </div >
                    <div className='space-y-3'>
                        <div className=' flex flex-col justify-center space-y-3'>
                            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Tracker Charges  :</p><input className=' ml-3 p-1 custum_input' style={{ width: "55%" }} value={user && user.tracker_charges} onChange={getUserdata} name="tracker_charges" /> </div>
                            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Renewals Charges :</p><input className=' ml-3 p-1 custum_input' style={{ width: "55%" }} value={user && user.renewal_charges} onChange={getUserdata} name="renewal_charges" /> </div>
                            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Customer Email :</p><input className=' ml-3 p-1 custum_input' style={{ width: "55%" }} value={user && user.customer_email} onChange={getUserdata} name="customer_email" /> </div>
                            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Password  :</p><input className=' ml-3 p-1 custum_input' style={{ width: "55%" }} value={user && user.password} onChange={getUserdata} name="password" /> </div>
                            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Emergency Password :</p><input className=' ml-3 p-1 custum_input' style={{ width: "55%" }} value={user && user.emergency_pass} onChange={getUserdata} name="emergency_pass" /> </div>
                            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Emergency Person :</p><input className=' ml-3 p-1 custum_input' style={{ width: "55%" }} value={user && user.emergency_person} onChange={getUserdata} name="emergency_person" /> </div>
                            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Emergency Person Contact :</p><input className=' ml-3 p-1 custum_input' style={{ width: "55%" }} value={user && user.emergency_person_contact} onChange={getUserdata} name="emergency_person_contact" /> </div>
                            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Security Question :</p><input className=' ml-3 p-1 custum_input' style={{ width: "55%" }} value={user && user.security_ques} onChange={getUserdata} name="security_ques" /> </div>
                            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Security Answer :</p><input className=' ml-3 p-1 custum_input' style={{ width: "55%" }} value={user && user.security_ans} onChange={getUserdata} name="security_ans" /> </div>
                            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Install Location :</p><input className=' ml-3 p-1 custum_input' style={{ width: "55%" }} value={user && user.installation_loc} onChange={getUserdata} name="installation_loc" /> </div>
                        </div>
                    </div>
                </div>
                <button className='theme_btn_md rounded-0 float-end my-3' onClick="">Submit</button>
            </div>
        </div>
    )
}
