import React, { useState } from 'react'
import SuperAdminSidebar from '../../Components/SuperAdminSidebar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function VehicleInformation() {
    const { reg_no } = useParams();
    const [data, setData] = useState();
    console.log(reg_no)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchData = async () => {
        try {
            console.log('agaya hn ')
            console.log(reg_no)
            const res = await fetch(`http://127.0.0.1:8000/api/edit/${reg_no}`);
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
                <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll bg'>
                    <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
                    {/*Cleint INformation  */}
                    <div className='m-2 bg-white mt-4'>
                        <h1 className='text-xl font-semibold bg-black text-white p-2'>Cleint Information</h1>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-2'>
                            <div>
                                <h1 className='bg-gray-200 p-2 text-sm font-bold my-2 mr-4 underline'> Primary User Information</h1>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Customer Name:</p>
                                    <p className='text-sm  w-60 '>{data && data.user.customer_name || "NOT Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Father Name:</p>
                                    <p className='text-sm  w-60'>{data && data.user.father_name || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Address </p>
                                    <p className='text-sm  w-60'>{data && data.user.address || "NOt Available"}</p>
                                </div>
                            </div>
                            <div>
                                <h1 className='bg-gray-200 p-2 text-sm font-bold my-2 mr-4 underline'> Contact Information</h1>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Contact 1</p>
                                    <p className='text-sm  w-60'>{data && data.user.mobileno_1 || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Contact 2</p>
                                    <p className='text-sm  w-60'>{data && data.user.mobileno_2 || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Contact 3</p>
                                    <p className='text-sm  w-60'>{data && data.user.mobileno_3 || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>CNIC</p>
                                    <p className='text-sm  w-60'>{data && data.user.cnic || "NOt Available"}</p>
                                </div>
                            </div>
                            <div>
                                <h1 className='bg-gray-200 text-sm font-bold my-2 mr-2 p-2 underline'>Security  Information</h1>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Customer Email:</p>
                                    <p className='text-sm  w-60'>{data && data.technical.security || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Password </p>
                                    <p className='text-sm  w-60'>{data && data.security.password || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Emergency Password: </p>
                                    <p className='text-sm  w-60'>{data && data.security.emergency_pass || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Emergency Person :</p>
                                    <p className='text-sm  w-60'>{data && data.security.emergency_person || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Security Question:</p>
                                    <p className='text-sm  w-60'>{data && data.security.security_ques || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Security Answer:</p>
                                    <p className='text-sm  w-60'>{data && data.security.security_ans || "NOt Available"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-x-3 m-2 mt-2'>
                        {/* Vehicle Information  */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Vehicle Information</h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Registration # :</p>
                                    <p className='text-sm  w-60'>{data && data.user.registeration_no || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Engine #:</p>
                                    <p className='text-sm  w-60'>{data && data.user.engine_no || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Chassis #:</p>
                                    <p className='text-sm  w-60'>{data && data.user.chasis_no || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Make :</p>
                                    <p className='text-sm  w-60'>{data && data.user.make || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Model :</p>
                                    <p className='text-sm  w-60'>{data && data.user.model || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Year :</p>
                                    <p className='text-sm  w-60'>{data && data.user.year || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Color :</p>
                                    <p className='text-sm  w-60'>{data && data.user.color || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Mobilizer :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.mobilizer || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Transmission :</p>
                                    <p className='text-sm  w-60'>{data && data.user.transmission || "NOt Available"}</p>
                                </div>
                            </div>
                        </div>
                        {/* Organiztion Detail */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Oragnization Detail</h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Organization Name :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.hh || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Customer Designation :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.hh || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>NTN #</p>
                                    <p className='text-sm  w-60'>{data && data.user.ntn || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Sale Tax Reg. # </p>
                                    <p className='text-sm  w-60'>{data && data.technical.hh || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Fax # </p>
                                    <p className='text-sm  w-60'>{data && data.technical.hh || "NOt Available"}</p>
                                </div>
                            </div>
                        </div>
                        {/* Technical Information  */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Technical Information</h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Vendor :</p>
                                    <p className='text-sm  w-60'>{data && data.device_information.vendor || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>IMEI #:</p>
                                    <p className='text-sm  w-60'>{data && data.technical.IMEI_no || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>GSM #:</p>
                                    <p className='text-sm  w-60'>{data && data.technical.Gsm_no || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Device ID:</p>
                                    <p className='text-sm  w-60'>{data && data.technical.device_id || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Sim Activation:</p>
                                    <p className='text-sm  w-60'>{data && data.technical.sim || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>GPS Activation :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.Gps_check || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Tavl. Management Id :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.Tavl_mang_id || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Operational Status :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.operational_status || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Webtrack Id :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.webtrack_id || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Webtrack Password :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.webtrack_pass || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>SMS Alert :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.hh || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Speed Alert :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.overspeed_alerts || "NOt Available"}</p>
                                </div>
                            </div>
                        </div>
                        {/* Other Information   */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Other Information  </h1>
                            <div className='p-2'>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Compaign Point allocation :</p>
                                    <p className='text-sm  w-60'>{data && data.user.campaign_point || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Dealer Name :</p>
                                    <p className='text-sm  w-60'>{data && data.user.dealer_name || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Sales Person :</p>
                                    <p className='text-sm  w-60'>{data && data.user.sales_person || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Contact Person :</p>
                                    <p className='text-sm  w-60'>{data && data.user.conatct_person || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Remarks :</p>
                                    <p className='text-sm  w-60'>{data && data.user.remarks || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Tracker Charges :</p>
                                    <p className='text-sm  w-60'>{data && data.user.tracker_charges || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Internal Commission :</p>
                                    <p className='text-sm  w-60'>{data && data.user.int_comission || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>External Commission :</p>
                                    <p className='text-sm  w-60'>{data && data.user.ext_comission || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Discount :</p>
                                    <p className='text-sm  w-60'>{data && data.user.discount || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Tracker Status :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.tracker_status || "NOt Available"}</p>
                                </div>
                            </div>
                        </div>
                        {/* Payment Details  */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Payment Details</h1>
                            <div className='p-2 flex'>
                                <div className='' style={{ width: "50%" }}>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Segment :</p>
                                        <p className='text-sm ml w-40'>{data && data.user.segment || "NOt Available"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Demo Duration :</p>
                                        <p className='text-sm w-40'>{data && data.user.demo_duration || "NOt Available"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Insurance Partner :</p>
                                        <p className='text-sm w-40'>{data && data.user.insurance_partner || "NOt Available"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Dealership :</p>
                                        <p className='text-sm w-40'>{data && data.user.dealership || "NOt Available"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Install Location :</p>
                                        <p className='text-sm  w-40'>{data && data.user.date_of_installation || "NOt Available"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-60'>Sales Person :</p>
                                        <p className='text-sm  w-40'>{data && data.user.sales_person || "NOt Available"}</p>
                                    </div>
                                </div>
                                <div className='' style={{ width: "50%" }}>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Bank Name :</p>
                                        <p className='text-sm ml w-60'>{data && data.technical.date_of_installation || "NOt Available"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Dealer Name :</p>
                                        <p className='text-sm w-60'>{data && data.user.dealer_name || "NOt Available"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Technecian :</p>
                                        <p className='text-sm w-60'>{data && data.technical.technician_name || "NOt Available"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm font-bold w-40'>Contact Person:</p>
                                        <p className='text-sm w-60'>{data && data.user.conatct_person || "NOt Available"}</p>
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
                                    <p className='text-sm  w-60'>{data && data.user.form_status || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Technical Briefing :</p>
                                    <p className='text-sm  w-60'>{data && data.technical.technical_status || "NOt Available"}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm font-bold w-40'>Security Briefing :</p>
                                    <p className='text-sm  w-60'>{data && data.security.security_status || "NOt Available"}</p>
                                </div>
                            </div>
                        </div>
                        {/* Value Addition Services */}
                        <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Value Addition Services</h1>
                            <div className='p-2 flex'>
                                <div className='w-50'>
                                    <div className='w-60'>
                                        <div className='w-60'>
                                            {data && data.vas && data.vas.map((option, index) => (
                                                <div className='flex' key={index}>
                                                    <p className='text-sm font-bold w-60'>{option}:</p>
                                                    <p className='text-sm ml w-40'>{"YES" || "Not Available"}</p>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </div>
                                <div className='w-50'>
                                    {data && data.vas && data.vas.map((option, index) => (
                                        <div className='flex' key={index}>
                                            <p className='text-sm font-bold w-40'>Time :</p>
                                            <p className='text-sm  w-60'>  {new Date(data.user.created_at).toLocaleString("en-US", {
                                                timeZone: "Asia/Karachi",
                                            }) || "Not Available"}</p>
                                        </div>
                                    ))}

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
                        {/* <div className='bg-white mt-3 border border-gray-600'>
                            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Specail Instruction</h1>
                            <div className='p-4'>
                                <p className='text-sm font-bold '>Instruction :</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
