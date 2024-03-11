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

export default function LogCro({ data, onFetchDataSuccess }) {
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
    const [successAlert, setSuccessAlert] = useState(false)
    const [formKey, setFormKey] = useState(0); // Key for form element

    const hideAlerts = () => {
        setSuccessAlert(false)
        setErrorAlert(false);
    };

    let name, value
    const getUserData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setCreateLog({
            ...createLog,
            representative: empName,
            [name]: value
        });
        console.log(createLog);
    };

    const handleChange = (event) => {
        let name = event.target.name
        let input = event.target.value.replace(/\D/g, '');
        // Remove non-numeric characters
        if (input.length > 4) {
          input = input.slice(0, 4) + '-' + input.slice(4); // Add hyphen after the first four characters
        }
          // Ensure mobile number doesn't exceed 11 characters
          if (input.length > 12) {
            return; // Don't update state if mobile number exceeds 11 characters
          }
          setCreateLog({
          ...createLog,
          [name]: input
        }
        );
      };
    

    const CreateNewDataLog = async (e) => {
        e.preventDefault();
        const { nature, customer_name, reg_no, remarks, representative, contact_no, contact_person, em_loginid } = createLog
        if (nature, customer_name, reg_no, remarks, representative, contact_no, contact_person) {
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
                    setFormKey((prevKey) => prevKey + 1);
                    // console.log("Request successful");
                    // setCreateLog({
                    //   ...createLog,
                    //   contact_person: "",
                    //   contact_no: "",
                    //   representative: empName,
                    //   remarks: ""
                    // })
                    onFetchDataSuccess()
                    setMsg('Data Added  Successfully')
                    setSuccessAlert(true)
                } else {
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
                    <form key={formKey} onSubmit={CreateNewDataLog} className='m-2 p-2 bg-white mt-0'>
                        <h1 className='text-xl font-semibold bg-gray-200 p-2 m-2'>Enter Data Log</h1>
                        <div className='flex grid lg:grid-cols-2 md:grid-cols-1'>
                            <div className=' flex flex-col justify-center'>
                                <div className='flex justify-center my-2'>
                                    <p className='text-end md:text-start' style={{ width: "40%" }}>Nature of Alert</p>
                                    <input
                                        list="natureOptions"
                                        className='input-field ml-4 p-1 border bg-white'
                                        required
                                        onChange={getUserData}
                                        name='nature'
                                        style={{ width: "55%" }}
                                        aria-label=".form-select-lg example"
                                        value={createLog.nature}
                                    />

                                    <datalist id="natureOptions">
                                        <option value="Pre Info" />
                                        <option value="National Highway" />
                                        <option value="No Go Area" />
                                        <option value="Battery Alert" />
                                        <option value="Jammer Alert" />
                                        <option value="Karachi Exit" />
                                    </datalist>

                                </div>
                                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Customer Name</p><input className='bg-gray-200  ml-4 p-1 ' style={{ width: "55%" }} required value={data && data.data.user.customer_name || " "} name='customer_name' readOnly /> </div>
                                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Contact Number</p><input className='no-spinners bg-gray-200  ml-4 p-1 ' type='text' required style={{ width: "55%" }} value={createLog.contact_no} onChange={handleChange} name='contact_no' /> </div>
                                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Contact Person</p><input className='bg-gray-200  ml-4 p-1 ' style={{ width: "55%" }} required onChange={getUserData} name='contact_person' /> </div>
                                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Registration Number</p><input className='bg-gray-200  ml-4 p-1 ' style={{ width: "55%" }} required value={data && data.data.user.registeration_no || " "} name='' readOnly /> </div>
                            </div >
                            <div className='flex flex-col justify-center' >
                                <div className='flex justify-center m-2 space-x-4'>
                                    <p>Remarks:</p>
                                    <textarea className='boder bg-gray-200 w-100' onChange={getUserData} name='remarks'></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-200 flex justify-end p-2 mx-2'>
                            <button className='theme_btn_md rounded-0' type='submit'>Submit</button>
                        </div>
                    </form>

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
                            <div className="flex justify-end" style={{ width: "100%" }}>
                                <Link to={`/dataLog/${data && data.data.user.registeration_no}`} target='blank' className="p-1 mx-3 underline">View More >></Link>
                            </div>
                        </div>
                    </div>

                    {/* INformation  */}
                    <div className='m-2 bg-white mt-4'>
                        <h1 className='text-xl font-semibold bg-black text-white p-2'>Client Information</h1>
                        <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 p-2 space-y-4 '>
                            <div>
                                <h1 className='bg-gray-200 p-2 text-sm font-bold my-2 mr-4 underline'> Primary User Information</h1>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Customer Name:</p>
                                    <p className='text-sm  w-60 '>{data && data.data.user.customer_name || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Father Name:</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.father_name || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>CNIC</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.cnic || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Address </p>
                                    <p className='text-sm  w-60'>{data && data.data.user.address || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Contact 1</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.mobileno_1 || "N/A"}</p>
                                </div>
                                {data && data.data.user.mobileno_2 && data.data.user.mobileno_2 !== null ? (
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Contact 2</p>
                                        <p className='text-sm  w-60'>{data && data.data.user.mobileno_2 || "N/A"}</p>
                                    </div>
                                ) : (<></>)}
                                {data && data.data.user.mobileno_3 && data.data.user.mobileno_3 !== null ? (
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Contact 3</p>
                                        <p className='text-sm  w-60'>{data && data.data.user.mobileno_3 || "N/A"}</p>
                                    </div>
                                ) : (<></>)}

                            </div>
                            <div>
                                <h1 className='bg-gray-200 p-2 text-sm font-bold  mr-4 underline'> Secondary User Information</h1>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'> Name:</p>
                                    <p className='text-sm  w-60 '>{data && data.data.user.seconadryuser_name || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Contact:</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.secondaryuser_con1 || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>RelationShip :</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.relationship || "N/A"}</p>
                                </div>
                                {/* <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Address </p>
                                    <p className='text-sm  w-60'>{data && data.data.user.address || "N/A"}</p>
                                </div> */}
                            </div>
                            {/* <div>
                                <h1 className='bg-gray-200 p-2 text-sm font-bold my-2 mr-4 underline'> Contact Information</h1>
                              
                            </div> */}
                            <div>
                                <h1 className='bg-gray-200 text-sm font-bold my-2 mr-2 p-2 underline'>Security  Information</h1>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Customer Email:</p>
                                    <p className='text-sm  w-60'>{data && data.data.security.customer_email || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Password </p>
                                    <p className='text-sm  w-60'>{data && data.data.security.password || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Emergency Password: </p>
                                    <p className='text-sm  w-60'>{data && data.data.security.emergency_pass || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Emergency Person :</p>
                                    <p className='text-sm  w-60'>{data && data.data.security.emergency_person || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Emergency Person Contact:</p>
                                    <p className='text-sm  w-60'>{data && data.data.security.emergency_person_contact || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Security Question:</p>
                                    <p className='text-sm  w-60'>{data && data.data.security.security_ques || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Security Answer:</p>
                                    <p className='text-sm  w-60'>{data && data.data.security.security_ans || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-x-3 m-2 mt-2'>
                        {/* Vehicle Information  */}
                        {/* <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Vehicle Information</h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Registration # :</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.registeration_no || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Engine #:</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.engine_no || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Chassis #:</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.chasis_no || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Make :</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.make || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Model :</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.model || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Year :</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.year || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Color :</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.color || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Mobilizer :</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.mobilizer || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Transmission :</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.transmission || "N/A"}</p>
                                </div>
                            </div>
                        </div> */}
                        {/* Organiztion Detail */}
                        {/* <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Oragnization Detail</h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Organization Name :</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.hh || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Customer Designation :</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.hh || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>NTN #</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.ntn || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Sale Tax Reg. # </p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.hh || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Fax # </p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.hh || "N/A"}</p>
                                </div>
                            </div>
                        </div> */}
                        {/* Technical Information  */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Technical Information</h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Vendor :</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.vendor_name || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>IMEI #:</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.IMEI_no || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Device ID:</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.device_id || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Sim No:</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.sim || "N/A"}</p>
                                </div>
                                {data && data.data.technical.device_id_1 && data.data.technical.device_id_1 !== null ? (
                                    <>
                                        <div className='flex'>
                                            <p className='text-sm font-bold w-40'>Secondery Device Vendor :</p>
                                            <p className='text-sm  w-60'>{data && data.data.technical.vendor_name_1 || "N/A"}</p>
                                        </div>
                                        <div className='flex'>
                                            <p className='text-sm font-bold w-40'>Secondery Device ID:</p>
                                            <p className='text-sm  w-60'>{data && data.data.technical.device_id_1 || "N/A"}</p>
                                        </div>
                                        <div className='flex'>
                                            <p className='text-sm font-bold w-40'>Secendory Sim #:</p>
                                            <p className='text-sm  w-60'>{data && data.data.technical.sim_1 || "N/A"}</p>
                                        </div>
                                        <div className='flex'>
                                            <p className='text-sm font-bold w-40'>Secondery Device IMEI #:</p>
                                            <p className='text-sm  w-60'>{data && data.data.technical.IMEI_no_1 || "N/A"}</p>
                                        </div>
                                    </>
                                ) : (<></>)
                                }
                                {/* <div className='flex'>
                                    <p className='text-sm font-bold w-40'>GPS Activation :</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.Gps_check || "N/A"}</p>
                                </div> */}
                                {/* <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Tavl. Management Id :</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.Tavl_mang_id || "N/A"}</p>
                                </div> */}
                                {/* <div className='flex'>
                  <p className='text-sm font-bold w-40'>Operational Status :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.operational_status || "N/A"}</p>
                </div> */}
                                {/* {data && data.data.technical.webtrack_id && data.data.technical.webtrack_pass && data.data.technical.webtrack_id !== null ? (
                                    <>
                                        <div className='flex'>
                                            <p className='text-sm font-bold w-40'>Webtrack Id :</p>
                                            <p className='text-sm  w-60'>{data && data.data.technical.webtrack_id || "N/A"}</p>
                                        </div>
                                        <div className='flex'>
                                            <p className='text-sm font-bold w-40'>Webtrack Password :</p>
                                            <p className='text-sm  w-60'>{data && data.data.technical.webtrack_pass || "N/A"}</p>
                                        </div>
                                    </>
                                ) : (<></>)
                                } */}
                                {/* <div className='flex'>
                  <p className='text-sm font-bold w-40'>SMS Alert :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.hh || "N/A"}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Speed Alert :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.overspeed_alerts || "N/A"}</p>
                </div> */}
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Technician Name:</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.technician_name || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Tracker Status :</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.tracker_status || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Sales Person :</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.sales_person || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                        {/* Other Information   */}
                        {/* <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Other Information  </h1>
                            <div className='p-2'> */}
                        {/* <div className='flex'>
                  <p className='text-sm font-bold w-40'>Compaign Point allocation :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.campaign_point || "N/A"}</p>
                </div> */}
                        {/* <div className='flex'>
                  <p className='text-sm font-bold w-40'>Dealer Name :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.dealer_name || "N/A"}</p>
                </div> */}

                        {/* <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Contact Person :</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.conatct_person || "N/A"}</p>
                                </div> */}
                        {/* <div className='flex'>
                  <p className='text-sm font-bold w-40'>Remarks :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.remarks || "N/A"}</p>
                </div> */}
                        {/* <div className='flex'>
                  <p className='text-sm font-bold w-40'>Tracker Charges :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.tracker_charges || "N/A"}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Internal Commission :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.int_comission || "N/A"}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>External Commission :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.ext_comission || "N/A"}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Discount :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.discount || "N/A"}</p>
                </div> */}
                        {/*                                 
                            </div>
                        </div> */}
                        {/* Payment Details  */}
                        {/* <div className='bg-white mt-3 border border-gray-600'>
              <h1 className='text-xl font-semibold bg-black text-white p-2 '>Payment Details</h1>
              <div className='p-2 flex'>
                <div className='' style={{ width: "50%" }}>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Segment :</p>
                    <p className='text-sm ml w-40'>{data && data.data.user.segment || "N/A"}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Demo Duration :</p>
                    <p className='text-sm w-40'>{data && data.data.user.demo_duration || "N/A"}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Insurance Partner :</p>
                    <p className='text-sm w-40'>{data && data.data.user.insurance_partner || "N/A"}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Dealership :</p>
                    <p className='text-sm w-40'>{data && data.data.user.dealership || "N/A"}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Install Location :</p>
                    <p className='text-sm  w-40'>{data && data.data.user.date_of_installation || "N/A"}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Sales Person :</p>
                    <p className='text-sm  w-40'>{data && data.data.user.sales_person || "N/A"}</p>
                  </div>
                </div>
                <div className='' style={{ width: "50%" }}>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Bank Name :</p>
                    <p className='text-sm ml w-60'>{data && data.data.technical.date_of_installation || "N/A"}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Dealer Name :</p>
                    <p className='text-sm w-60'>{data && data.data.user.dealer_name || "N/A"}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Technecian :</p>
                    <p className='text-sm w-60'>{data && data.data.technical.technician_name || "N/A"}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Contact Person:</p>
                    <p className='text-sm w-60'>{data && data.data.user.conatct_person || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div> */}
                        {/* Vehicle Status */}
                        {/* <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Vehicle Status</h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Customer Briefing :</p>
                                    <p className='text-sm  w-60'>{data && data.data.user.form_status || "Pending"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Technical Briefing :</p>
                                    <p className='text-sm  w-60'>{data && data.data.technical.technical_status || "Pending"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Security Briefing :</p>
                                    <p className='text-sm  w-60'>{data && data.data.security.security_status || "Pending"}</p>
                                </div>
                            </div>
                        </div> */}
                        {/* Value Addition Services */}
                        {/* <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Value Addition Services</h1>
                            <div className='p-2 flex'>
                                <div className='w-50'>
                                    <div className='w-60'>
                                        <div className='w-60'>
                                            {data && data.vas && data.vas.map((option, index) => (
                                                <div className='flex' key={index}>
                                                    <p className='text-sm font-bold w-60'>{option}:</p>
                                                    <p className='text-sm ml w-40'>{"YES" || "N/A"}</p>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </div>
                                <div className='w-50'>
                                    {data && data.vas && data.vas.map((option, index) => (
                                        <div className='flex' key={index}>
                                            <p className='text-sm font-bold w-40'>Time :</p>
                                            <p className='text-sm  w-60'>  {new Date(data.user.created_at).toLocaleString("en-US", {
                                                timeZone: "Asia/Karachi",
                                            }) || "N/A"}</p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div> */}
                        {/* Records Table  */}
                        {/* <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Record Remarks</h1>
                            <div class="overflow-x-auto ">
                                <div class="py-2 inline-block min-w-full ">
                                    <div class="overflow-x-auto ">
                                        <table class="min-w-full">
                                            <thead class="border border-black">
                                                <tr>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start border border-black">
                                                        Status
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start border border-black">
                                                        Remark
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start border border-black">
                                                        Created AT
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="bg-white border border-black">
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black"> JU-7025</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                                                        27684
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                                                        r-black5
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* Special Instruction  */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Special Instruction</h1>
                            <div className='p-4'>
                                <p className='text-sm font-bold mb-2'>Instruction :</p><span>{data && data.data.user.remarks || "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
