import React, { useEffect, useState } from 'react'
import DataLogSuperAdmin from '../SuperAdminDashboard/DataLogSuperAdmin';
import ComplainLogSuperAdmin from '../SuperAdminDashboard/ComplainLogSuperAdmin';
import RedoSuperAdmin from '../SuperAdminDashboard/RedoSuperAdmin';
import NRSuperAdmin from '../SuperAdminDashboard/NRSuperAdmin';
import CRO_SIdebar from '../../Components/CRO_SIdebar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogCro from './LogCro';
import ComplainLogCro from './ComplainLogCro';
import RedoLogCRO from './RedoLogCRO';
import NRCRO from './NRCRO';

export default function CROLogs() {
    const [data, setData] = useState();
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLog, setSelectedLog] = useState('data');
    const [errorAlert, setErrorAlert] = useState(false);
    const [msg, setMsg] = useState("");

    const hideAlerts = () => {
        setErrorAlert(false);
    };

    const navigate = useNavigate();
    const cookies = new Cookies();

    const Authentication = async () => {
        const check = cookies.get('role');
        if (check === "CRO") {

        }
        else if (!check) {
            // alert("Please Login First")
            navigate("/")
        }
        else {
            // alert("You Are Not Autherize")
            navigate("/")
        }
    }

    const handleLogButtonClick = (logType) => {
        setSelectedLog(logType);
    };

    const fetchData = async () => {
        try {
            console.log('agaya hn ')
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/search_for_all`,
                { search_term: searchTerm, }
            );
            if (res.data.data.security === null || res.data.data.technical === null) {
                setErrorAlert(true)
                setMsg("This Registration num is Not Completed Registered")
                return
            }
            console.log(res)
            console.log("data>>", res);
            setData(res.data);
            // setCount(response.count)
        } catch (error) {
            // console.error("Error fetching data:", error);
            if (error.response.status === 402) {
                setData()
                setErrorAlert(true)
                setMsg("Please Fill All the Feilds");
            }
            else if (error.response.status === 400) {
                setData()
                setErrorAlert(true)
                setMsg("Data Not Found");
            }
            else {
                setData()
                console.log(error)
                setErrorAlert(true)
                setMsg("Internal Server Error")
            }

        }
    };

    useEffect(() => {
        Authentication()
    }, []);

    const handleFetchDataSuccess = () => {
        fetchData(); // Call the fetchData function
    }

    return (
        <div>
            <CRO_SIdebar />
            {/* <ToastContainer/> */}
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
            <div className='bg-gray-200 rounded-xl m-2 p-2 w-100 '>
                <div className='flex justify-content-center'>
                    <input className='w-96 mx-4  p-2 custum_input' placeholder='Enter Registration , Engine or  Chachis Number ' onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className='theme_btn_md mx-4 rounded' onClick={fetchData}>Search</button>
                </div>
                <div className='flex m-4 mb-0'>
                    <button
                        className={`mr-1 text-xs font-bold  bg-white p-2 ${selectedLog === 'data' ? 'bg-gray-500' : ''}`}
                        onClick={() => handleLogButtonClick('data')}
                    >
                        Data Log
                    </button>
                    <button
                        className={`mr-1 text-xs font-bold  bg-white p-2 ${selectedLog === 'complain' ? 'bg-gray-500' : ''}`}
                        onClick={() => handleLogButtonClick('complain')}
                    >
                        Complain Log
                    </button>
                    <button className={`mr-1 text-xs font-bold  bg-white p-2 ${selectedLog === 'Redo' ? 'bg-gray-500' : ''}`}
                        onClick={() => handleLogButtonClick('Redo')}>Redo </button>
                    <button className={`mr-1 text-xs font-bold  bg-white p-2 ${selectedLog === 'NR' ? 'bg-gray-500' : ''}`}
                        onClick={() => handleLogButtonClick('NR')}>N/R (No Report)</button>
                </div>
                {selectedLog === 'data' && <LogCro data={data} onFetchDataSuccess={handleFetchDataSuccess} />}
                {selectedLog === 'complain' && <ComplainLogCro data={data}   onFetchDataSuccess={handleFetchDataSuccess}/>}
                {selectedLog === 'NR' && <NRCRO data={data} />}
                {selectedLog === 'Redo' && <RedoLogCRO data={data}/>}
            </div>
        </div>
    )
}
