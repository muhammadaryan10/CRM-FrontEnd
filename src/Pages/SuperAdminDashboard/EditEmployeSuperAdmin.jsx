import React, { useEffect, useState } from 'react'
import SuperAdminSidebar from '../../Components/SuperAdminSidebar';
import axios from 'axios';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditEmployeSuperAdmin() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [search_term, setSearch_term] = useState("");
    const [roles, setRoles] = useState([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [msg, setMsg] = useState("");
    const [successAlert,setsuccessAlert]=useState(false)
  
    const hideAlerts = () => {
      setsuccessAlert(false)
      setErrorAlert(false);
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [user, setUser] = useState({
        emp_id: "",
        em_loginid: "",
        password: "",
        emp_name: "",
        designation: "",
        contact: "",
        cnic: "",
        role: ""
    })

    const fetchData = async (e) => {
        e.preventDefault()
        try {
            console.log('agaya hn ')
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/view_update`,
                { login_id: search_term, }
            );
            console.log(res)
            console.log("data>>", res);
            // setData(res.data.data);
            setUser({
                ...user,
                emp_id: res.data.data.emp_id,
                em_loginid: res.data.data.em_loginid,
                password: res.data.data.password,
                emp_name: res.data.data.emp_name,
                designation: res.data.data.designation,
                contact: res.data.data.contact,
                cnic: res.data.data.cnic,
                role: res.data.data.role
            })
        } catch (error) {
            // console.error("Error fetching data:", error);
            if (error.response.status === 422) {
                setUser()
                setErrorAlert(true)
                setMsg("Please Fill All the Feilds");
            }
            else {
                setUser()
                setErrorAlert(true)
                setMsg("Data Not Found")
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

    const getRoles = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/roles`);
        const response = await res.json();
        console.log(response.data)
        setRoles(response.data)
    }

    const updateData = async (e) => {
        e.preventDefault()
        try {
            console.log('agaya hn ')
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_update_emp`,
                user
            );
            console.log(res)
            setMsg("Employee Updated SuccesFully")
            setsuccessAlert(true)
            console.log("data>>", res);
        } catch (error) {
            // console.error("Error fetching data:", error);
            if (error.response.status === 422) {
                setUser()
                setErrorAlert(true)
                setMsg("Please Fill All the Feilds");
            }
            else {
                setUser()
                console.log(error)
                setErrorAlert(true)
                setMsg("Data Not Found")
            }

        }
    }
    
    useEffect(() => {
        getRoles();
    }, []);

    return (
        <div>
            <div className='flex h-[100vh] bg-black'>
                {isSidebarOpen && (
                    <div className="sidebar"><SuperAdminSidebar /></div>
                )}
                {errorAlert && (
                    <div className="overlay">
                        <div className="popup">
                            <div className="alert alert-danger" role="alert">
                                <div className="flex justify-end">
                                    <button onClick={hideAlerts}><FontAwesomeIcon className='h-8' icon={faCircleXmark} /></button>
                                </div>
                                <h1 className="font-bold fs-4 my-2">An Errro Occured</h1>
                                {msg}
                            </div>
                        </div>
                    </div>
                )}
                {successAlert && (
                    <div className="overlay">
                        <div className="popup">
                            <div className="alert alert-success" role="alert">
                                <div className="flex justify-end">
                                    <button onClick={hideAlerts}><FontAwesomeIcon className='h-8' icon={faCircleXmark} /></button>
                                </div>
                                <h1 className="font-bold fs-4 my-2">An Errro Occured</h1>
                                {msg}
                            </div>
                        </div>
                    </div>
                )}
                <div className='rounded-xl m-2 p-2 w-100 overflow-y-scroll' style={{backgroundColor:"#F0EFEF"}}>
                    <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
                    <div class="mask d-flex align-items-center h-100 ">
                        <div class="container h-100">
                            <div class="row d-flex justify-content-center align-items-center h-100">
                                <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div class="bg-white shadow rounded-2xl">
                                        <div class="card-body p-5">
                                            <h2 class="text-uppercase font-bold text-2xl text-center mb-5">Update an employee</h2>
                                            <form>
                                                <label class="form-label" for="form3Example1cg">Search By Login ID </label>
                                                <div class="form-outline mb-4 flex">
                                                    <input type="text" id="form3Example1cg" class=" form-control form-control-sm  w-50" placeholder='Enter Login Id to Search' onChange={(e) => setSearch_term(e.target.value)} />
                                                    <button className='theme_btn_md ml-4' onClick={fetchData}>Search</button>
                                                </div>
                                                <label class="form-label" for="form3Example1cg">Employee Id</label>                                                    <div class="form-outline mb-4">
                                                    <input onChange={getUserdata} name='emp_id' value={user && user.emp_id} type="text" id="form3Example1cg" class=" form-control form-control-sm " />
                                                </div>

                                                <label class="form-label" for="form3Example3cg">Employee Name</label>                                                    <div class="form-outline mb-4">
                                                    <input onChange={getUserdata} name='emp_name' value={user && user.emp_name} type="text" id="form3Example3cg" class="form-control form-control-sm " />
                                                </div>

                                                <label class="form-label" for="form3Example4cg">Password</label>                                                    <div class="form-outline mb-4">
                                                    <input onChange={getUserdata} name='password' value={user && user.password} id="form3Example4cg" class="form-control form-control-sm " />
                                                </div>

                                                <label class="form-label" for="form3Example4cdg">Employee Login ID</label>                                                    <div class="form-outline mb-4">
                                                    <input onChange={getUserdata} name='em_loginid' value={user && user.em_loginid} type="text" id="form3Example4cdg" class="form-control form-control-sm " />
                                                </div>
                                                <label class="form-label" for="form3Example4cdg">Designation</label>                                                    <div class="form-outline mb-4">
                                                    <select name="role" onChange={getUserdata} id="form3Example1cg" className="form-control p-2">
                                                        {roles.map((roleGroup, index) => {
                                                            const roles = roleGroup.split(',').map(role => role.trim());

                                                            return roles.map((role, roleIndex) => (
                                                                <option key={`${index}-${roleIndex}`} value={role}>{role}</option>
                                                            ));
                                                        })}
                                                    </select>
                                                </div>
                                                <label class="form-label" for="form3Example4cdg">Contact </label>                                                    <div class="form-outline mb-4">
                                                    <input onChange={getUserdata} name='contact' value={user && user.contact} type="text" id="form3Example4cdg" class="form-control form-control-sm " />
                                                </div>
                                                <label class="form-label" for="form3Example1cg">CNIC </label>                                                    <div class="form-outline mb-4">
                                                    <input onChange={getUserdata} name='cnic' value={user && user.cnic} type="text" id="form3Example1cg" class=" form-control form-control-sm " />
                                                </div>
                                                {/* <label class="form-label" for="form3Example1cg">Employee Id</label>                                                    <div class="form-outline mb-4">
                                                    <input onChange={getUserdata} name='' value={user && user.} type="text" id="form3Example1cg" class=" form-control form-control-sm " />
                                                </div> */}
                                                {/* <label class="form-label" for="form3Example1cg">Image </label>                                                    <div class="form-outline mb-4">
                                                    <input onChange={getUserdata} name='' value={user && user.image} type="text" id="form3Example1cg" class=" form-control form-control-sm " />
                                                </div> */}
                                                <div class="d-flex justify-content-center">
                                                    <button type="button"
                                                        class=" w-100 btn-lg theme_btn_md p-3 " onClick={updateData}> Update</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
