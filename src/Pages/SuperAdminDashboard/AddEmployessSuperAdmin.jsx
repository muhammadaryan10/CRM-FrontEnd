import React, { useState } from 'react'
import SuperAdminSidebar from '../../Components/SuperAdminSidebar';
import { useEffect } from 'react';
import axios from 'axios';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';

export default function AddEmployessSuperAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [roles, setRoles] = useState([]);
  const [id, setId] = useState();
  const [errorAlert, setErrorAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [successAlert, setsuccessAlert] = useState(false)

  const hideAlerts = () => {
    setsuccessAlert(false)
    setErrorAlert(false);
  };

  const [newEmployee, setnewEmployee] = useState({
    emp_name: "",
    em_loginid: "",
    designation: "",
    contact: "",
    cnic: "",
    role: "",
    image: "",
    password: ""
  });

  let name, value
  const getUserdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setnewEmployee({ ...newEmployee, [name]: value });
  }


  console.log(newEmployee);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getRoles = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/roles`);
    const response = await res.json();
    console.log(response.data)
    setRoles(response.data)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setnewEmployee({ ...newEmployee, image: file });
  };


  const GetNewId = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add_employ`);
    const response = await res.json();
    setId(response.Emp_id)
    console.log(id)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { emp_name, em_loginid, designation, contact, cnic, role, image, password } = newEmployee;
    const formDataToSend = new FormData();
    formDataToSend.append('emp_name', emp_name);
    formDataToSend.append('em_loginid', em_loginid);
    formDataToSend.append('designation', designation);
    formDataToSend.append('contact', contact);
    formDataToSend.append('cnic', cnic);
    formDataToSend.append('role', role);
    formDataToSend.append('image', image);
    formDataToSend.append('password', password);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_emp`, formDataToSend);
      if (response) {
        // Handle success
        setsuccessAlert(true)
        setMsg('User added successfully!');
      } else {
        // Handle error
        console.error('Failed to add user:', response);
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log("Error:", "User Already Registered With This Credentails", error);
        setErrorAlert(true)
        setMsg(error.response.data.message);
      }
      else if (error.response.status === 402) {
        setErrorAlert(true)
        setMsg("Please Fill All The Feilds")
      } else {
        // console.log("Internal Server Error", error);
        setErrorAlert(true)
        setMsg("Internal Server Error")
      }
    }
  };

  useEffect(() => {
    getRoles();
    GetNewId()
  }, []);

  return (
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
      <ToastContainer />
      <div className='rounded-xl m-2 p-2 w-100 overflow-y-scroll' style={{backgroundColor:"#F0EFEF"}}>
        <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
        <div class="mask d-flex align-items-center">
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                <div class="bg-white shadow rounded-2xl">
                  <div class="card-body p-5">
                    <h2 class="text-uppercase font-bold text-2xl text-center mb-5">Register A New Employee </h2>
                    <form onSubmit={handleSubmit}>
                      {/* <label class="form-label" for="form3Example1cg">Employee Id</label>                                                    <div class="form-outline mb-4">
                        <input required name="emp_name" onChange={getUserdata} type="text" id="form3Example1cg" value={id} class="form-control form-control cursor-not-allowed" readOnly />
                      </div> */}

                      <label class="form-label" for="form3Example3cg">Employee Name</label>                                                    <div class="form-outline mb-4">
                        <input required name="emp_name" onChange={getUserdata} type="text" id="form3Example3cg" class="form-control form-control" />
                      </div>

                      <label class="form-label" for="form3Example4cg">Password</label>                                                    <div class="form-outline mb-4">
                        <input required name="password" onChange={getUserdata} type="password" id="form3Example4cg" class="form-control form-control" />
                      </div>

                      <label class="form-label" for="form3Example4cdg">Employee Login ID</label>                                                    <div class="form-outline mb-4">
                        <input required name="em_loginid" onChange={getUserdata} type="text" id="form3Example4cdg" class="form-control form-control" />
                      </div>
                      <label class="form-label" for="form3Example4cdg">Designation</label>                                                    <div class="form-outline mb-4">
                        <input required name="designation" onChange={getUserdata} type="text" id="form3Example4cdg" class="form-control form-control" />
                      </div>
                      <label class="form-label" for="form3Example4cdg">Contact </label>                                                    <div class="form-outline mb-4">
                        <input required name="contact" onChange={getUserdata} type="number" id="form3Example4cdg" class="form-control form-control" />
                      </div>
                      <label class="form-label" for="form3Example1cg">CNIC </label>                                                    <div class="form-outline mb-4">
                        <input required name="cnic" onChange={getUserdata} type="text" id="form3Example1cg" class=" form-control form-control" />
                      </div>
                      <label className="form-label" htmlFor="form3Example1cg">Roles</label>
                      <select name="role" onChange={getUserdata} id="form3Example1cg" className="form-control p-2">
                        {roles.map((roleGroup, index) => {
                          const roles = roleGroup.split(',').map(role => role.trim());

                          return roles.map((role, roleIndex) => (
                            <option key={`${index}-${roleIndex}`} value={role}>{role}</option>
                          ));
                        })}
                      </select>
                      <label class="form-label" for="form3Example1cg">Image </label>                                                    <div class="form-outline mb-4">
                        <input required name="image" onChange={handleFileChange} type="file" className='border w-100 p-2 rounded' />
                      </div>
                      <div class="d-flex justify-content-center">
                        <button
                          class=" w-100 btn-lg theme_btn_md p-3 " type="submit">Register</button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}
