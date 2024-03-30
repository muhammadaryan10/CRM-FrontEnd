import React, { useState } from 'react'
import SuperAdminSidebar from '../../Components/SuperAdminSidebar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function VehicleInformation() {
    const { reg_no } = useParams();
    const [data, setData] = useState();
    console.log(reg_no)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [view, setView] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClosePopup = () => {
        // setSelectedComplain([]);
        setView(false);
    };

    const fetchData = async () => {
        try {
            console.log('agaya hn ')
            console.log(reg_no)
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/edit/${reg_no}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res}`);
            }

            const response = await res.json();
            console.log("data>>", response);
            setData(response);
            // setCount(response.count)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            <div className='flex h-[100vh] bg-black'>
                {isSidebarOpen && (
                    <div className="sidebar"><SuperAdminSidebar /></div>
                )}
                {view && (
                    <div className="overlay">
                        <div className="popup">
                            <div className="bg-white p-3 " role="alert">
                                <div className="flex justify-end">
                                    <button onClick={handleClosePopup}><FontAwesomeIcon className='h-8' icon={faCircleXmark} /></button>
                                </div>
                                <h1 className="font-bold fs-4 my-2">Updates</h1>
                                <div>
                                    <table className="min-w-full">
                                        <thead className="bg-gray-300 border">
                                            <tr>
                                                <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                                                    Date
                                                </th>
                                                <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                                                    Time
                                                </th>
                                                <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                                                    Representative
                                                </th>
                                                <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                                                    Remarks
                                                </th>
                                                <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {/* {selectedComplain.length > 0 && (
                                            selectedComplain.map(action => (<tr className="bg-white border">
                                                <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">{action.date || " "}</td>
                                                <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                                                    {action.time || " "}
                                                </td>
                                                <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                                                    {action.resolved_by || " "}
                                                </td>
                                                <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                                                    {action.remarks || ""}
                                                </td>
                                                <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                                                    {action.action || ""}
                                                </td>
                                            </tr>
                                            ))
                                        )} */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll bg'>
                    <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
                    {/*Cleint INformation  */}
                    <div className='m-2 bg-white mt-4'>
                        <h1 className='text-xl font-semibold bg-black text-white p-2'>Client  Information</h1>
                        <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 p-2 space-y-4 '>
                            <div>
                                <h1 className='bg-gray-200 p-2 text-sm font-bold my-2 mr-4 underline'> Primary User Information</h1>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Customer Name:</p>
                                    <p className='text-sm  w-60 '>{data && data.user.customer_name || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Father Name:</p>
                                    <p className='text-sm  w-60'>{data && data.user.father_name || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>CNIC</p>
                                    <p className='text-sm  w-60'>{data && data.user.cnic || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Address </p>
                                    <p className='text-sm  w-60'>{data && data.user.address || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Contact 1</p>
                                    <p className='text-sm  w-60'>{data && data.user.mobileno_1 || "N/A"}</p>
                                </div>
                                {data && data.user.mobileno_2 && data.user.mobileno_2 !== null ? (
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Contact 2</p>
                                        <p className='text-sm  w-60'>{data && data.user.mobileno_2 || "N/A"}</p>
                                    </div>
                                ) : (<></>)}
                                {data && data.user.mobileno_3 && data.user.mobileno_3 !== null ? (
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Contact 3</p>
                                        <p className='text-sm  w-60'>{data && data.user.mobileno_3 || "N/A"}</p>
                                    </div>
                                ) : (<></>)}

                            </div>
                            {data && data.security !== null ? (
                                <div>
                                    <h1 className='bg-gray-200 text-sm font-bold my-2 mt-0 mr-2 p-2 underline'>Security  Information</h1>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Customer Email:</p>
                                        <p className='text-sm  w-60'>{data && data.security.customer_email || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Password </p>
                                        <p className='text-sm  w-60'>{data && data.security.password || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Emergency Password: </p>
                                        <p className='text-sm  w-60'>{data && data.security.emergency_pass || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Emergency Person :</p>
                                        <p className='text-sm  w-60'>{data && data.security.emergency_person || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Emergency Person Contact:</p>
                                        <p className='text-sm  w-60'>{data && data.security.emergency_person_contact || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Security Question:</p>
                                        <p className='text-sm  w-60'>{data && data.security.security_ques || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Security Answer:</p>
                                        <p className='text-sm  w-60'>{data && data.security.security_ans || "N/A"}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className='bg-white mt-3 border border-gray-600 text-center flex justify-center items-center'>
                                    {/* <h1 classNam='text-xl font-semibold bg-black text-white p-2'>Technical Information</h1> */}
                                    <p>Security Form Is not Submited yet</p>
                                </div>
                            )
                            }
                            <div>
                                <h1 className='bg-gray-200 p-2 text-sm font-bold  mr-4 underline'> Secondary User Information</h1>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'> Name:</p>
                                    <p className='text-sm  w-60 '>{data && data.user.seconadryuser_name || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Contact:</p>
                                    <p className='text-sm  w-60'>{data && data.user.secondaryuser_con1 || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>RelationShip :</p>
                                    <p className='text-sm  w-60'>{data && data.user.relationship || "N/A"}</p>
                                </div>
                                {/* <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Address </p>
                                    <p className='text-sm  w-60'>{data && data.user.address || "N/A"}</p>
                                </div> */}
                            </div>
                            {/* <div>
                                <h1 className='bg-gray-200 p-2 text-sm font-bold my-2 mr-4 underline'> Contact Information</h1>
                              
                            </div> */}


                        </div>
                    </div>
                    <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-x-3 m-2 mt-2'>
                        {/* Vehicle Information  */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Vehicle Information</h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Registration # :</p>
                                    <p className='text-sm  w-60 '>{data && data.user.registeration_no || "N/A"}<button className='text_edit' onClick={()=> setView(true)}>Edited</button></p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Engine #:</p>
                                    <p className='text-sm  w-60'>{data && data.user.engine_no || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Chassis #:</p>
                                    <p className='text-sm  w-60'>{data && data.user.chasis_no || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Make :</p>
                                    <p className='text-sm  w-60'>{data && data.user.make || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Model :</p>
                                    <p className='text-sm  w-60'>{data && data.user.model || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Year :</p>
                                    <p className='text-sm  w-60'>{data && data.user.year || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Color :</p>
                                    <p className='text-sm  w-60'>{data && data.user.color || "N/A"}</p>
                                </div>
                                {data && data.technical !== null ? (
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Mobilizer :</p>
                                        <p className='text-sm  w-60'>{data && data.technical.mobilizer || "N/A"}</p>
                                    </div>
                                ) : (
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Mobilizer :</p>
                                        <p className='text-sm  w-60'>Pending</p>
                                    </div>
                                )}

                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Transmission :</p>
                                    <p className='text-sm  w-60'>{data && data.user.transmission || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                        {/* Organiztion Detail */}
                        {/* <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Oragnization Detail</h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Organization Name :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.hh || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Customer Designation :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.hh || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>NTN #</p>
                                    <p className='text-sm  w-60'>{data && data.user.ntn || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Sale Tax Reg. # </p>
                                    <p className='text-sm  w-60'>{data && data.technical.hh || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Fax # </p>
                                    <p className='text-sm  w-60'>{data && data.technical.hh || "N/A"}</p>
                                </div>
                            </div>
                        </div> */}
                        {/* Technical Information  */}
                        {data && data.technical !== null ? (
                            <div className='bg-white mt-3 border border-gray-600'>
                                <h1 className='text-xl font-semibold bg-black text-white p-2 '>Technical Information</h1>
                                <div className='p-2'>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Vendor :</p>
                                        <p className='text-sm  w-60'>{data && data.device_information.vendor || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>IMEI #:</p>
                                        <p className='text-sm  w-60'>{data && data.technical.IMEI_no || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Device ID:</p>
                                        <p className='text-sm  w-60'>{data && data.technical.device_id || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Sim No:</p>
                                        <p className='text-sm  w-60'>{data && data.technical.sim || "N/A"}</p>
                                    </div>
                                    {data && data.secondary_device && data.secondary_device.secondary_device !== null ? (
                                        <>
                                            <div className='flex'>
                                                <p className='text-sm font-bold w-40'>Secondery Device ID:</p>
                                                <p className='text-sm  w-60'>{data && data.secondary_device.secondary_device || "N/A"}</p>
                                            </div>
                                        </>
                                    ) : (<></>)
                                    }
                                    {/* <div className='flex'>
         <p className='text-sm font-bold w-40'>GPS Activation :</p>
         <p className='text-sm  w-60'>{data && data.technical.Gps_check || "N/A"}</p>
     </div> */}
                                    {/* <div className='flex'>
         <p className='text-sm font-bold w-40'>Tavl. Management Id :</p>
         <p className='text-sm  w-60'>{data && data.technical.Tavl_mang_id || "N/A"}</p>
     </div> */}
                                    {/* <div className='flex'>
         <p className='text-sm font-bold w-40'>Operational Status :</p>
         <p className='text-sm  w-60'>{data && data.technical.operational_status || "N/A"}</p>
     </div> */}
                                    {data && data.technical.webtrack_id && data.technical.webtrack_pass && data.technical.webtrack_id !== null ? (
                                        <>
                                            <div className='flex'>
                                                <p className='text-sm font-bold w-40'>Webtrack Id :</p>
                                                <p className='text-sm  w-60'>{data && data.technical.webtrack_id || "N/A"}</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='text-sm font-bold w-40'>Webtrack Password :</p>
                                                <p className='text-sm  w-60'>{data && data.technical.webtrack_pass || "N/A"}</p>
                                            </div>
                                        </>
                                    ) : (<></>)
                                    }
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Technician :</p>
                                        <p className='text-sm  w-60'>{data && data.technical.technician_name || "N/A"}</p>
                                    </div>
                                    {/* <div className='flex'>
         <p className='text-sm font-bold w-40'>Speed Alert :</p>
         <p className='text-sm  w-60'>{data && data.technical.overspeed_alerts || "N/A"}</p>
     </div> */}
                                </div>
                            </div>
                        ) : (
                            <div className='bg-white mt-3 border border-gray-600 text-center flex justify-center items-center'>
                                {/* <h1 classNam='text-xl font-semibold bg-black text-white p-2'>Technical Information</h1> */}
                                <p>Technical Form Is not Submited yet</p>
                            </div>
                        )}
                        {/* Other Information   */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Other Information  </h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-60'>Compaign Point :</p>
                                    <p className='text-sm  w-40'>{data && data.user.campaign_point || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-60'>Dealer Name :</p>
                                    <p className='text-sm  w-40'>{data && data.user.dealer_name || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-60'>Demo Duration :</p>
                                    <p className='text-sm w-40'>{data && data.user.demo_duration || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-60'>Insurance Partner :</p>
                                    <p className='text-sm w-40'>{data && data.user.insurance_partner || "N/A"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-60'>Dealership :</p>
                                    <p className='text-sm w-40'>{data && data.user.dealership || "N/A"}</p>
                                </div>
                                {data && data.technical !== null ? (
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Tracker Status :</p>
                                        <p className='text-sm  w-60'>{data && data.technical.tracker_status || "N/A"}</p>
                                    </div>
                                ) : (
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Tracker Status :</p>
                                        <p className='text-sm  w-40'>Pending</p>
                                    </div>
                                )}

                            </div>
                        </div>
                        {/* Payment Details  */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Payment Details</h1>
                            <div className='p-2 flex'>
                                <div className='' style={{ width: "100%" }}>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Segment :</p>
                                        <p className='text-sm ml w-40'>{data && data.user.segment || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Tracker Charges :</p>
                                        <p className='text-sm  w-40'>{data && data.user.tracker_charges || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Internal Commission :</p>
                                        <p className='text-sm  w-40'>{data && data.user.int_comission || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>External Commission :</p>
                                        <p className='text-sm  w-40'>{data && data.user.ext_comission || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Discount :</p>
                                        <p className='text-sm  w-40'>{data && data.user.discount || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Install Date :</p>
                                        <p className='text-sm  w-40'>{data && data.user.date_of_installation || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Install Location :</p>
                                        <p className='text-sm  w-40'>{data && data.user.install_loc || "N/A"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Sales Person :</p>
                                        <p className='text-sm  w-40'>{data && data.user.sales_person || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Vehicle Status */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Vehicle Status</h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Customer Briefing :</p>
                                    <p className='text-sm  w-60'>{data && data.user.form_status || "Pending"}</p>
                                </div>
                                {data && data.technical !== null ? (
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Technical Briefing :</p>
                                        <p className='text-sm  w-60'>{data && data.technical.technical_status || "Pending"}</p>
                                    </div>
                                ) : (
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Technical Briefing :</p>
                                        <p className='text-sm  w-60'>Pending</p>
                                    </div>
                                )
                                }

                                {data && data.security !== null ? (
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Security Briefing :</p>
                                        <p className='text-sm  w-60'>{data && data.security.security_status || "Pending"}</p>
                                    </div>
                                ) :
                                    (
                                        <div className='flex'>
                                            <p className='text-sm font-bold w-40'>Security Briefing :</p>
                                            <p className='text-sm  w-60'>Pending</p>
                                        </div>
                                    )

                                }

                            </div>
                        </div>
                        {/* Value Addition Services */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Value Addition Services</h1>
                            <div className='p-2 flex'>
                                <div className='w-50'>
                                    <div className='w-60'>
                                        <div className='w-60'>
                                            {data && data.user && typeof data.user.vas_options === 'string' && data.user.vas_options ? (
                                                <ul>
                                                    {data.user.vas_options.split(',').map((option, index) => (
                                                        <li className='text-sm font-bold  my-2' key={index}>{option.trim()} </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>No VAS options available</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Records Table  */}
                        {/* <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Record Remarks</h1>
                            <div class="overflow-x-auto ">
                                <div class="py-2 inline-block min-w-full ">
                                    <div class="overflow-x-auto ">
                                        <table class="min-w-full">
                                            <thead class="border border-black">
                                                <tr>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start border border-black">
                                                        Status
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start border border-black">
                                                        Remark
                                                    </th>
                                                    <th scope="col" class="text-xs font-medium text-gray-900  p-2 text-start border border-black">
                                                        Created AT
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="bg-white border border-black">
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black"> JU-7025</td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                                                        27684
                                                    </td>
                                                    <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                                                        r-black5
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* Special Instruction  */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Specail Instruction</h1>
                            <div className='p-4 flex'>
                                <p className='text-sm font-bold '>Instruction :</p>
                                <p className='text-sm  w-60 ml-3'>{data && data.user.remarks || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
