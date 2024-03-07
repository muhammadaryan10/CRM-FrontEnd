import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faExpand, faPowerOff, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function CRO_SIdebar() {
  const [userName, setUserName] = useState("");
  const [designation, setDesignation] = useState("");
  const [active_id, setActive_id] = useState("")
  const [popup, setPopup] = useState(false)
  
  const cookies = new Cookies();
  useEffect(() => {
    const userNameFromCookie = cookies.get('name');
    const active_id = cookies.get('active_id');
    const designation = cookies.get('designation');
    setDesignation(designation);
    setUserName(userNameFromCookie);
    setActive_id(active_id)
  }, []);
  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();

    let data;
      try {
        // const response = await axios.post(
        //   "http://127.0.0.1:8000/api/logout",
        //   { active_id },
        //   { withCredentials: true } // Include credentials (cookies)
        // );
        // if (response.status === 200) {
          const cookieNames = ['name', 'designation', 'active_id',"session_token","image","em_loginid","role","emp_id",]; // Replace with your actual cookie names
          for (const cookieName of cookieNames) {
            cookies.remove(cookieName);
          }
          toast.success("Logged out SuccesFullly")
          navigate("/");
        }
      catch (error) {
        // if (error.response.status === 402) {
        //   toast.error("Validation Error")
        //   // console.log(error)
        // }
        // else if (error.response.status === 460) {
        //   toast.error("Already Log out")
        //   // console.log(error)
        // }
        // else{
          console.log(error)
        // }
      }

  }

  const hideAlerts = () => {
    setPopup(false);
  }
  // const toggleScreen = () => {
  //   const element = document.getElementById("root")
  //   const isFullScreen = document.fullscreenElement;
  //   if (!isFullScreen) {
  //     element.requestFullscreen()
  //   }
  //   else {
  //     element.exitFullscreen()
  //   }
  // };
  return (
    <div>
      <ToastContainer/>
      {popup && (
        <div className="overlay">
          <div className="popup w-100">
            <div className="alert bg-black" role="alert">
              <div className="flex justify-end">
                <button onClick={hideAlerts}><FontAwesomeIcon className='h-8 text-white' icon={faCircleXmark} /></button>
              </div>
              <div className='flex'>
                <FontAwesomeIcon icon={faRightFromBracket} className='h-12 text-white' /> <h1 className="font-bold fs-4 m-2 text-white">Log Out ?</h1>
              </div>
              <div className='space-y-2 mt-3 text-white'>
                <p>Are you sure you want to log out?</p>
                <p>Press No if youwant to continue work. Press Yes to logout current user.</p>
              </div>
              <div className="flex justify-end space-x-2">
                <button className='bg-green-400 text-black p-2' onClick={logout}>YES</button>
                <button className='bg-white text-black p-2' onClick={hideAlerts}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
            <div className="text-end">
              {/* <button type="button" className="mx-3" onClick={toggleScreen}><FontAwesomeIcon icon={faExpand} /></button> */}
              <button type="button" className="p-0 h-8 w-8" onClick={(e) =>setPopup(!popup)}><FontAwesomeIcon icon={faPowerOff} /></button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
