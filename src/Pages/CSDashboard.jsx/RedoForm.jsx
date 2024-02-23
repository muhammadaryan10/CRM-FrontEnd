import React, { useState } from 'react'
import CS_Sidebar from '../../Components/CS_Sidebar'

export default function RedoForm() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
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
          <input className='w-96 mx-3 p-2 custum_input' placeholder='Enter Registration , Engine or  Chachis Number ' />
          <button className='theme_btn_md mx-4 rounded '>Search</button>
        </div>
        <div className='flex justify-end w-100'>
        <button className="theme_btn_md rounded-0">Print</button>
        </div>
        <div className='space-y-3 w-100 lg:max-w-xl md:max-w-lg ' >
          <h1 className="text-lg font-bold text-center mt-4 text-white bg-black p-1 w-100">NR Redo Form</h1>
          <div className='flex w-100 text-xs'>
            <p style={{ width: "40%" }} className='font-bold'>Name of Client :</p><p style={{ width: "60%" }}>Testsss tghvhjhjvgj hsghdgs uhjghsbb bhjkghjks esdfdefedgfedg dgdgvdfv  </p>
          </div>
          <div className='flex w-100 text-xs'>
            <p style={{ width: "40%" }} className='font-bold'>CNIC# :</p><p style={{ width: "60%" }}>Test</p>
          </div>
          <div className='flex w-100 text-xs'>
            <p style={{ width: "40%" }} className='font-bold'>Address :</p><p style={{ width: "60%" }}>Test</p>
          </div>
          <div className='flex w-100 text-xs'>
            <p style={{ width: "40%" }} className='font-bold'>Contact# :</p><p style={{ width: "60%" }}>Test</p>
          </div>
          <div className='flex w-100 text-xs'>
            <p style={{ width: "40%" }} className='font-bold'>Email :</p><p style={{ width: "60%" }}>Test</p>
          </div>
          <div className='flex w-100 text-xs'>
            <p style={{ width: "40%" }} className='font-bold'>Secondary User :</p><p style={{ width: "60%" }}>Test</p>
          </div>
          <div className='flex w-100 text-xs'>
            <p style={{ width: "40%" }} className='font-bold'>Contact# :</p><p style={{ width: "60%" }}>Test</p>
          </div>
          <div className='flex w-100 text-xs'>
            <p style={{ width: "40%" }} className='font-bold'>Location :</p><p style={{ width: "60%" }}>Test</p>
          </div>
          <h5 className='text-center text-md font-bold mt-4'>Vehicle Details</h5>
        </div>
        <div class=" w-100 lg:max-w-xl md:max-w-lg">
          <div class="overflow-x-auto">
            <div class="py-2 inline-block min-w-full my-3">
              <div class="overflow-x-auto ">
                <table class="min-w-full">
                  <thead class="">
                    <tr>
                      <th scope="col" class="text-xs font-medium   p-2 text-start border border-black">
                      S.No
                      </th>
                      <th scope="col" class="text-xs font-medium   p-2 text-start border border-black">
                      Reg#
                      </th>
                      <th scope="col" class="text-xs font-medium   p-2 text-start border border-black">
                      Eng#
                      </th>
                      <th scope="col" class="text-xs font-medium   p-2 text-start border border-black">
                      Cha#
                      </th>
                      <th scope="col" class="text-xs font-medium   p-2 text-start border border-black">
                      Make/Model
                      </th>
                      <th scope="col" class="text-xs font-medium   p-2 text-start border border-black">
                      Year
                      </th>
                      <th scope="col" class="text-xs font-medium   p-2 text-start border border-black">
                      Color
                      </th>
                      <th scope="col" class="text-xs font-medium   p-2 text-start border border-black">
                      DOI
                      </th>
                      <th scope="col" class="text-xs font-medium   p-2 text-start border border-black">
                      CC
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border">
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black"> JU-7025</td>
                       <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black"> JU-7025</td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        27684
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        O63705
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        Hino Pak /  Truck
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">Blue</td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        1995
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        manual
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        no
                      </td>
                    </tr>
                    <tr class="bg-white border">
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black"> JU-7025</td>
                       <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black"> JU-7025</td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        27684
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        O63705
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        Hino Pak /  Truck
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">Blue</td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        1995
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        manual
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        no
                      </td>
                    </tr>
                    <tr class="bg-white border">
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black"> JU-7025</td>
                       <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black"> JU-7025</td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        27684
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        O63705
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        Hino Pak /  Truck
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">Blue</td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        1995
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        manual
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        no
                      </td>
                    </tr>
                    <tr class="bg-white border">
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black"> JU-7025</td>
                       <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black"> JU-7025</td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        27684
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        O63705
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        Hino Pak /  Truck
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">Blue</td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        1995
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        manual
                      </td>
                      <td class="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-black">
                        no
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
  )
}
