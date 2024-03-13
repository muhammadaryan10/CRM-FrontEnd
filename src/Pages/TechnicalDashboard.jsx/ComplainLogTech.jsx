import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Link, useNavigate } from 'react-router-dom';
import Technical_Sidebar from '../../Components/Technical_Sidebar';
import { faCircleXmark, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nature } from '@mui/icons-material';




const ComplainLogTech = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [count, setCount] = useState([]);
    const [view, setView] = useState(false)
    const [selectedComplain, setSelectedComplain] = useState([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/allcomplain`);
            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res}`);
            }

            const response = await res.json();
            console.log("data>>", response.all_complaints);
            setData(response.all_complaints);
            setCount(response.count)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleViewClick = (complain) => {
        console.log("selectedComplain", selectedComplain)
        setSelectedComplain(complain.actions);
        setView(true);
    };

    const handleClosePopup = () => {
        setSelectedComplain([]);
        setView(false);
    };

    const getResolvedBy = (complain) => {
        // if (complain.actions && complain.actions.length == 1) {
        //     return complain.actions[0].resolved_by
        // }
        if (complain.actions && complain.actions.length > 0) {
            // setSelectedComplain(complain.actions);
            return (
                <>
                    {complain.actions[0].resolved_by}
                    {/* console.log(selectedComplain) */}
                    <button onClick={(e) => handleViewClick(complain)} className="font-bold m-2 rounded">
                        <FontAwesomeIcon className='text-black ml-3' icon={faEye} />
                    </button>
                </>
            );
        } else {
            return 'Pending';
        }
    };

    const getResolvedByDate = (complain) => {
        if (complain.actions && complain.actions.length > 0) {
            return complain.actions[0].date;
        } else {
            return 'Pending';
        }
    };

    const getResolvedByTime = (complain) => {
        if (complain.actions && complain.actions.length > 0) {
            return complain.actions[0].time;
        } else {
            return 'Pending';
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'ticker',
                header: 'Ticker',
                size: 80,
            },
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
                accessorKey: 'complain_nature',
                header: 'Complain',
                size: 100,
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
                accessorKey: 'respresentative',
                header: 'Represtative',
                size: 100,
            },
            {
                accessorKey: 'resolved_by',
                header: 'Resolved By',
                size: 100,
                Cell: ({ renderedCellValue, row }) => (
                    <p className='' >
                        {getResolvedBy(row.original)}
                    </p>

                ),
            },
            // {
            //     accessorKey: 'Date',
            //     header: 'Resolved Date',
            //     size: 100,
            //     Cell: ({ renderedCellValue, row }) => (
            //         <p className='' >
            //             {getResolvedByDate(row.original)}
            //         </p>

            //     ),
            // },
            // {
            //     accessorKey: 'Time',
            //     header: 'Resolved Time',
            //     size: 100,
            //     Cell: ({ renderedCellValue, row }) => (
            //         <p className='' >
            //             {getResolvedByTime(row.original)}
            //         </p>

            //     ),
            // },
            {
                accessorKey: 'Status',
                header: 'Status',
                size: 80,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
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
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
                console.info(event, row.original);
            }
        }),
        muiTableBodyCellProps: {
            sx: {
                fontSize: "11px",
                borderRight: '2px solid #e0e0e0', //add a border between columns
            },
        }
    });


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='flex h-[100vh] bg-black'>
            {isSidebarOpen && (
                <div className="sidebar"><Technical_Sidebar /></div>
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
                                        {selectedComplain.length > 0 && (
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
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <div className=' rounded-xl m-2 p-2 w-100 overflow-y-scroll ' style={{ backgroundColor: "#F0F0F0" }}>
                <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
                <div className=' bg-white mt-4'>
                    <h1 className='text-xl font-semibold bg-black text-white p-2 '>Complain Log</h1>
                    <MaterialReactTable table={table} />
                </div>
            </div>
        </div>)
};

export default ComplainLogTech;
