import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay, faUsers, faUser, faUserPlus, faWrench, faTruck, faPenToSquare, faBook, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const cookies = new Cookies();

export default function CS_Sidebar() {
  const [ userName , setUserName ] = useState("");
  const [designation,setDesignation]=useState("");
  const [active_id, setActive_id] = useState("")

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const userNameFromCookie = cookies.get('name');
    const designation=cookies.get('designation');
    const active_id = cookies.get('active_id');
    setDesignation(designation);
    setActive_id(active_id)
    setUserName(userNameFromCookie);
}, []);

const logout = async (e) => {
  console.log(active_id)
  e.preventDefault();

  let data;
  if (active_id) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout",
        { active_id },
        { withCredentials: true } // Include credentials (cookies)
      );
      if (response.status === 200) {
        const cookieNames = ['name', 'designation', 'active_id', "session_token", "image", "em_loginid", "role", "emp_id",]; // Replace with your actual cookie names
        for (const cookieName of cookieNames) {
          cookies.remove(cookieName);
        }
        toast.success("Logged out SuccesFullly")
        // console.log(response)
        navigate("/");
      }
    }
    catch (error) {
      if (error.response.status === 402) {
        toast.error("Validation Error")
        // console.log(error)
      }
      else if (error.response.status === 460) {
        toast.error("Already Log out")
        // console.log(error)
      }
    }
  }
  else {
    alert("Please Login First")
  }
}
    return (
        <div>
          <ToastContainer/>
            <div className="flex h-[100vh] sidebar-container flex-col justify-centere bg-black w-64 overflow-y-scroll">
                <div className="sticky inset-x-0 bottom-0">
                    <Link to="#" className="flex flex-col items-center space-y-3 p-4">
                        <img
                            alt="Man"
                            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            className="h-12 w-12 rounded-xl object-cover"
                        />
                        <div>
                            <p className="text-sm font-medium text-white">
                                <strong className="block text-lg ">{userName}</strong>

                                <span>{designation}</span>
                            </p>
                        </div>
                    </Link>
                </div>
                <div className="px-4 py-6">
                    <ul className="mt-6 space-y-1">
                        <li>
                            <Link to="/cs" className="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700">
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/cs/allUser"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                            >
                                <FontAwesomeIcon icon={faFolderClosed} /> All Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/cs/addUser"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                            >
                                Add User
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/cs/logs"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                            >
                              Add Complain
                            </Link>
                        </li>
                        <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500  hover:text-white"
                  >
                    <span className="text-sm font-medium"><FontAwesomeIcon icon={faUser} /> Forms </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to="/cs/serviceForm"
                        className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                      >
                      <FontAwesomeIcon icon={faUserPlus} />  service Order Form 
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/cs/installForm"
                        className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                      >
                       <FontAwesomeIcon icon={faUsers} /> Intallation Form 
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cs/NRForm"
                        className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                      >
                       <FontAwesomeIcon icon={faWrench} /> N/R No Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cs/RedoForm"
                        className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                      >
                       <FontAwesomeIcon icon={faWrench} /> N/R Redo Required
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
                        <li>
                            <Link
                                to="/cs/request"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                            >
                               Request Form
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/cs/complains"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                            >
                               Complains
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/cs/updateProfile"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                            >
                                Update Profile
                            </Link>
                        </li>
                    </ul>
                </div>
                <button type="button" className=" text-white" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}
