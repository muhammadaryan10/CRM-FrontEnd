import React, { useEffect, useMemo, useState } from 'react'
import SuperAdminSidebar from '../../Components/SuperAdminSidebar';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ComplainLogCro({ data, onFetchDataSuccess }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [additionalFields, setAdditionalFields] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [loginId, setLoginId] = useState("")
    const [empName, setEmpName] = useState("")
    const [complain, setComplain] = useState({
        nature_of_complain: "",
        client_id: "",
        customer_name: "",
        reg_no: "",
        Date: "",
        Time: "",
        remarks: "",
        representative: "",
        last_location: "",
        em_loginid: "",
    });
    const [formKey, setFormKey] = useState(0); // Key for form element
    const [errorAlert, setErrorAlert] = useState(false);
    const [msg, setMsg] = useState("");
    const [successAlert, setSuccessAlert] = useState(false)
    const hideAlerts = () => {
        setSuccessAlert(false)
        setErrorAlert(false);
    };



    let name, value
    const getUserData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setComplain({ ...complain, [name]: value });
        console.log(complain);
    };

    const cookies = new Cookies();
    const sendComplain = async (e) => {

        e.preventDefault();

        const { nature_of_complain, client_id, customer_name, reg_no, remarks, Date, Time, last_location } = complain
        if (nature_of_complain, client_id, customer_name, reg_no, remarks) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/createcomplain`,
                    complain,
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
                    setFormKey((prevKey) => prevKey + 1);
                    onFetchDataSuccess();    
                    setMsg(response.data.messsage)
                    setSuccessAlert(true)
                    // setComplain({
                    //     ...complain,
                    //     remarks:""
                    // })
                } else {
                    setErrorAlert(true)
                    setMsg("Please Try Again Later.");
                }
            } catch (error) {
                if (error.response.status === 400) {
                    // console.log("Error:", "User Already Registered With This Credentails", error);
                    setErrorAlert(true)
                    setMsg("Data Not Found");
                }
                else if (error.response.status === 402) {
                    setErrorAlert(true)
                    setMsg("Plesae Fill All the feilds")
                }
                else if (error.response.status === 401) {
                    setErrorAlert(true)
                    setMsg("The Complain With The same Nature is Already Registered Against this Registration Number")
                } else {
                    console.log("Internal Server Error", error);
                    setErrorAlert(true)
                    setMsg("Internal Server Error")
                }
            }
        } else {
            setErrorAlert(true)
            setMsg("Plesae Fill All the feilds")
        }
    }

    const getResolvedBy = (complain) => {
        if (complain.actions && complain.actions.length > 0) {
            return complain.actions[0].resolved_by;
        } else {
            return 'Not Resolved';
        }
    };

    const getResolvedByDate = (complain) => {
        if (complain.actions && complain.actions.length > 0) {
            return complain.actions[0].date;
        } else {
            return 'Not Resolved';
        }
    };

    const getResolvedByTime = (complain) => {
        if (complain.actions && complain.actions.length > 0) {
            return complain.actions[0].time;
        } else {
            return 'Not Resolved';
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'complain_id',
                header: 'Ticker',
                size: 80,
            },
            {
                accessorKey: 'customer_name', //access nested data with dot notation
                header: 'Customer Name',
                size: 100,
            },
            {
                accessorKey: 'reg_no',
                header: 'Registration #',
                size: 90,
            },
            {
                accessorKey: 'nature_of_complain',
                header: 'Complain',
                size: 100,
            },
            {
                accessorKey: 'date',
                header: 'Date',
                size: 80,
            },
            {
                accessorKey: 'time',
                header: 'Time',
                size: 80,
            },
            {
                accessorKey: 'remarks',
                header: 'Remarks',
                size: 250,
            },
            {
                accessorKey: 'emp_name',
                header: 'Represtative',
                size: 100,
            },
            // {
            //     accessorKey: 'resolved_by',
            //     header: 'Resolved By',
            //     size: 100,
            //     Cell: ({ row }) => (
            //         <p className='' >
            //             {getResolvedBy(row.original)}
            //         </p>

            //     ),
            // },
            {
                accessorKey: 'Date',
                header: 'Resolved Date',
                size: 100,
                Cell: ({ row }) => (
                    <p className='' >
                        {getResolvedByDate(row.original)}
                    </p>

                ),
            },
            {
                accessorKey: 'Time',
                header: 'Resolved Time',
                size: 100,
                Cell: ({ row }) => (
                    <p className='' >
                        {getResolvedByTime(row.original)}
                    </p>

                ),
            },
            {
                accessorKey: 'Status',
                header: 'Status',
                size: 80,
            },
        ],
        [],
    );

    const OptionSelect = async (e) => {
        name = e.target.name
        value = e.target.value
        setComplain({
            ...complain,
            nature_of_complain: value
        })
        if (value === "N/R") {
            setAdditionalFields(true)
        } else {
            setAdditionalFields(false)
        }
    }

    const table = useMaterialReactTable({
        columns,
        data: tableData,
        enableColumnActions: false,
        enableColumnFilters: false,
        enableSorting: false,
        initialState: { density: 'compact' },
        muiTableHeadCellProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '12px',
                border: '1px solid #e0e0e0',
                color: "black"
            },
        },
        muiTableBodyProps: {
            sx: {
                fontSize: "8px"
            }
        },
        muiTableBodyCellProps: {
            sx: {
                fontSize: "11px",
                borderRight: '2px solid #e0e0e0', //add a border between columns
            },
        }
    });

    useEffect(() => {
        if (data && data.complain.complains) {
            // console.log("New data received:", data.complain.complain);
            setTableData(data.complain.complains);
        }
    }, [data]);


    useEffect(() => {
        const loginID = cookies.get('em_loginid');
        const emp_name = cookies.get('name');
        setEmpName(emp_name)
        setLoginId(loginID)
        setComplain({
            ...complain,
            client_id: data && data.data.user.id,
            customer_name: data && data.data.user.customer_name,
            reg_no: data && data.data.user.registeration_no,
            em_loginid: loginID,
            representative: empName,
        });
    }, [complain])

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
            <div className='flex h-100 pt-0 mt-0'>
                <div className=' rounded-xl m-2 mt-0 pt-0 p-2 w-100' >
                    <form key={formKey} onSubmit={sendComplain} className='m-2 mt-0 p-2 bg-white'>
                        <h1 className='text-xl font-semibold bg-gray-200 p-2 m-2'>Complain Box </h1>
                        <div className='flex grid lg:grid-cols-2 md:grid-cols-1'>
                            <div className=' flex flex-col justify-center'>
                                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Nature of Complain</p><select className='input-field  ml-4 p-1  border bg-white' name='nature_of_complain' onChange={OptionSelect} style={{ width: "55%" }} aria-label=".form-select-lg example">
                                    <option value="">Select Nature Of complain </option>
                                    <option value="Sms Issue">SMS Issue </option>
                                    <option value="N/R">N/R No Report </option>
                                    <option value="Update Form">Update Form</option>
                                    <option value="Web Track">Web Track Issue </option>
                                    <option value="Wrong Location">Wrong Location</option>
                                </select>
                                </div>
                                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Complain Id</p><input className='bg-gray-200  ml-4 p-1 ' value={data && data.complain.new_complain_id || " "} readOnly style={{ width: "55%" }} /> </div>
                                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Customer Name</p><input className='bg-gray-200  ml-4 p-1 ' style={{ width: "55%" }} value={data && data.data.user.customer_name || " "} readOnly /> </div>
                                <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}> Registration Number</p><input className='bg-gray-200  ml-4 p-1 ' style={{ width: "55%" }} value={data && data.data.user.registeration_no || " "} readOnly /> </div>
                            </div >
                            <div className='flex flex-col justify-center  ' >
                                <div className='flex justify-center my-2'>
                                    <p>Remarks</p>
                                    <textarea className='input-field ml-4 p-1 border w-100' name="remarks" onChange={getUserData}></textarea>
                                </div>
                                {additionalFields && (
                                    <div>
                                        <div className='flex justify-center my-2'>
                                            <p className='text-end md:text-start' style={{ width: "40%" }}>Last Location </p>
                                            <input
                                                className='input-field ml-4 p-1 border bg-white'
                                                type='text'
                                                name='last_location'
                                                onChange={getUserData}
                                                style={{ width: "55%" }}
                                            />
                                        </div>
                                        <div className='flex justify-center my-2'>
                                            <p className='text-end md:text-start' style={{ width: "40%" }}>Date</p>
                                            <input
                                                className='input-field ml-4 p-1 border bg-white'
                                                type='test'
                                                name='Date'
                                                onChange={getUserData}
                                                style={{ width: "55%" }}
                                            />
                                        </div>
                                        <div className='flex justify-center my-2'>
                                            <p className='text-end md:text-start' style={{ width: "40%" }}>Time</p>
                                            <input
                                                className='input-field ml-4 p-1 border bg-white'
                                                type='text'
                                                name='Time'
                                                onChange={getUserData}
                                                style={{ width: "55%" }}
                                            />
                                        </div>
                                    </div>
                                )}
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
                                                        {data && data.data.user.make || " "} / {data && data.data.user.model || ""}
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

                    {/* Complain Logs  */}
                    <div className='m-2 bg-white mt-4'>
                        <h1 className='text-xl font-semibold bg-black text-white p-2 '> Complain Log</h1>
                        <MaterialReactTable table={table} />
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
