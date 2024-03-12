import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import SuperAdminSidebar from '../../Components/SuperAdminSidebar';
import { useEffect } from 'react';

const AllEmployeesSuperAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/allemp`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res}`);
      }

      const response = await res.json();
      console.log("data>>", response.data);
      setData(response.data);
      setCount(response.count)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'emp_id',
        header: 'Employee ID',
        size: 50,
      },
      {
        accessorKey: 'emp_name',
        header: 'Employee Name',
        size: 200,
      },
      {
        accessorKey: 'em_loginid',
        header: 'Login Id',
        size: 150,
      },
      {
        accessorKey: 'contact',
        header: 'Contact',
        size: 200,
      },
      {
        accessorKey: 'cnic',
        header: 'CNIC',
        size: 200,
      },
      {
        accessorKey: 'designation',
        header: 'Desigination',
        size: 150,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 100,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    initialState: { density: 'compact' },
    data,
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
        fontSize: "10px"
      }
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "13px",
        borderRight: '2px solid #e0e0e0', //add a border between columns
      },
    },
    muiSkeletonProps: {
      animation: 'wave',
    },
    muiLinearProgressProps: {
      color: 'secondary',
    },
  });

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className='flex h-[100vh] bg-black'>
      {isSidebarOpen && (
        <div className="sidebar"><SuperAdminSidebar /></div>
      )}
      <div className='rounded-xl m-2 p-2 w-100 overflow-y-scroll' style={{ backgroundColor: "#F0EFEF" }}>
        <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
        {/* <h1 className='text-4xl font-bold text-uppercase text-black py-3 my-3'></h1>
        <h5 className='text-2xl font-bold text-uppercase text-black py-3 my-3'>Total Records : {count}</h5>
        <MaterialReactTable table={table} /> */}
        <div className=' bg-white mt-4'>
          <h1 className='text-xl font-semibold bg-black text-white p-2 '>All Employes</h1>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>)
};

export default AllEmployeesSuperAdmin;
