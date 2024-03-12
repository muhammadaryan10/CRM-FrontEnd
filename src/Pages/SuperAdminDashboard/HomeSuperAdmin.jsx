import React, { useEffect, useState } from 'react'
import SuperAdminSidebar from '../../Components/SuperAdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUsersGear, faBook, faTruck, faEye, faExpand, faRightFromBracket, faCircleXmark, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Watch } from 'react-loader-spinner';

export default function HomeSuperAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [currentHours, setCurrentHours] = useState('');
  const [currentMinutes, setCurrentMinutes] = useState('');
  const [newInstall, setNewInstall] = useState([]);
  const [count, setCount] = useState("");
  const [isInstallationVisible, setIsInstallationVisible] = useState(false); // State to track visibility
  const [popup, setPopup] = useState(false)
  const [active_id, setActive_id] = useState("")
  const [ total , setTotal ]=useState("")
  const [loading, setLoading] = useState(false);


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

  const getNewInstallation = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/alert_technical`);
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

  const toggleInstallationVisibility = () => {
    setIsInstallationVisible(!isInstallationVisible);
  };

  const hideAlerts = () => {
    setPopup(false);
  }

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

  const getCount = async (e) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/employees_count`)
    const data =await res.json()
    setTotal(data)
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
    getCount()
    getNewInstallation()
    const active_id = cookies.get('active_id');
    setActive_id(active_id)
    updateDate(); // Initial update
    const intervalId = setInterval(updateDate, 1000); // Update every second
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
        <div className="sidebar"><SuperAdminSidebar /></div>
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
      <ToastContainer position="top-center" />

      <div className='rounded-xl m-2 p-2 w-100 overflow-y-scroll' style={{ backgroundColor: "#F0F0F0" }}>
        <div className='flex justify-between m-2'>
          <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
          <button type="button" className="p-2 h-8 w-8" onClick={(e) => setPopup(!popup)}><FontAwesomeIcon icon={faPowerOff} /></button>
        </div>
        <div className='grid lg:grid-cols-3  gap-2 '>
          <div className=' border  p-2 flex hover:bg-gray-200 bg-white'>
            <FontAwesomeIcon icon={faUsersGear} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>Total Employees</h1>
              <p className='text-3xl font-bold text-black'>{total.emp_count}</p>
              <h1 className='text-sm text-black'>In your Organization</h1>
            </div>
          </div>
          <div className=' border  p-2 flex hover:bg-gray-200 bg-white'>
            <FontAwesomeIcon icon={faUsers} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>Total Users</h1>
              <p className='text-3xl font-bold text-black'>{total.user_count}</p>
              <h1 className='text-sm text-black'>In your Organization</h1>
            </div>
          </div>
          <div className=' border bg-white p-2'>
            <div className='text-center'>
              <h1 className='text-3xl text-black text-center'>{currentHours}:{currentMinutes}</h1>
              <p className='text-lg font-bold text-black text-center'>{currentDate}</p>
            </div>
          </div>
          <Link to="/superAdmin/vehiclesInfo" className=' border  p-2 flex hover:bg-gray-200 bg-white'>
            <FontAwesomeIcon icon={faTruck} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>Vehicle Status</h1>
            </div>
          </Link>
          <Link to="/superAdmin/vehiclesInfo" className=' border  p-2 flex hover:bg-gray-200 bg-white'>
            <FontAwesomeIcon icon={faEye} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>View All Users</h1>
            </div>
          </Link>
        </div>
        <div>
          <div>
            <h2 className='m-2 p-2 border-t border-black shadow-sm'><button onClick={toggleInstallationVisibility}>New Installation Que ({count})</button></h2>
            {isInstallationVisible && (
              <div>
                {newInstall.map((installation, index) => (
                  <div key={index} className='m-2'>
                    <div className='bg-white p-2 flex justify-between'>
                      <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-2'>
                        <div>
                          <p>Customer Name</p>
                          <p>Registration</p>
                        </div>
                        <div>
                          <p>: {installation.name}</p>
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
                      <div className='flex justify-center items-center'><span className='mx-2 bg-black p-2 text-white'>Status : {installation.status}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
