import React, { useState } from 'react'
import CS_Sidebar from '../../Components/CS_Sidebar'
import axios from 'axios';

export default function InstallationForm() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState([]);
  const [search_term, setSearch_term] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  let value
  const getUserData = (e) => {
    value = e.target.value;
    setSearch_term(value);
    console.log(search_term);
  };

  const getData = async (e) => {
    e.preventDefault();
    if (search_term) {
      try {
        console.log(search_term)
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/device_certificate`,
          { search_term: search_term },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("Request successful", response.data.data);
          setData(response.data.data)
          window.alert('Dat Fetched  Succfully')
        }
        else {
          console.log("Internal Server Error", data.message);
          window.alert("Internal Server Error")
        }
      } catch (error) {
        if (error.response.status === 400) {
          setData([])
          console.log("Data Not Found", data.message);
          window.alert("Data Not Found")
        }
        else if (error.response.status === 402) {
          setData([])
          console.log("Validation Error", data.message);
          window.alert("Validation Error")
        }
        console.log(error)

      }
    } else {
      window.alert("Plesae Fill All the feilds")
    }
  }


  return (
    <div className='flex h-[100vh] bg-black'>
      {isSidebarOpen && (
        <div className="sidebar"><CS_Sidebar /></div>
      )}
      <div className=' rounded-xl m-2 p-2 w-100  bg-white flex flex-col items-center overflow-y-auto'>
        <div className='flex justify-start w-100'>
          <button onClick={toggleSidebar} ><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
        </div>
        <div className='flex justify-content-center'>
          <input className='w-96 mx-3 p-2 custum_input' placeholder='Enter Registration , Engine or  Chachis Number ' onChange={getUserData} />
          <button className='theme_btn_md mx-4 rounded ' onClick={getData}>Search</button>
        </div>
        <div className='flex justify-end w-100'>
          <button className="theme_btn_md rounded-0">Print</button>
        </div>
        <div className=' w-100 lg:max-w-2xl md:max-w-lg ' >
          <h1 className="text-lg font-bold text-center mt-4 text-white bg-black p-1 w-100">Tracking Device Installation Certificate</h1>
          <h5 className="text-md font-semibold text-start mt-4  p-1 w-100">Dear Cocnern,</h5>
          <p className='text-md text-start mb-4'>This is to verify that TSG (Pvt.) Limited has successfully installed the tracking device in the vehicle bearing the following details.

            The registered user of this vehicle is</p>
          <div className='flex w-100 text-sm '>
            <p style={{ width: "40%" }} className='font-bold b p-2 '>Make</p><p className='p-2 bl' style={{ width: "60%" }}>{data && data.make} </p>
          </div>
          <div className='flex w-100 text-sm '>
            <p style={{ width: "40%" }} className='font-bold b p-2 '>Model</p><p className='p-2 bl' style={{ width: "60%" }}>{data && data.model}</p>
          </div>
          <div className='flex w-100 text-sm '>
            <p style={{ width: "40%" }} className='font-bold b p-2 '>Year</p><p className='p-2 bl' style={{ width: "60%" }}>{data && data.year}</p>
          </div>
          <div className='flex w-100 text-sm '>
            <p style={{ width: "40%" }} className='font-bold b p-2 '>Installation Date</p><p className='p-2 bl' style={{ width: "60%" }}>{data && data.date_of_installation}</p>
          </div>
          <div className='flex w-100 text-sm '>
            <p style={{ width: "40%" }} className='font-bold b p-2 '>Engine Number</p><p className='p-2 bl' style={{ width: "60%" }}>{data && data.engine_no}</p>
          </div>
          <div className='flex w-100 text-sm '>
            <p style={{ width: "40%" }} className='font-bold b p-2 '>Chassis Number</p><p className='p-2 bl' style={{ width: "60%" }}>{data && data.chasis_no}</p>
          </div>
          <div className='flex w-100 text-sm '>
            <p style={{ width: "40%" }} className='font-bold b p-2 '>Registration Number</p><p className='p-2 bl' style={{ width: "60%" }}>{data && data.reg_no}</p>
          </div>
          <div className='flex w-100 text-sm '>
            <p style={{ width: "40%" }} className='font-bold b p-2 '>Segment</p><p className='p-2 bl' style={{ width: "60%" }}>{data && data.segement}</p>
          </div>
          <div className='flex w-100 text-sm '>
            <p style={{ width: "40%" }} className='font-bold border border-black p-2 '>Validity</p><p className='p-2 border border-black ' style={{ width: "60%" }}>1 Year</p>
          </div>
        </div>
      </div>
    </div>
  )
}
