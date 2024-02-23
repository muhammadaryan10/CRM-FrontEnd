import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function CRO_SIdebar() {
  const [userName, setUserName] = useState("");
  const [designation, setDesignation] = useState("");
  const [active_id, setActive_id] = useState("")

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
    if (active_id) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/logout",
          { active_id },
          { withCredentials: true } // Include credentials (cookies)
        );
        if (response.status === 200) {
          const cookieNames = ['name', 'designation', 'active_id',"session_token","image","em_loginid","role","emp_id",]; // Replace with your actual cookie names
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
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
            <div className="text-end">
              {/* <button type="button" className="mx-3" onClick={toggleScreen}><FontAwesomeIcon icon={faExpand} /></button> */}
              <button type="button" className=" text-white" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
