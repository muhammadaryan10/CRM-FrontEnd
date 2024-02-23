import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay, faUsers, faUser, faUserPlus, faWrench, faTruck, faPenToSquare, faBook, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function SuperVisorSidebar() {
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
                            <Link to="/sv" className="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700">
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/sv/allUser"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                            >
                                <FontAwesomeIcon icon={faFolderClosed} /> All Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/sv/logs"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                            >
                              Logs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/sv/DataLog"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                            >
                               Data Log
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/sv/renewal"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                            >
                               Renewal
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/sv/updateProfile"
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
