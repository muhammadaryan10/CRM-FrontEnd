import React, { useState } from 'react'
import SuperAdminSidebar from '../../Components/SuperAdminSidebar';
import DataLogSuperAdmin from './DataLogSuperAdmin';
import ComplainLogSuperAdmin from './ComplainLogSuperAdmin';
import NRSuperAdmin from './NRSuperAdmin';
import RedoSuperAdmin from './RedoSuperAdmin';
import RenewalLogSuperAdmin from './RenealLogSuperAdmin';
import axios from 'axios';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LogSuperAdmin() {
    const [selectedLog, setSelectedLog] = useState('data');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [errorAlert, setErrorAlert] = useState(false);
    const [msg, setMsg] = useState("");

    const hideAlerts = () => {
        setErrorAlert(false);
    };

    const handleLogButtonClick = (logType) => {
        setSelectedLog(logType);
    };
    const [data, setData] = useState();
    const [searchTerm, setSearchTerm] = useState("")
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };



    const fetchData = async () => {
        try {
            console.log('agaya hn ')
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/search_for_all`,
                {search_term: searchTerm,}
            );
            if (res.data.data.security === null || res.data.data.technical === null ) {
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
            if (error.response.status === 422 ) {
                setData()
                setErrorAlert(true)
                setMsg("Please Fill All the Feilds");
            }
            else{
                setData()
                setErrorAlert(true)
                setMsg("Data Not Found")
            }

        }
    };

    return (
        <div>
            <div className='flex h-[100vh] bg-black pt-0 mt-0'>
                {isSidebarOpen && (
                    <div className="sidebar"><SuperAdminSidebar /></div>
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
                <div className='rounded-xl m-2 p-2 w-100 overflow-y-scroll' style={{backgroundColor:"#F0EFEF"}}>
                    <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
                    <div className='flex justify-content-center'>
                        <input className='w-96 mx-4  p-2' placeholder='Enter Registration , Engine or  Chachis Number ' onChange={(e)=> setSearchTerm(e.target.value)}/>
                        <button className='theme_btn_md mx-4 rounded' onClick={fetchData} >Search</button>
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
                        <button className={`mr-1 text-xs font-bold  bg-white p-2 ${selectedLog === 'Renewal' ? 'bg-gray-500' : ''}`}
                            onClick={() => handleLogButtonClick('Renewal')}>Renewal</button>
                        <button className={`mr-1 text-xs font-bold  bg-white p-2 ${selectedLog === 'NR' ? 'bg-gray-500' : ''}`}
                            onClick={() => handleLogButtonClick('NR')}>N/R (No Report)</button>
                    </div>
                    {selectedLog === 'data' && <DataLogSuperAdmin data={data} />}
                    {selectedLog === 'complain' && <ComplainLogSuperAdmin data={data} />}
                    {selectedLog === 'NR' && <NRSuperAdmin data={data} />}
                    {selectedLog === 'Redo' && <RedoSuperAdmin data={data} />}
                    {selectedLog === 'Renewal' && <RenewalLogSuperAdmin data={data} />}
                </div>
            </div>
        </div>
    )
}
