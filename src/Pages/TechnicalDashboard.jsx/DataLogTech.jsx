import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Link, useNavigate } from 'react-router-dom';
import Technical_Sidebar from '../../Components/Technical_Sidebar';


const DataLogTech = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'customer_name', //access nested data with dot notation
        header: 'Customer Name',
        size: 100,
      },
      {
        accessorKey: 'contact_person',
        header: 'Contact Person',
        size: 100,
      },
      {
        accessorKey: 'reg_no', //normal accessorKey
        header: 'Registration',
        size: 80,
      },
      {
        accessorKey: 'nature',
        header: 'Alert',
        size: 100,
      },
      {
        accessorKey: 'contact_no',
        header: 'Contact',
        size: 100,
      },
      {
        accessorKey: 'date',
        header: 'Day/Date',
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
        size: 100,
      },
    ],
    [],
  );

  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/alldatalogs`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res}`);
      }
      console.log(res)
      const response = await res.json();
      console.log("data>>", response);
      setData(response.data);
      setCount(response.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { density: 'compact' },
    muiTableHeadCellProps: {
      sx: {
        fontWeight: 'bold',
        fontSize: '12px',
        backgroundColor: "#9CA3AF",
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
    fetchData();
  }, []);

  return (
    <div className='flex h-[100vh] bg-black'>
      {isSidebarOpen && (
        <div className="sidebar"><Technical_Sidebar /></div>
      )}
      <div className=' rounded-xl m-2 p-2 w-100 overflow-y-scroll bg' style={{ backgroundColor: "#F0F0F0" }}>
        <button onClick={toggleSidebar} className='bg-black'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8 bg-black' /></button>
        <div className=' bg-white mt-4'>
          <h1 className='text-xl font-semibold bg-black text-white p-2 '>Data Log</h1>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>)
};

export default DataLogTech;
