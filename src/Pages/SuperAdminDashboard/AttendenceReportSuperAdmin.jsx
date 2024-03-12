import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import SuperAdminSidebar from '../../Components/SuperAdminSidebar';


const AttendenceReportSuperAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState([]);

  const isStillLoggedIn = (checkoutTime) => {
    return checkoutTime === 'still   logeed in';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'emp_id', //access nested data with dot notation
        header: 'Id',
        size: 40,
      },
      {
        accessorKey: 'emp_name',
        header: 'Employee Name',
        size: 100,
      },
      {
        accessorKey: 'designation', //normal accessorKey
        header: 'Desigination',
        size: 100,
      },
      {
        accessorKey: 'conatct_no',
        header: 'Contact No',
        size: 100,
      },
      {
        accessorKey: 'cnic_no',
        header: 'CNIC',
        size: 100,
      },
      {
        accessorKey: 'checkin_date',
        header: 'Check In Date',
        size: 100,
      },
      {
        accessorKey: 'checkin_time',
        header: 'Check In Time',
        size: 100,
      },
      {
        accessorKey: 'checkout_date',
        header: 'Check Out Date',
        size: 100,
        Cell: ({ row }) => (
          <p className="">
            {row.original.checkout_time === "still logeed in" ? "Still Logged In" : row.original.checkout_date}
          </p>),
      },
      {
        accessorKey: 'checkout_time',
        header: 'Check out Time',
        size: 100,
      },
      // {
      //   accessorKey: 'checkout_time',
      //   header: 'Hours',
      //   size: 100,
      // },
      {
        accessorKey: 'status', //access nested data with dot notation
        header: 'Status',
        size: 40,
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
    enableSorting: false, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiTableHeadCellProps: {
      //simple styling with the `sx` prop, works just like a style prop in this example
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

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getallattend`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res}`);
      }
      const response = await res.json();
      console.log("data>>", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex h-[100vh] bg-black'>
      {isSidebarOpen && (
        <div className="sidebar"><SuperAdminSidebar /></div>
      )}
      <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll' style={{ backgroundColor: "#F0EFEF" }}>
        <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
        {/* <h1 className='text-4xl font-bold text-uppercase text-black py-3 my-3'> </h1>
        <MaterialReactTable table={table} /> */}
        <div className=' bg-white mt-4'>
          <h1 className='text-xl font-semibold bg-black text-white p-2 '>Daily Attendence Report</h1>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>)
};


export default AttendenceReportSuperAdmin;
