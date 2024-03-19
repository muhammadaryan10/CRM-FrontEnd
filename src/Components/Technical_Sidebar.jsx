import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay, faUsers, faUser, faUserPlus, faWrench, faTruck, faPenToSquare, faBook, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Technical_Sidebar() {
  const [userName, setUserName] = useState("");
  const [designation, setDesignation] = useState("");
  const [image, setImage] = useState("")

  const navigate = useNavigate();
  const cookies = new Cookies();

  const Authentication =async()=>{
    const check = cookies.get('role');
    if (check === "Technical") { 

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
    const designation = cookies.get('designation');
    const image = cookies.get("image");
    setImage(image)
    console.log(`http://127.0.0.1:8000/${image}`)
    setDesignation(designation);
    setUserName(userNameFromCookie);
  }, []);

  return (
    <div>
      <div className="flex h-[100vh] sidebar-container flex-col justify-centere bg-black w-56  overflow-y-scroll">
        <div className="sticky inset-x-0 bottom-0">
          <Link to="#" className="flex flex-col items-center space-y-3 p-4">
            <img
              alt="Man"
              src={`http://127.0.0.1:8000/+${image}`}
              className="h-12 w-12 rounded-xl object-cover"
            />
            <div>
              <p className="text-sm font-medium text-white">
                <strong className="block text-lg ">{userName}</strong>

                <span> {designation}</span>
              </p>
            </div>
          </Link>
        </div>
        <div className="px-4 py-6">
          <ul className="mt-6 space-y-1">
            <li>
              <Link to="/tech" className="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700">
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/tech/allUser"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
              >
                <FontAwesomeIcon icon={faFolderClosed} /> All Users
              </Link>
            </li>
            <li>
              <Link
                to="/tech/addInventory"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
              >
               Inventory
              </Link>
            </li>
            <li>
              <Link
                to="/tech/complains"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
              >
                Complain
              </Link>
            </li>
            <li>
              <Link
                to="/tech/logs"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
              >
                Logs
              </Link>
            </li>
            <li>
              <Link
                to="/tech/DataLog"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
              >
                View  Data Log
              </Link>
            </li>
            <li>
              <Link
                to="/tech/form"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
              >
                Request Form
              </Link>
            </li>
            <li>
              <Link
                to="/tech/editUser"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
              >
                Edit User
              </Link>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500  hover:text-white"
                >
                  <span className="text-sm font-medium"><FontAwesomeIcon icon={faUser} />Reports</span>

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
                      to="/tech/devices"
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                    >
                      <FontAwesomeIcon icon={faUserPlus} />  Device Information
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/tech/inventory"
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                    >
                      <FontAwesomeIcon icon={faUsers} />Sim Inventroy 
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tech/removal"
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                    >
                      <FontAwesomeIcon icon={faUsers} /> Removal Information
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tech/removalTransfer"
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                    >
                      <FontAwesomeIcon icon={faUsers} /> Removal Transfer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tech/misi"
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                    >
                      <FontAwesomeIcon icon={faUsers} /> MISI Information
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tech/redo"
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500  hover:text-white"
                    >
                      <FontAwesomeIcon icon={faWrench} />Redo Information
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link
                to="/tech/updateProfile"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  hover:text-white"
              >
                Update Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
