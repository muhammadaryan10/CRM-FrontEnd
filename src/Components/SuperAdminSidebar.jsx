import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay ,faUsers,faUser,faUserPlus,faWrench,faTruck,faPenToSquare,faBook,faFolderClosed,faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


export default function AdminSidebar() {
  const [ userName , setUserName ] = useState("");
  const [designation,setDesignation]=useState("");
  const [active_id, setActive_id] = useState("")

  const cookies = new Cookies();
  const navigate = useNavigate();

  const Authentication =async()=>{
    const check = cookies.get('role');
    if (check === "Head") { 

    }
    else if (!check) { 
      // alert("Please Login First")
      navigate("/")
    }
    else{
      // alert("You Are Not Autherize")
      navigate("/")
    }
  }

  useEffect(() => {
    Authentication()
    const userNameFromCookie = cookies.get('name');
    const designation=cookies.get('designation');
    const active_id = cookies.get('active_id');
    setDesignation(designation);
    setActive_id(active_id)
    setUserName(userNameFromCookie);
}, []);


  return (
    <div>
      <div>
      <ToastContainer/>
        <div className="flex h-[100vh] flex-col  sidebar-container bg-black w-60 overflow-y-scroll ">
          <div className="sticky inset-x-0 bottom-0">
            <Link  to="#" className="flex flex-col items-center space-y-3 p-4">
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
          <div className="px-2 py-6">
            <ul className="space-y-1 ">
              <li>
                <Link to="/superAdmin " className="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-500 hover:text-white">
                <FontAwesomeIcon icon={faDisplay}  /> Dashboard
                </Link>
              </li>

              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500  hover:text-white"
                  >
                    <span className="text-sm font-medium"><FontAwesomeIcon icon={faUser} /> Employees </span>

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
                        to="/superAdmin/addEmployee"
                        className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                      >
                      <FontAwesomeIcon icon={faUserPlus} />  Add Employee
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/superAdmin/allEmployees"
                        className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                      >
                       <FontAwesomeIcon icon={faUsers} /> All Employees
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/superAdmin/editEmployee"
                        className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                      >
                       <FontAwesomeIcon icon={faWrench} /> Update Employee
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <Link
                  to="/superAdmin/vehiclesInfo"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                >
                <FontAwesomeIcon icon={faTruck} />  Vecheil Status
                </Link>
              </li>
              <li>
                <Link
                  to="/superAdmin/logs"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                >
               <FontAwesomeIcon icon={faFolderClosed} /> Logs
                </Link>
              </li>
              <li>
                <Link
                  to="/superAdmin/attendence"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                >
                <FontAwesomeIcon icon={faBook} /> Attendence 
                </Link>
              </li>
              <li>
                <Link
                  to="/superAdmin/usersStatus"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                >
                <FontAwesomeIcon icon={faBook} /> Employees Status 
                </Link>
              </li>
              <li>
                <Link
                  to="/superAdmin/updateProfile"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
                >
                <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
