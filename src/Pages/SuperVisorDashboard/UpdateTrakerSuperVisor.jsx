import React, { useState } from 'react'
import SuperVisorSidebar from '../../Components/SuperVisorSidebar';
import { ToastContainer } from 'react-toastify';

export default function UpdateTrakerSuperVisor() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className='flex h-[100vh] bg-black'>
            {isSidebarOpen && (
                <div className="sidebar"><SuperVisorSidebar /></div>
            )}
            <ToastContainer/>
            <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll bg'>
                <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
                    <div className='flex grid lg:grid-cols-2 md:grid-cols-1'>
                        <div className=' flex flex-col mt-3 p-2'>
                            <h1 className='text-xl font-semibold bg-gray-400 p-2 m-2'>Tracker Information</h1>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Tracker Status :</p><select class='input-field  ml-4 p-1 '  style={{ width: "55%" }} aria-label=".form-select-lg example">
                                    <option value="1">Active</option>
                                    <option value="2">Removed </option>
                                    <option value="3">Third Party Sold</option>
                                </select>
                                </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Customer Name :</p><input className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Registration Number :</p><input className=' ml-3 custum_input p-1 ' /> </div>
                        </div >
                        <div className=' flex flex-col mt-3 p-2'>
                        <h1 className='text-xl font-semibold bg-gray-400 p-2 m-2'>Update Color Code</h1>
                            <div className='flex justify-center my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Default :</p><select class='input-field  ml-4 p-1 '  style={{ width: "55%" }} aria-label=".form-select-lg example">
                                    <option value="1">Color Red</option>
                                    <option value="2">Gold Member </option>
                                </select>
                                </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Customer Name :</p><input className=' ml-3 custum_input p-1 ' /> </div>
                            <div className='flex  my-2'><p className='text-end md:text-start ' style={{ width: "40%" }}>Registration Number :</p><input className=' ml-3 custum_input p-1 ' /> </div>
                        </div >
                    </div>
                    <div className='bg-gray-200 flex justify-end p-2 mx-2'>
                        <button className='theme_btn_md rounded-0'>Submit</button>
                    </div>
            </div>
        </div>
    )
}
