import React, { useEffect, useState } from 'react'
import SuperAdminSidebar from '../../Components/SuperAdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUsersGear, faBook, faTruck, faEye, faExpand } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function HomeSuperAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [currentHours, setCurrentHours] = useState('');
  const [currentMinutes, setCurrentMinutes] = useState('');
  const [newInstall, setNewInstall] = useState([]);
  const [count, setCount] = useState("");
  const [isInstallationVisible, setIsInstallationVisible] = useState(false); // State to track visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' };
      // setCurrentDate(now.toLocaleDateString('en-US', options));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
      setCurrentHours(now.getHours());
      setCurrentMinutes(now.getMinutes());
    };
    getNewInstallation()
    updateDate(); // Initial update
    const intervalId = setInterval(updateDate, 1000); // Update every second
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);
  
  return (
    <div className='flex h-[100vh] bg-black'>
      {isSidebarOpen && (
        <div className="sidebar"><SuperAdminSidebar /></div>
      )}
      <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll'>
        <div className='flex justify-between m-2'>
          <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
          <button onClick={toggleScreen}><FontAwesomeIcon icon={faExpand} /></button>
        </div>
        <div className='grid lg:grid-cols-3  gap-2 '>
          <div className=' border  p-2 flex hover:bg-gray-200'>
            <FontAwesomeIcon icon={faUsersGear} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>Total Employees</h1>
              <p className='text-3xl font-bold text-black'>60</p>
              <h1 className='text-sm text-black'>In your Organization</h1>
            </div>
          </div>
          <div className=' border  p-2 flex hover:bg-gray-200'>
            <FontAwesomeIcon icon={faUsers} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>Total Users</h1>
              <p className='text-3xl font-bold text-black'>60</p>
              <h1 className='text-sm text-black'>In your Organization</h1>
            </div>
          </div>
          <div className=' border bg-gray-200  p-2'>
            <div className='text-center'>
              <h1 className='text-3xl text-black text-center'>{currentHours}:{currentMinutes}</h1>
              <p className='text-lg font-bold text-black text-center'>{currentDate}</p>
            </div>
          </div>
          <div className=' border  p-2 flex hover:bg-gray-200'>
            <FontAwesomeIcon icon={faBook} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>Total Employees</h1>
              <p className='text-3xl font-bold text-black'>60</p>
              <h1 className='text-sm text-black'>In your Organization</h1>
            </div>
          </div>
          <Link to="/superAdmin/vehiclesInfo" className=' border  p-2 flex hover:bg-gray-200'>
            <FontAwesomeIcon icon={faTruck} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>Vehicle Status</h1>
            </div>
          </Link>
          <Link to="/superAdmin/vehiclesInfo" className=' border  p-2 flex hover:bg-gray-200'>
            <FontAwesomeIcon icon={faEye} className='h-16 p-2' />
            <div className=' ml-3'>
              <h1 className='text-2xl text-black'>View All Users</h1>
            </div>
          </Link>
        </div>
        <div>
          <div>
            <h2 className='m-2 p-2 border shadow-md'><button onClick={toggleInstallationVisibility}>New Installation Que ({count})</button></h2>
            {isInstallationVisible && (
              <div>
                {newInstall.map((installation, index) => (
                  <div key={index} className='m-2'>
                    <div className='bg-gray-300 p-2 flex justify-between'>
                      <div className='flex space-x-4'>
                        <div>
                          <div className='flex space-x-4'>
                            <p>Customer Name :</p>
                            <p>{installation.customer_name}</p>
                          </div>
                          <div className='flex space-x-4'>
                            <p>Registration # :</p>
                            <p>{installation.reg_no}</p>
                          </div>
                        </div>
                        <div>
                          <div className='flex space-x-4'>
                            <p>Representative  # :</p>
                            <p>{installation.representative}</p>
                          </div>
                          <div className='flex space-x-4'>
                            <p>Date / Time :</p>
                            <p>{installation.date_time}</p>
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-center items-center'>Status : <span className='mx-2'><Link to={`/tech/addUser/${installation.reg_no}`}>{installation.status}</Link></span></div>
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
