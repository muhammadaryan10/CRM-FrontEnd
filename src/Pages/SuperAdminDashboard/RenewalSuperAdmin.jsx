import React, { useState } from 'react'
import SuperVisorSidebar from '../../Components/SuperVisorSidebar'
import { Link } from 'react-router-dom';

export default function RenewalSuperAdmin() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <div className='flex h-[100vh] bg-black pt-0 mt-0'>
                {isSidebarOpen && (
                    <div className="sidebar"><SuperVisorSidebar /></div>
                )}
                <div className='bg-gray-200 rounded-xl m-2 p-2 w-100 overflow-y-scroll'>
                    <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
                    <div className='bg-white m-2 mt-4'>
                        <h1 className='text-xl font-semibold bg-black text-white p-2 '>All Renewals</h1>

                        <div class="flex flex-col">
                            <div class="overflow-x-auto">
                                <div class="py-2 inline-block min-w-full ">
                                    <div className='flex justify-between p-2'>
                                        <div><button className='p-2 bg-blue-500 rounded'>Export PDF</button></div>
                                        <div><input className='p-2  bg-gray-400 text-white placeholder-white ' placeholder='Search Here'/><label className='ml-3 theme_btn_md'>Search</label></div>
                                    </div>
                                    <div class="overflow-x-auto mb-4 ">
                                        <table class="min-w-full">
                                            <thead class="bg-gray-400 border-1 border-black">
                                                <tr>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start ">
                                                        Segment
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start ">
                                                        Registration #
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start ">
                                                        Customer Name
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start ">
                                                        DOI
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start ">
                                                        Month
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start ">
                                                        Contact Number
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start ">
                                                        DOR
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start ">
                                                        Reg Time
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start ">
                                                        Sales Person
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start ">
                                                        Status
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start ">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="bg-white border-1 border-black">
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap "> JU-7025</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        27684
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        O63705
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        Hino Pak /  Truck
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">Blue</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        1995
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        manual
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light  whitespace-nowrap">
                                                        <p className='bg-green-300 p-1'>Paid </p>
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        <button className='px-2 py-1 bg-gray-400 mx-2'>Edit</button><button className='px-2 py-1 bg-gray-400 mx-2'>View</button>
                                                        <Link to="/sv/addPayment" className='px-2 py-1 bg-gray-400 mx-2'>Add Payment </Link>
                                                    </td>
                                                </tr>
                                                <tr class="bg-white border-1 border-black">
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap "> JU-7025</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        27684
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        O63705
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        Hino Pak /  Truck
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">Blue</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        1995
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        manual
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light   whitespace-nowrap ">
                                                    <p className='bg-red-300 p-1'>UnPaid </p>
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        <button className='px-2 py-1 bg-gray-400 mx-2'>Edit</button><button className='px-2 py-1 bg-gray-400 mx-2'>View</button>
                                                        <Link to="/sv/addPayment" className='px-2 py-1 bg-gray-400 mx-2'>Add Payment </Link>
                                                    </td>
                                                </tr>
                                                <tr class="bg-white border-1 border-black">
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap "> JU-7025</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        27684
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        O63705
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        Hino Pak /  Truck
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">Blue</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        1995
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        manual
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light   whitespace-nowrap ">
                                                    <p className='bg-red-300 p-1'>UnPaid </p>
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        <button className='px-2 py-1 bg-gray-400 mx-2'>Edit</button><button className='px-2 py-1 bg-gray-400 mx-2'>View</button>
                                                        <Link to="/sv/addPayment" className='px-2 py-1 bg-gray-400 mx-2'>Add Payment </Link>
                                                    </td>
                                                </tr>
                                                <tr class="bg-white border-1 border-black">
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap "> JU-7025</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        27684
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        O63705
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        Hino Pak /  Truck
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">Blue</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        1995
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        manual
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light  whitespace-nowrap">
                                                        <p className='bg-green-300 p-1'>Paid </p>
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        <button className='px-2 py-1 bg-gray-400 mx-2'>Edit</button><button className='px-2 py-1 bg-gray-400 mx-2'>View</button>
                                                        <Link to="/sv/addPayment" className='px-2 py-1 bg-gray-400 mx-2'>Add Payment </Link>
                                                    </td>
                                                </tr>
                                                <tr class="bg-white border-1 border-black">
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap "> JU-7025</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        27684
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        O63705
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        Hino Pak /  Truck
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">Blue</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        1995
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        manual
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light  whitespace-nowrap">
                                                        <p className='bg-green-300 p-1'>Paid </p>
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        <button className='px-2 py-1 bg-gray-400 mx-2'>Edit</button><button className='px-2 py-1 bg-gray-400 mx-2'>View</button>
                                                        <Link to="/sv/addPayment" className='px-2 py-1 bg-gray-400 mx-2'>Add Payment </Link>
                                                    </td>
                                                </tr>
                                                <tr class="bg-white border-1 border-black">
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap "> JU-7025</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        27684
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        O63705
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        Hino Pak /  Truck
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">Blue</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        1995
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        manual
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light   whitespace-nowrap ">
                                                    <p className='bg-red-300 p-1'>UnPaid </p>
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        <button className='px-2 py-1 bg-gray-400 mx-2'>Edit</button><button className='px-2 py-1 bg-gray-400 mx-2'>View</button>
                                                        <Link to="/sv/addPayment" className='px-2 py-1 bg-gray-400 mx-2'>Add Payment </Link>
                                                    </td>
                                                </tr>
                                                <tr class="bg-white border-1 border-black">
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap "> JU-7025</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        27684
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        O63705
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        Hino Pak /  Truck
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">Blue</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        1995
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        manual
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light   whitespace-nowrap ">
                                                    <p className='bg-red-300 p-1'>UnPaid </p>
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        <button className='px-2 py-1 bg-gray-400 mx-2'>Edit</button><button className='px-2 py-1 bg-gray-400 mx-2'>View</button>
                                                        <Link to="/sv/addPayment" className='px-2 py-1 bg-gray-400 mx-2'>Add Payment </Link>
                                                    </td>
                                                </tr>
                                                <tr class="bg-white border-1 border-black">
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap "> JU-7025</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        27684
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        O63705
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        Hino Pak /  Truck
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">Blue</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        1995
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        manual
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        no
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light  whitespace-nowrap">
                                                        <p className='bg-green-300 p-1'>Paid </p>
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap ">
                                                        <button className='px-2 py-1 bg-gray-400 mx-2'>Edit</button><button className='px-2 py-1 bg-gray-400 mx-2'>View</button>
                                                        <Link to="/sv/addPayment" className='px-2 py-1 bg-gray-400 mx-2'>Add Payment </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
