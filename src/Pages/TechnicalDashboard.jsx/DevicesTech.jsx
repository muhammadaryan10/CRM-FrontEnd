import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import Technical_Sidebar from '../../Components/Technical_Sidebar';

const DevicesTech = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const [data, setData] = useState([])
  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/all_info`);
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
  


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'device', //access nested data with dot notation
        header: 'Device',
        size: 80,

      },
      {
        accessorKey: 'IMEI_no',
        header: 'IMEI',
        size: 100,
      },
      {
        accessorKey: 'sim_no', //normal accessorKey
        header: 'Sim #',
        size: 100,
      }, 
      {
        accessorKey: 'registeration_no',
        header: 'Registration #',
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <p className=''>
            {row.original.tracker_status === 'Removed' ? "" : row.original.registeration_no}
          </p>
        ),
      },
      {
        accessorKey: 'eng_no',
        header: 'Engine #',
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <p className=''>
            {row.original.tracker_status === 'Removed' ? "" : row.original.eng_no}
          </p>
        ),
      },
      // {
      //   accessorKey: 'chasis_no',
      //   header: 'Chassis #',
      //   size: 100,
      // },
      {
        accessorKey: 'customer_name',
        header: 'Custumer Name',
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <p className=''>
            {row.original.tracker_status === 'Removed' ? "" : row.original.customer_name}
          </p>
        ),
      },
      {
        accessorKey: 'contact',
        header: 'Contact',
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <p className=''>
            {row.original.tracker_status === 'Removed' ? "" : row.original.contact}
          </p>
        ),
      },
      {
        accessorKey: 'location',
        header: 'Location',
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <p className=''>
            {row.original.tracker_status === 'Removed' ? "" : row.original.location}
          </p>
        ),
      },
      {
        accessorKey: 'DOI',
        header: 'DOI',
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <p className=''>
            {row.original.tracker_status === 'Removed' ? "" : row.original.DOI}
          </p>
        ),
      },
      {
        accessorKey: 'technician_name',
        header: 'Technicain',
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <p className=''>
            {row.original.tracker_status === 'Removed' ? "" : row.original.technician_name}
          </p>
        ),
      },
      {
        accessorKey: 'segment',
        header: 'Segment',
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <p className=''>
            {row.original.tracker_status === 'Removed' ? "" : row.original.segment}
          </p>
        ),
      },
      // {
      //   accessorKey: 'Status',
      //   header: 'Segment',
      //   size: 100,
      // },
      {
        accessorKey: 'device_status',
        header: 'Device Status',
        size: 100,    
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
      <div className=' rounded-xl m-2 p-2 w-100 overflow-y-scroll' style={{ backgroundColor: "#F0F0F0" }}>
        <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
        <h1 className='text-4xl font-bold text-uppercase text-black py-3 mt-3'>Device Information</h1>
        <div className=' my-3'> <MaterialReactTable table={table} /> </div>
      </div>
    </div>)
};

export default DevicesTech;
