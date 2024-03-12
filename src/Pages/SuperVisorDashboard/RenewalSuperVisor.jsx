import React, { useEffect, useMemo, useState } from 'react'
import SuperVisorSidebar from '../../Components/SuperVisorSidebar'
import { Link } from 'react-router-dom';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faWallet, faEye } from '@fortawesome/free-solid-svg-icons'

export default function RenewalSuperVisor() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [data, setData] = useState([]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'segment',
                header: 'Segment',
                size: 80,
            },
            {
                accessorKey: 'registeration_no',
                header: 'Registration #',
                size: 90,
            },
            {
                accessorKey: 'customer_name', //access nested data with dot notation
                header: 'Customer Name',
                size: 100,
            },
            {
                accessorKey: 'DOI',
                header: 'DOI',
                size: 100,
            },
            {
                accessorKey: 'contact_no',
                header: 'Contact',
                size: 80,
            },
            {
                accessorKey: 'date',
                header: 'DOR',
                size: 80,
            },
            {
                accessorKey: 'Month',
                header: 'Month',
                size: 80,
            },
            {
                accessorKey: 'sales_person',
                header: 'Sales Person',
                size: 100,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 100,
            },
            {
                accessorKey: 'Status',
                header: 'Action',
                size: 80,
                Cell: ({ row }) => {
                    if (row.original.status === 'paid') {
                        // Show 2 links if status is 'paid'
                        return (
                            <div>

                                {/* <Link to={`/sv/view/${row.original.registeration_no}`} target='blank'>
                                    <FontAwesomeIcon className='mx-2 h-4' icon={faEye} />
                                </Link> */}

                            </div>
                        );
                    } else {
                        // Show 3 links for other statuses
                        return (
                            <div>
                                <Link to={`/sv/addPayment/${row.original.registeration_no}`} target='blank'>
                                    <FontAwesomeIcon className='mx-2 h-4' icon={faWallet} />
                                </Link>
                                {/* <Link to={`/sv/view/${row.original.registeration_no}`} target='blank'>
                                    <FontAwesomeIcon className='mx-2 h-4' icon={faEye} />
                                </Link> */}
                                {/* <Link to={`/sv/updaterenewal/${row.original.registeration_no}`} target='blank'>
                                    <FontAwesomeIcon icon={faPenToSquare} className='mx-2 h-4' />
                                </Link> */}
                            </div>
                        );
                    }
                },
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnActions: false,
        enableColumnFilters: false,
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

    const getUserInfo = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getrenewals`);
            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res}`);
            }

            const response = await res.json();
            console.log("data>>", response);
            setData(response.renewalDetails)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div>
            <div className='flex h-[100vh] bg-black pt-0 mt-0'>
                {isSidebarOpen && (
                    <div className="sidebar"><SuperVisorSidebar /></div>
                )}
                <div className='rounded-xl m-2 p-2 w-100 overflow-y-scroll' style={{ backgroundColor: "#F0F0F0" }}>
                    <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>

                    <div className=' bg-white mt-4'>
                        <h1 className='text-xl font-semibold bg-black text-white p-2 '> Renwal Log</h1>
                        <MaterialReactTable table={table} />
                    </div>
                </div>
            </div>
        </div>
    )
}
