import axios from 'axios';
import React, { useState } from 'react'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function UpdateProfile({ data }) {

    const [updateEmp, setUpdateEmp] = useState({
        old_login_id: "",
        old_password: "",
        new_password: ""
    })
    const [ConfrimPassword, setConfrimPassword] = useState("")

    let name, value
    const getUserdata = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUpdateEmp({
            ...updateEmp,
            new_password: e.target.value,
            old_login_id: data && data.em_loginid,
            old_password: data && data.password,
        })
        console.log(updateEmp)
    }

    const SendData = async (e, empId) => {
        console.log(updateEmp)
        if (updateEmp.new_password === ConfrimPassword) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/edit_emp`,
                    updateEmp,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                setMsg("Password Updated SuccesFully")
                setSuccessAlert(true)
                console.log(res)
                console.log("data>>", res.data);
                setUpdateEmp(res.data);
            } catch (error) {
                if (error.response.status === 400) {
                    console.log(error)
                   setMsg("Please Fill All The Feild")
                   setErrorAlert(true)
                    return
                }
                //   console.error("Error fetching data:", error);
               setMsg("Internal Server Error  Please Try Again Later")
               setErrorAlert(true)
            }
        }
        else {
           setMsg("Plase Enter Same Password")
           setErrorAlert(true)
        }
    }

    const [errorAlert, setErrorAlert] = useState(false);
    const [msg, setMsg] = useState("");
    const [successAlert, setSuccessAlert] = useState(false)
  
    const hideAlerts = () => {
      setSuccessAlert(false)
      setErrorAlert(false);
    };
    return (
        <div>
              {successAlert && (
        <div className="overlay">
          <div className="popup">
            <div className="alert alert-success" role="alert">
              <div className="flex justify-end">
                <button onClick={hideAlerts}><FontAwesomeIcon className='h-8' icon={faCircleXmark} /></button>
              </div>
              <h1 className="font-bold fs-4 my-2">Succes</h1>
              {msg}
            </div>
          </div>
        </div>
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
            <div class="container-xl px-4 mt-4">
                <div class="row">
                    <div class="col-xl-4">
                        <div class="card mb-4 mb-xl-0 " style={{ height: "95%" }}>
                            <div class="card-header">Profile Picture</div>
                            <div class="flex flex-col jutify-center card-body text-center">
                                <img class=" rounded-circle mb-4" style={{ width: "150px" }} src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                <input type="file" class="" />
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8">
                        <div class="card mb-4">
                            <div class="card-header">Account Details</div>
                            <div class="card-body">
                                <form>
                                    <div class="mb-3">
                                        <label class="small mb-1" for="inputUsername">Login Id </label>
                                        <input value={data && data.em_loginid} class="form-control cursor-not-allowed" id="inputUsername" type="text" placeholder="Enter your username" readOnly />
                                    </div>
                                    <div class="mb-3">
                                        <label class="small mb-1" for="inputUsername">Name </label>
                                        <input value={data && data.emp_name} class="form-control cursor-not-allowed" id="inputUsername" type="text" placeholder="Enter your username" readOnly />
                                    </div>
                                    <div class="mb-3">
                                        <label class="small mb-1" for="inputUsername">Phone </label>
                                        <input value={data && data.contact} class="form-control cursor-not-allowed" id="inputUsername" type="text" placeholder="Enter your username" readOnly />
                                    </div>
                                    <div class="mb-3">
                                        <label class="small mb-1" for="inputUsername">Password </label>
                                        <input value={data && data.password} class="form-control cursor-not-allowed" id="inputUsername" type="text" placeholder="Enter your username" readOnly />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="card mb-4">
                            <div class="card-header">Create New Password</div>
                            <div class="card-body">
                                <form>
                                    <div class="mb-3">
                                        <label class="small mb-1" for="new_password">New Password </label>
                                        <input class="form-control" name='new_password' id="new_password" type="text" onChange={getUserdata} placeholder="Password" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="small mb-1" for="inputUsername">Confrim New Password </label>
                                        <input class="form-control" id="inputUsername" onChange={(e) => setConfrimPassword(e.target.value)} type="text" placeholder="Confriom Password" />
                                    </div>
                                    <button class="theme_btn_md" type="button" onClick={SendData}>Save changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
