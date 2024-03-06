import React, { useEffect, useMemo, useState } from 'react'
import SuperAdminSidebar from '../../Components/SuperAdminSidebar';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';


export default function RedoLogCRO({ data }) {
  const [tableData, setTableData] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'customer_name', //access nested data with dot notation
        header: 'Customer Name',
        size: 100,
      },
      {
        accessorKey: 'reg_no',
        header: 'Registration #',
        size: 90,
      },
      {
        accessorKey: 'old_device',
        header: 'Old Device',
        size: 100,
      },
      {
        accessorKey: 'new_device',
        header: 'New Device',
        size: 80,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 80,
      },
      {
        accessorKey: 'time',
        header: 'Time',
        size: 80,
      },
      {
        accessorKey: 'remarks',
        header: 'Remarks',
        size: 250,
      },
      {
        accessorKey: 'representative',
        header: 'Represtative',
        size: 100,
      },
      {
        accessorKey: 'technician',
        header: 'Technichain',
        size: 100,
      },
      {
        accessorKey: 'charges',
        header: 'Charges',
        size: 80,
      },
    ],
    [],
  );


  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    initialState: { density: 'compact' },
    muiTableHeadCellProps: {
      sx: {
        fontWeight: 'bold',
        fontSize: '12px',
        border: '1px solid #e0e0e0',
        color: "black"
      },
    },
    muiTableBodyProps: {
      sx: {
        fontSize: "8px"
      }
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "11px",
        borderRight: '2px solid #e0e0e0', //add a border between columns
      },
    }
  });

  useEffect(() => {
    if (data && data.redo) {
      console.log("New data received:", data.redo); // Log the new data received
      setTableData(data.redo);
    }
  }, [data]);

  return (
    <div>
      <div className='flex h-100'>
        <div className='bg-gray-200 rounded-xl m-2 p-2 mt-0 pt-0  w-100'>
          {/* Redo Logs  */}
          <div className='m-2 bg-white mt-4'>
            <h1 className='text-xl font-semibold bg-black text-white p-2 '> Redo Log</h1>
            <MaterialReactTable table={table} />
          </div>
          <div className='bg-white m-2 mt-4'>
            <h1 className='text-xl font-semibold bg-black text-white p-2 '>Vehicle Information</h1>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-x-auto m-2 mb-4">
                    <table className="min-w-full">
                      <thead className="bg-gray-300 border">
                        <tr>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Registration #
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Chassis #
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Engine #
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Make / Model
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Color
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Year
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Transmission
                          </th>
                          <th scope="col" className="text-xs font-medium text-gray-900  p-2 text-start border-2 border-gray-200">
                            Mobilizer
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border">
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">{data && data.data.user.registeration_no || " "}</td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.user.chasis_no || " "}
                          </td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.user.engine_no || " "}
                          </td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.user.make || " "} / {data && data.data.user.model || ""}
                          </td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">{data && data.data.user.color || " "}</td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.user.year || " "}
                          </td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.user.transmission || " "}
                          </td>
                          <td className="text-xs text-gray-900 font-light p-2  whitespace-nowrap border border-gray-200">
                            {data && data.data.technical.mobilizer || " "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* INformation  */}
          <div className='m-2 bg-white mt-4'>
            <h1 className='text-xl font-semibold bg-black text-white p-2'>Cleint Information</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-2'>
              <div>
                <h1 className='bg-gray-200 p-2 text-sm font-bold my-2 mr-4 underline'> Primary User Information</h1>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Customer Name:</p>
                  <p className='text-sm  w-60 '>{data && data.data.user.customer_name || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Father Name:</p>
                  <p className='text-sm  w-60'>{data && data.data.user.father_name || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Address </p>
                  <p className='text-sm  w-60'>{data && data.data.user.address || " "}</p>
                </div>
              </div>
              <div>
                <h1 className='bg-gray-200 p-2 text-sm font-bold my-2 mr-4 underline'> Contact Information</h1>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Contact 1</p>
                  <p className='text-sm  w-60'>{data && data.data.user.mobileno_1 || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Contact 2</p>
                  <p className='text-sm  w-60'>{data && data.data.user.mobileno_2 || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Contact 3</p>
                  <p className='text-sm  w-60'>{data && data.data.user.mobileno_3 || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>CNIC</p>
                  <p className='text-sm  w-60'>{data && data.data.user.cnic || " "}</p>
                </div>
              </div>
              <div>
                <h1 className='bg-gray-200 text-sm font-bold my-2 mr-2 p-2 underline'>Security  Information</h1>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Customer Email:</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.security || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Password </p>
                  <p className='text-sm  w-60'>{data && data.data.security.password || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Emergency Password: </p>
                  <p className='text-sm  w-60'>{data && data.data.security.emergency_pass || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Emergency Person :</p>
                  <p className='text-sm  w-60'>{data && data.data.security.emergency_person || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Security Question:</p>
                  <p className='text-sm  w-60'>{data && data.data.security.security_ques || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Security Answer:</p>
                  <p className='text-sm  w-60'>{data && data.data.security.security_ans || " "}</p>
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
                  <p className='text-sm  w-60'>{data && data.data.user.registeration_no || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Engine #:</p>
                  <p className='text-sm  w-60'>{data && data.data.user.engine_no || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Chassis #:</p>
                  <p className='text-sm  w-60'>{data && data.data.user.chasis_no || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Make :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.make || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Model :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.model || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Year :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.year || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Color :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.color || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Mobilizer :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.mobilizer || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Transmission :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.transmission || " "}</p>
                </div>
              </div>
            </div>
            {/* Technical Information  */}
            <div className='bg-white mt-3 border border-gray-600'>
              <h1 className='text-xl font-semibold bg-black text-white p-2 '>Technical Information</h1>
              <div className='p-2'>

                <div className='flex'>
                  <p className='text-sm font-bold w-40'>IMEI #:</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.IMEI_no || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>GSM #:</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.Gsm_no || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Device ID:</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.device_id || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Sim Activation:</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.sim || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>GPS Activation :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.Gps_check || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Tavl. Management Id :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.Tavl_mang_id || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Operational Status :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.operational_status || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Webtrack Id :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.webtrack_id || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Webtrack Password :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.webtrack_pass || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>SMS Alert :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.hh || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Speed Alert :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.overspeed_alerts || " "}</p>
                </div>
              </div>
            </div>
            {/* Other Information   */}
            <div className='bg-white mt-3 border border-gray-600'>
              <h1 className='text-xl font-semibold bg-black text-white p-2 '>Other Information  </h1>
              <div className='p-2'>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Compaign Point allocation :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.campaign_point || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Dealer Name :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.dealer_name || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Sales Person :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.sales_person || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Contact Person :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.conatct_person || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Remarks :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.remarks || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Tracker Charges :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.tracker_charges || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Internal Commission :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.int_comission || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>External Commission :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.ext_comission || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Discount :</p>
                  <p className='text-sm  w-60'>{data && data.data.user.discount || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Tracker Status :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.tracker_status || " "}</p>
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
                    <p className='text-sm ml w-40'>{data && data.data.user.segment || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Demo Duration :</p>
                    <p className='text-sm w-40'>{data && data.data.user.demo_duration || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Insurance Partner :</p>
                    <p className='text-sm w-40'>{data && data.data.user.insurance_partner || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Dealership :</p>
                    <p className='text-sm w-40'>{data && data.data.user.dealership || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Install Location :</p>
                    <p className='text-sm  w-40'>{data && data.data.user.date_of_installation || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-60'>Sales Person :</p>
                    <p className='text-sm  w-40'>{data && data.data.user.sales_person || " "}</p>
                  </div>
                </div>
                <div className='' style={{ width: "50%" }}>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Bank Name :</p>
                    <p className='text-sm ml w-60'>{data && data.data.technical.date_of_installation || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Dealer Name :</p>
                    <p className='text-sm w-60'>{data && data.data.user.dealer_name || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Technecian :</p>
                    <p className='text-sm w-60'>{data && data.data.technical.technician_name || " "}</p>
                  </div>
                  <div className='flex'>
                    <p className='text-sm font-bold w-40'>Contact Person:</p>
                    <p className='text-sm w-60'>{data && data.data.user.conatct_person || " "}</p>
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
                  <p className='text-sm  w-60'>{data && data.data.user.form_status || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Technical Briefing :</p>
                  <p className='text-sm  w-60'>{data && data.data.technical.technical_status || " "}</p>
                </div>
                <div className='flex'>
                  <p className='text-sm font-bold w-40'>Security Briefing :</p>
                  <p className='text-sm  w-60'>{data && data.data.security.security_status || " "}</p>
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
                          <p className='text-sm ml w-40'>{"YES" || " "}</p>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
                <div className='w-50'>
                  {data && data.vas && data.vas.map((option, index) => (
                    <div className='flex' key={index}>
                      <p className='text-sm font-bold w-40'>Time :</p>
                      <p className='text-sm  w-60'>  {new Date(data.data.user.created_at).toLocaleString("en-US", {
                        timeZone: "Asia/Karachi",
                      }) || " "}</p>
                    </div>
                  ))}

                </div>
              </div>
            </div>
            {/* Special Instruction  */}
            <div className='bg-white mt-3 border border-gray-600'>
              <h1 className='text-xl font-semibold bg-black text-white p-2 '>Specail Instruction</h1>
              <div className='p-4'>
                <p className='text-sm font-bold '>Instruction :</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
