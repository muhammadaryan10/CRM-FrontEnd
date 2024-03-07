import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUsersGear, faBook, faTruck, faEye, faExpand, faPowerOff, faCircleXmark, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import SuperVisorSidebar from '../../Components/SuperVisorSidebar';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Watch } from 'react-loader-spinner';

export default function SuperVisorHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [currentHours, setCurrentHours] = useState('');
  const [currentMinutes, setCurrentMinutes] = useState('');
  const [newInstall, setNewInstall] = useState([]);
  const [count, setCount] = useState("");
  const [complaincount, setComplaincount] = useState("")
  const [Complains, setComplains] = useState([])
  const [isInstallationVisible, setIsInstallationVisible] = useState(false); // State to track visibility
  const [isComplain, setIsComplain] = useState(false)
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [Alert, setAlerts] = useState([])
  const [AlertVisibility, setAlertVisibility] = useState(false)
  const [active_id, setActive_id] = useState("")
  const [popup, setPopup] = useState(false)
  const [ loading ,setLoading]=useState(false)

  const hideAlerts = () => {
    setPopup(false);
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleScreen = () => {
    const element=document.getElementById("root")
    const isFullScreen=document.fullscreenElement;
    if(! isFullScreen){
      element.requestFullscreen()
    }
    else{
      element.exitFullscreen()
    }
  };

  const getNewInstallation = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/alert_security`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res}`);
      }

      const response = await res.json();
      console.log("data>>", response.data);
      setNewInstall(response.data);
      setCount(response.count)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const getComplains = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/complain_queue`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res}`);
      }

      const response = await res.json();
      // console.log("data>>", response.data);
      setComplains(response.data);
      setComplaincount(response.count)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const getAlert = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/demo_days_alert`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res}`);
      }

      const response = await res.json();
      console.log("data>>", response.data);
      setAlerts(response.data);
      // setComplaincount(response.count)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const toggleInstallationVisibility = () => {
    setIsInstallationVisible(!isInstallationVisible);
  };
  
  const toggleComplainVisibility = () => {
    setIsComplain(!isComplain);
  };

  const toggleAlertVisibility = () => {
    setAlertVisibility(!AlertVisibility);
  };

  const logout = async (e) => {
    setLoading(true)
    console.log(active_id)
    e.preventDefault();
    let data;
    if (active_id) {
      try {
        // const response = await axios.post(
        //   `${process.env.REACT_APP_BACKEND_URL}/logout`,
        //   { active_id },
        //   { withCredentials: true } // Include credentials (cookies)
        // );
        // if (response.status === 200) {
          const cookieNames = ['name', 'designation', 'active_id', "session_token", "image", "em_loginid", "role", "emp_id",]; // Replace with your actual cookie names
          for (const cookieName of cookieNames) {
            cookies.remove(cookieName);
          }
          toast.success("Logged out SuccesFullly")
          // console.log(response)
          navigate("/");
        // }
      }
      catch (error) {
        if (error.response.status === 402) {
          setLoading(false)
          toast.error("Validation Error")
          // console.log(error)
        }
        else if (error.response.status === 460) {
          setLoading(false)
          toast.error("Already Log out")
          // console.log(error)
        }
      }
    }
    else {
      alert("Please Login First")
    }
  }

  useEffect(() => {
    const active_id = cookies.get('active_id');
    setActive_id(active_id)

    const updateDate = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' };
      // setCurrentDate(now.toLocaleDateString('en-US', options));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
      setCurrentHours(now.getHours());
      setCurrentMinutes(now.getMinutes());
    };
    updateDate(); // Initial update
    const intervalId = setInterval(updateDate, 1000); // Update every second
    getNewInstallation()
    getComplains()
    getAlert()
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);



  return (
    <>
     {loading && (
      <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
        <Watch
          visible={true}
          width="80"
          radius="48"
          color="#000000"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )}
    <div className='flex h-[100vh] bg-black'>
        {isSidebarOpen && (
        <div className="sidebar"><SuperVisorSidebar /></div>
      )}
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
      <div className='rounded-xl m-2 p-2 w-100 overflow-y-scroll' style={{ backgroundColor:"#F0F0F0"}}>
      <div className='flex justify-between m-2'>
        <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
        {/* <button onClick={toggleScreen}><FontAwesomeIcon icon={faExpand} /></button> */}
          <button type="button" className="p-2 h-8 w-8" onClick={(e) => setPopup(!popup)}><FontAwesomeIcon icon={faPowerOff} /></button>
        </div>  
        <div className='grid lg:grid-cols-3  gap-2 '>
          <Link to="/sv/updateProfile" className='border  p-2 flex rounded-2 bg-white shadow-md hover:bg-gray-400'>
            <FontAwesomeIcon icon={faUsersGear} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>Update Profile</h1>
            </div>
          </Link>
          <Link to="/sv/logs" className=' border  p-2 flex rounded-2 bg-white shadow-md hover:bg-gray-400'>
            <FontAwesomeIcon icon={faBook} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>View Logs</h1>
            </div>
          </Link>
          <Link to="/sv/complains" className=' border  p-2 flex rounded-2 bg-white shadow-md hover:bg-gray-400'>
            <FontAwesomeIcon icon={faBook} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>Complain Logs</h1>
            </div>
          </Link>
          <div className='border bg-white p-2'>
            <div className='text-center'>
              <h1 className='text-3xl text-black text-center'>{currentHours}:{currentMinutes}</h1>
              <p className='text-lg font-bold text-black text-center'>{currentDate}</p>
            </div>
          </div>
          <Link to="/sv/DataLog" className=' border  p-2 flex rounded-2 bg-white shadow-md hover:bg-gray-400'>
            <FontAwesomeIcon icon={faEye} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>View Data Logs</h1>
            </div>
          </Link>
            {/* <Link to="/sv/updateTracker" className=' border  p-2 flex rounded-2 bg-white shadow-md hover:bg-gray-400'>
              <FontAwesomeIcon icon={faEye} className='h-16 p-2' />
              <div className=' ml-3'>
                <h1 className='text-2xl text-black'>Update Tracker</h1>
              </div>
            </Link> */}
        </div>
        <div className='mt-4'>
          <div>
            <div>
              <h2 className='m-2 p-2 shadow-md border-t border-black'><button onClick={toggleInstallationVisibility}>New Installation Que ({count})</button></h2>
              {isInstallationVisible && (
                <div>
                  {newInstall.map((installation, index) => (
                      <div key={index} className='m-2'>
                      <div className='bg-white p-2 flex justify-between'>
                        <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-2'>
                          <div>
                            <p>Client ID</p>
                            <p>Registration</p>
                          </div>
                          <div>
                            <p>: {installation.client_id}</p>
                            <p>: {installation.reg_no}</p>
                          </div>
                        </div>
                        <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-0'>
                          <div>
                            <p>Representative</p>
                            <p>Date / Time</p>
                          </div>
                          <div >
                            <p>: {installation.representative}</p>
                            <p>: {installation.date} / {installation.time}</p>
                          </div>
                        </div>
                        <div className='flex justify-center items-center'><span className='mx-2 bg-black p-2 text-white'>Status : <Link to={`/sv/addUser/${installation.reg_no}`}>{installation.status}</Link></span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <h2 className='m-2 p-2 shadow-md border-t border-black'><button onClick={toggleComplainVisibility}>New Complains  ({complaincount})</button></h2>
              {isComplain && (
                <div>
                  {Complains.map((e, index) => (
                      <div key={index} className='m-2'>
                      <div className='bg-white p-2 flex justify-between  '>
                        {/* <div className='flex'> */}
                        <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-0'>
                          <div className=''>
                            {/* <div className='space-x-4'> */}
                            <p>Customer Name</p>
                            {/* </div> */}
                            {/* <div className='space-x-4'> */}
                            <p>Complain</p>
                            {/* </div> */}
                            {/* <div className='space-x-4'> */}
                            <p>Remarks </p>
                            {/* </div> */}
                            {/* <div className='space-x-4'> */}
                            <p>Date </p>
                            {/* </div> */}
                          </div>
                          <div className=''>
                            <p>: {e.customer_name}</p>
                            <p >: {e.nature}</p>
                            <p>: {e.remarks}</p>
                            <p>: {e.date}</p>
                          </div>
                        </div>
                        {/* </div> */}
                        <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-1'>
                          <div className=''>
                            {/* <div className='flex space-x-4'> */}
                            <p>Representative</p>
                            {/* </div> */}
                            {/* <div className='flex space-x-4'> */}
                            <p>Ticker</p>
                            {/* </div> */}
                            {/* <div className='flex space-x-4'> */}
                            <p>Registration</p>
                            {/* </div> */}
                            {/* <div className='flex space-x-4'> */}
                            <p>Time</p>
                            {/* </div> */}
                          </div>
                          <div className=''>
                            <p>: {e.representative}</p>
                            <p>: {e.complain_id}</p>
                            <p>: {e.reg_no}</p>
                            <p>: {e.time}</p>

                          </div>
                        </div>
                        <div className='flex justify-center items-center'><span className='mx-2 bg-black p-2 text-white'>Status :{e.Status}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <h2 className='m-2 p-2 shadow-md border-t border-black'><button onClick={toggleAlertVisibility}>Demo Alerts ( {Alert.length} )</button></h2>
              {AlertVisibility && (
                <div>
                  {Alert.map((e, index) => (
                    <div key={index} className='m-2'>
                      <div className='bg-white p-2 flex justify-between'>
                        <div className='flex space-x-4'>
                          <div>
                            <div className='flex space-x-4'>
                              <p>Customer Name :</p>
                              <p>{e.customer_name}</p>
                            </div>
                            <div className='flex space-x-4'>
                              <p>Date OF Installation :</p>
                              <p>{e.date_of_installation}</p>
                            </div>
                            <div className='flex space-x-4'>
                              <p>Demp Expire Date :</p>
                              <p>{e.demo_duration}</p>
                            </div>
                          </div>
                          <div>
                            <div className='flex space-x-4'>
                              <p>Sales Person :</p>
                              <p>{e.sales_person}</p>
                            </div>
                            <div className='flex space-x-4'>
                              <p>Special Instruction :</p>
                              <p>{e.remarks}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
