import React, { useEffect, useState } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DataLogSuperAdmin({ data , onFetchDataSuccess }) {
  const [createLog, setCreateLog] = useState({
    client_id: "",
    customer_name: "",
    nature: "",
    reg_no: "",
    representative: "",
    contact_no: "",
    contact_person: "",
    remarks: "",
    em_loginid: ""
  });
  const [empName, setEmpName] = useState("")
  const [loginId, setLoginId] = useState("")
  const cookies = new Cookies();
  const [errorAlert, setErrorAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [successAlert,setSuccessAlert]=useState(false)
  const hideAlerts = () => {
      setSuccessAlert(false)
      setErrorAlert(false);
  };

  let name, value
  const getUserData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setCreateLog({ ...createLog, [name]: value });
    console.log(createLog);
  };

  const CreateNewDataLog = async () => {

    const { nature, customer_name, reg_no, remarks, representative, contact_no, contact_person, em_loginid } = createLog
    if (nature, customer_name, reg_no, remarks, representative, contact_no, contact_person, em_loginid) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/create_datalogs`,
          createLog,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        console.log(response); // use response.data to get the server response

        if (response.status === 200) {
          // console.log("Request successful");
          setMsg('Data Added  Successfully')
          setSuccessAlert(true)
          onFetchDataSuccess()
        }  else {
          setMsg("Please Try Again Later")
          setErrorAlert(true)
          // console.log("Please Try Again Later.");
        }
      } catch (error) {
        if (error.response.status === 400) {
          // console.log("Error:", "User Already Registered With This Credentails", error);
          setMsg(error.response.data.message);
          setErrorAlert(true)
        }
        else if (error.response.status === 402) {
          setMsg("Please Fill All The Feilds")
          setErrorAlert(true)
        } else {
          // console.log("Internal Server Error", error);
          setMsg("Internal Server Error")
          setErrorAlert(true)
        }
      }
    } else {
      setMsg("Plesae Fill All the feilds")
      setErrorAlert(true)
    }
  }

  


  useEffect(() => {
    const loginID = cookies.get('em_loginid');
    const emp_name = cookies.get('name');
    setEmpName(emp_name)
    setLoginId(loginID)
    console.log(data && data.data.user.registeration_no)
    setCreateLog({
      ...createLog,
      client_id: data && data && data.data.user.id,
      customer_name: data && data.data.user.customer_name,
      reg_no: data && data.data.user.registeration_no,
      // em_loginid: loginID,
      representative: empName
    });
  }, [data]);

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
      <div className='flex h-100'>
        <div className='bg-gray-200 rounded-xl m-2 p-2 mt-0 pt-0  w-100 '>
          <div className='m-2 p-2 bg-white mt-0'>
            <h1 className='text-xl font-semibold bg-gray-200 p-2 m-2'>Enter Data Log</h1>
            <div className='flex grid lg:grid-cols-2 md:grid-cols-1'>
              <div className=' flex flex-col justify-center'>
                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Nature of Alert</p><select className='input-field  ml-4 p-1  border bg-white' onChange={getUserData} name='nature' style={{ width: "55%" }} aria-label=".form-select-lg example">
                  <option value="Pre Info">Pre Info</option>
                  <option value="National Highway">National Highway</option>
                  <option value="No Go Area">No Go Area</option>
                  <option value="Battery Alert">Battery Alert</option>
                  <option value="Wrong Location">Wrong Location</option>
                  <option value="Gamer Alert">Gamer Alert</option>
                  <option value="Karachi Exit">Karachi Exit</option>
                </select>
                </div>
                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Customer Name</p><input className='bg-gray-200  ml-4 p-1 ' style={{ width: "55%" }} value={data && data.data.user.customer_name || " "} name='customer_name' readOnly /> </div>
                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Contact Number</p><input className='no-spinners bg-gray-200  ml-4 p-1 ' type='number' style={{ width: "55%" }} onChange={getUserData} name='contact_no' /> </div>
                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Contact Person</p><input className='bg-gray-200  ml-4 p-1 ' style={{ width: "55%" }} onChange={getUserData} name='contact_person' /> </div>
                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Registration Number</p><input className='bg-gray-200  ml-4 p-1 ' style={{ width: "55%" }} value={data && data.data.user.registeration_no || " "} name='' readOnly /> </div>
              </div >
              <div className='flex justify-around ' >
                <p>Remarks :</p>
                <textarea className='boder bg-gray-200' onChange={getUserData} name='remarks'></textarea>
              </div>
            </div>
            <div className='bg-gray-200 flex justify-end p-2 mx-2'>
              <button className='theme_btn_md rounded-0' onClick={CreateNewDataLog}>Submit</button>
            </div>
          </div>

          <div className='bg-white m-2 mt-4'>
            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Vehicle Information</h1>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-x-auto m-2 mb-4">
                    <table className="min-w-full">
                      <thead className="bg-gray-300 border">
                        <tr>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Registration #
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Chassis #
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Engine #
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Make / Model
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Color
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Year
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Transmission
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Mobilizer
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border">
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">{data && data.data.user.registeration_no || " "}</td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.user.chasis_no || " "}
                          </td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.user.engine_no || " "}
                          </td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.user.make || " "}  / {data && data.data.user.model || ""}
                          </td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">{data && data.data.user.color || " "}</td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.user.year || " "}
                          </td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.user.transmission || " "}
                          </td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.technical.mobilizer || " "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Logs  */}
          <div className='m-2 bg-white mt-4'>
            <h1 className='text-xl font-semibold bg-black text-white p-2 '> Data Log</h1>
            <div className="overflow-x-auto ">
            <table className="min-w-full">
              <thead className="bg-gray-300 border">
                <tr>
                  <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                    Alert
                  </th>
                  <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                    Registration #
                  </th>
                  <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                    Customer Name
                  </th>
                  <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                    Contact Person
                  </th>
                  <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                    Date
                  </th>
                  <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                    Time
                  </th>
                  <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                    Remarks
                  </th>
                  <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                    Contact
                  </th>
                  <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                    Representative
                  </th>
                </tr>
              </thead>
              <tbody className=''>
                {data && data.datalogs.map((log, index) => (
                  index < 5 && (
                  <tr key={index} className="bg-white border">
                    <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">{log.nature || " "}</td>
                    <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                      {log.reg_no || " "}
                    </td>
                    <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                      {log.customer_name || " "}
                    </td>
                    <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                      {log.contact_person || ""}
                    </td>
                    <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">{log.date || " "}</td>
                    <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">{log.time || " "}</td>
                    <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                      {log.remarks || " "}
                    </td>
                    <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                      {log.contact_no || " "}
                    </td>
                    <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                      {log.representative || " "}
                    </td>
                  </tr>
                  )
                ))}
              </tbody>
              
            </table>
            <div className="flex justify-end" style={{width:"100%"}}>
                <Link to={`/dataLog/${data && data.data.user.registeration_no}`} target='blank' className="p-1 mx-3 underline">View More >></Link>
                </div>
                </div>
          </div>

          {/* INformation  */}
          <div className='m-2 bg-white mt-4'>
            <h1 className='text-xl font-semibold bg-black text-white p-2'>Cleint Information</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-2'>
              <div>
                <h1 className='bg-gray-200 p-2 text-sm font-bold my-2 mr-4 underline '> Primary User Information</h1>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Customer Name:</p>
                  <p className='text-sm  w-60 '>{data && data.data.user.customer_name || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Father Name:</p>
                  <p className='text-sm  w-60'>{data && data.data.user.father_name || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Address </p>
                  <p className='text-sm  w-60'>{data && data.data.user.address || " "}</p>
                </div>
              </div>
              <div>
                <h1 className='bg-gray-200 p-2 text-sm font-bold my-2 mr-4 underline '> Contact Information</h1>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Contact 1</p>
                  <p className='text-sm  w-60'>{data && data.data.user.mobileno_1 || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Contact 2</p>
                  <p className='text-sm  w-60'>{data && data.data.user.mobileno_2 || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Contact 3</p>
                  <p className='text-sm  w-60'>{data && data.data.user.mobileno_3 || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>CNIC</p>
                  <p className='text-sm  w-60'>{data && data.data.user.cnic || " "}</p>
                </div>
              </div>
              <div>
                <h1 className='bg-gray-200 text-sm font-bold my-2 mr-2 p-2 underline'>Security  Information</h1>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Customer Email:</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.security || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Password </p>
                  <p className='text-sm  w-60'>{data && data.data.security.password || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Emergency Password: </p>
                  <p className='text-sm  w-60'>{data && data.data.security.emergency_pass || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Emergency Person :</p>
                  <p className='text-sm  w-60'>{data && data.data.security.emergency_person || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Security Question:</p>
                  <p className='text-sm  w-60'>{data && data.data.security.security_ques || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Security Answer:</p>
                  <p className='text-sm  w-60'>{data && data.data.security.security_ans || " "}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-x-3 m-2 mt-2'>
            {/* Vehicle Information  */}
            <div className='bg-white mt-3 border border-gray-600'>
              <h1 className='text-xl font-semibold bg-black text-white p-2 '>Vehicle Information</h1>
              <div className='p-2'>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Registration # :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.registeration_no || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Engine #:</p>
                  <p className='text-sm  w-60'>{data && data.data.user.engine_no || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Chassis #:</p>
                  <p className='text-sm  w-60'>{data && data.data.user.chasis_no || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Make :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.make || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Model :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.model || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Year :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.year || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Color :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.color || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Mobilizer :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.mobilizer || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Transmission :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.transmission || " "}</p>
                </div>
              </div>
            </div>
            {/* Technical Information  */}
            <div className='bg-white mt-3 border border-gray-600'>
              <h1 className='text-xl font-semibold bg-black text-white p-2 '>Technical Information</h1>
              <div className='p-2'>

                <div className='flex'>
                  <p className='text-sm font-bold w-40'>IMEI #:</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.IMEI_no || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>GSM #:</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.Gsm_no || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Device ID:</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.device_id || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Sim Activation:</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.sim || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>GPS Activation :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.Gps_check || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Tavl. Management Id :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.Tavl_mang_id || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Operational Status :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.operational_status || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Webtrack Id :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.webtrack_id || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Webtrack Password :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.webtrack_pass || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>SMS Alert :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.hh || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Speed Alert :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.overspeed_alerts || " "}</p>
                </div>
              </div>
            </div>
            {/* Other Information   */}
            <div className='bg-white mt-3 border border-gray-600'>
              <h1 className='text-xl font-semibold bg-black text-white p-2 '>Other Information  </h1>
              <div className='p-2'>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Compaign Point allocation :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.campaign_point || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Dealer Name :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.dealer_name || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Sales Person :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.sales_person || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Contact Person :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.conatct_person || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Remarks :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.remarks || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Tracker Charges :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.tracker_charges || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Internal Commission :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.int_comission || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>External Commission :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.ext_comission || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Discount :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.discount || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Tracker Status :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.tracker_status || " "}</p>
                </div>
              </div>
            </div>
            {/* Payment Details  */}
            <div className='bg-white mt-3 border border-gray-600'>
              <h1 className='text-xl font-semibold bg-black text-white p-2 '>Payment Details</h1>
              <div className='p-2 flex'>
                <div className='' style={{ width: "50%" }}>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Segment :</p>
                    <p className='text-sm ml w-40'>{data && data.data.user.segment || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Demo Duration :</p>
                    <p className='text-sm w-40'>{data && data.data.user.demo_duration || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Insurance Partner :</p>
                    <p className='text-sm w-40'>{data && data.data.user.insurance_partner || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Dealership :</p>
                    <p className='text-sm w-40'>{data && data.data.user.dealership || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Install Location :</p>
                    <p className='text-sm  w-40'>{data && data.data.user.date_of_installation || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Sales Person :</p>
                    <p className='text-sm  w-40'>{data && data.data.user.sales_person || " "}</p>
                  </div>
                </div>
                <div className='' style={{ width: "50%" }}>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Bank Name :</p>
                    <p className='text-sm ml w-60'>{data && data.data.technical.date_of_installation || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Dealer Name :</p>
                    <p className='text-sm w-60'>{data && data.data.user.dealer_name || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Technecian :</p>
                    <p className='text-sm w-60'>{data && data.data.technical.technician_name || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Contact Person:</p>
                    <p className='text-sm w-60'>{data && data.data.user.conatct_person || " "}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Vehicle Status */}
            <div className='bg-white mt-3 border border-gray-600'>
              <h1 className='text-xl font-semibold bg-black text-white p-2 '>Vehicle Status</h1>
              <div className='p-2'>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Customer Briefing :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.form_status || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Technical Briefing :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.technical_status || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Security Briefing :</p>
                  <p className='text-sm  w-60'>{data && data.data.security.security_status || " "}</p>
                </div>
              </div>
            </div>
            {/* Value Addition Services */}
            <div className='bg-white mt-3 border border-gray-600'>
              <h1 className='text-xl font-semibold bg-black text-white p-2 '>Value Addition Services</h1>
              <div className='p-2 flex'>
                <div className='w-50'>
                  <div className='w-60'>
                    <div className='w-60'>
                      {data && data.vas && data.vas.map((option, index) => (
                        <div className='flex' key={index}>
                          <p className='text-sm font-bold w-60'>{option}:</p>
                          <p className='text-sm ml w-40'>{"YES" || " "}</p>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
                <div className='w-50'>
                  {data && data.vas && data.vas.map((option, index) => (
                    <div className='flex' key={index}>
                      <p className='text-sm font-bold w-40'>Time :</p>
                      <p className='text-sm  w-60'>  {new Date(data.data.user.created_at).toLocaleString("en-US", {
                        timeZone: "Asia/Karachi",
                      }) || " "}</p>
                    </div>
                  ))}

                </div>
              </div>
            </div>
            {/* Special Instruction  */}
            <div className='bg-white mt-3 border border-gray-600'>
              <h1 className='text-xl font-semibold bg-black text-white p-2 '>Specail Instruction</h1>
              <div className='p-4'>
                <p className='text-sm font-bold '>Instruction :</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
