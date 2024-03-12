import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Link, useNavigate } from 'react-router-dom';
import SuperVisorSidebar from '../../Components/SuperVisorSidebar';
import { MenuItem } from '@mui/material';



const AllUserSuperVisor = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [data, setData] = useState([]);
    const [count, setCount] = useState();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/completedetails`);
            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res}`);
            }
            const response = await res.json();
            console.log("data>>", response.data);
            setData(response.data);
            setCount(response.count);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'customer_name', //access nested data with dot notation
                header: 'Customer Name',
                size: 100,
            },
            {
                accessorKey: 'registeration_no',
                header: 'Registration #',
                size: 100,
                Cell: ({ renderedCellValue, row }) => (
                    <Link className='text-blue-500 underline' to={`/sv/userInfo/${row.original.registeration_no}`}>
                        {renderedCellValue}
                    </Link>
                ),
            },
            {
                accessorKey: 'chasis_no', //normal accessorKey
                header: 'Chassis #',
                size: 90,
            },
            {
                accessorKey: 'engine_no',
                header: 'Engine #',
                size: 80,
            },
            {
                accessorKey: 'make',
                header: 'Make',
                size: 80,
            },
            {
                accessorKey: 'model',
                header: 'Model',
                size: 80,
            },
            {
                accessorKey: 'cnic',
                header: 'CNIC',
                size: 100,
            },
            {
                accessorKey: 'sales_person',
                header: 'Sales Person',
                size: 100,
            },
            {
                accessorKey: 'state',
                header: 'Status',
                size: 100,
                Cell: ({ row }) => (
                    <p className='' >
                        {getStatus(row.original)}
                    </p>
                )
            },

        ],
        [],
    );

    const getStatus = (complain) => {
        if (complain.status && complain.status) {
            return complain.status.tracker_status;
        } else {
            return 'InActive';
        }
    };

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnActions: false,
        enableColumnFilters: false,
        enableSorting: false,
        muiTableHeadCellProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '12px',
                border: '1px solid #e0e0e0',
                color: "black"
            },
        },
        muiTableBodyRowProps: ({ row }) => ({
            sx: {
                cursor: 'pointer', //you might want to change the cursor too when adding an onClick
            },
        }),
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
        fetchData();
    }, []);

    return (
        <div className='flex h-[100vh] bg-black'>
            {isSidebarOpen && (
                <div className="sidebar"><SuperVisorSidebar /></div>
            )}
            <div className=' rounded-xl m-2 p-2 w-100 overflow-y-scroll ' style={{ backgroundColor: "#F0F0F0" }}>
                <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
                {/* <h1 className='text-4xl font-bold text-uppercase text-black py-3 mt-3'></h1>
                <span className='text-xl font-bold  text-black '>Total Records : </span><sapn className="text-lg">{count}</sapn>
                <div className=' my-3'> <MaterialReactTable table={table} /> </div> */}
                <div className=' bg-white mt-4'>
                    <h1 className='text-xl font-semibold bg-black text-white p-2 '>Vehicle Information</h1>
                    <MaterialReactTable table={table} />
                </div>
            </div>
        </div>)
};

export default AllUserSuperVisor;
