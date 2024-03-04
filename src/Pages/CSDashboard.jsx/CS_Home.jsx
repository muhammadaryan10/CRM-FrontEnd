import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUsersGear, faBook, faTruck, faEye, faExpand, faArrowRightFromBracket, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import CS_Sidebar from '../../Components/CS_Sidebar';
import { wait } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';


export default function SuperVisorHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [currentHours, setCurrentHours] = useState('');
  const [currentMinutes, setCurrentMinutes] = useState('');
  const [Alert, setAlerts] = useState([])
  const [AlertVisibility, setAlertVisibility] = useState(false)
  const [active_id, setActive_id] = useState("")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  const cookies = new Cookies();


  const toggleScreen = () => {
    const element = document.getElementById("root")
    const isFullScreen = document.fullscreenElement;
    if (!isFullScreen) {
      element.requestFullscreen()
    }
    else {
      element.exitFullscreen()
    }
  };

  const toggleAlertVisibility = () => {
    setAlertVisibility(!AlertVisibility);
  };

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

  useEffect(() => {
    const active_id = cookies.get('active_id');
    setActive_id(active_id)

    getAlert()
  }, [alert]);


  const removed = async (e) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/demo_removed`,
        {
          client_id: e.id
        }, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (response.status === 200) {
        window.alert("Deleted SeuccesFully")
        getAlert()
        toggleAlertVisibility()

        console.log(response)
      }
    } catch (error) {
      window.alert("Error")
      console.log(error)
    }
  }

  const approved = async (e) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/demo_approved`,
        {
          client_id: e.id
        }, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (response.status === 200) {
        window.alert("approved SeuccesFully")
        getAlert()
        toggleAlertVisibility()

        console.log(response)
      }
    } catch (error) {
      window.alert("Error")
      console.log(error)
    }
  }

  const logout = async (e) => {
    console.log(active_id)
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
          const cookieNames = ['name', 'designation', 'active_id', "session_token", "image", "em_loginid", "role", "emp_id",]; // Replace with your actual cookie names
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

  useEffect(() => {
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
    getAlert()
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <div className='flex h-[100vh] bg-black'>
      {isSidebarOpen && (
        <div className="sidebar"><CS_Sidebar /></div>
      )}
      <div className=' rounded-0  p-2 w-100 overflow-y-scroll' style={{ backgroundColor:"#F0F0F0"}}>
        <div className='flex justify-between m-2'>
          <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
          {/* <button onClick={toggleScreen}><FontAwesomeIcon icon={faExpand} /></button> */}
          <button type="button" className="p-2 h-8 w-8" onClick={logout}><FontAwesomeIcon icon={faPowerOff} /></button>

        </div>
        <div className='grid lg:grid-cols-3  gap-2 '>
          <Link to="/cs/logs" className=' border  p-2 flex rounded-0 bg-white shadow-sm hover:bg-gray-400'>
            <FontAwesomeIcon icon={faBook} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>View Logs</h1>
            </div>
          </Link>
          <Link to="/cs/complains" className=' border  p-2 flex rounded-0 bg-white shadow-sm hover:bg-gray-400'>
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
          <Link to="/cs/allUser" className=' border  p-2 flex rounded-0 bg-white shadow-sm hover:bg-gray-400'>
            <FontAwesomeIcon icon={faEye} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>View All User</h1>
            </div>
          </Link>
          {/* <Link to="/cs/updateTracker" className=' border  p-2 flex rounded-0 bg-white shadow-sm hover:bg-gray-400'>
            <FontAwesomeIcon icon={faEye} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>Update Tracker</h1>
            </div>
          </Link> */}
        </div>
        <div className='mt-5'>
          <div>
            <h2 className='m-2 p-2 border-t border-black shadow-sm'><button onClick={toggleAlertVisibility}>Demo Alerts  ({Alert.length})</button></h2>
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
                          {/* <div className='flex space-x-4'>
                              <p>Representative  # :</p>
                              <p>{e.representative}</p>
                            </div> */}
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
                      <div className='flex justify-center items-center'>
                        <span className='mx-2'><button onClick={() => approved(e)}>Approved</button></span>
                        <span className='mx-2'><button onClick={() => removed(e)}>Removed</button></span>
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
  )
}
