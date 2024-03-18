import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import Technical_Sidebar from '../../Components/Technical_Sidebar';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import PrintIcon from '@mui/icons-material/Print';

const RedoTech = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [count, setCount] = useState();
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/all_redo_info`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res}`);
      }

      const response = await res.json();
      console.log("data>>", response.data);
      setData(response.data);
      setCount(response.total_count)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
        size: 100,
      },
      {
        accessorKey: 'old_device', //normal accessorKey
        header: 'Old Device',
        size: 100,
      },
      {
        accessorKey: 'new_device',
        header: 'New Device',
        size: 100,
      },
      {
        accessorKey: 'old_sim', //normal accessorKey
        header: 'Old Sim',
        size: 100,
      },
      {
        accessorKey: 'new_sim',
        header: 'New Sim',
        size: 100,
      },
      {
        accessorKey: 'old_imei', //normal accessorKey
        header: 'Old IMEI',
        size: 100,
      },
      {
        accessorKey: 'new_imei',
        header: 'New IMEI',
        size: 100,
      },
      {
        accessorKey: 'harness_change',
        header: 'Harness',
        size: 100,
      },
      {
        accessorKey: 'backupbattery_change',
        header: 'Backup Battery',
        size: 100,
      },
      {
        accessorKey: 'technician',
        header: 'Technicain',
        size: 100,
      },
      {
        accessorKey: 'charges',
        header: 'Charges',
        size: 100,
      },
      {
        accessorKey: 'remarks',
        header: 'Reason',
        size: 100,
      },
      {
        accessorKey: 'redo_date',
        header: 'Redo Date',
        size: 100,
      },
      {
        accessorKey: 'redo_time',
        header: 'Redo Time',
        size: 100,
      },
      {
        accessorKey: 'representative',
        header: 'Representative',
        size: 100,
      },
    ],
    [],
  );


  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };


  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    initialState: { density: 'compact' }, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiTableHeadCellProps: {
      //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        fontWeight: 'bold',
        fontSize: '12px',
        backgroundColor: "#9CA3AF",
        color: "black"
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      // onClick: (event) => {
      //   navigate(`/superAdmin/vehiclesInfo/${row.id}`)
      //   console.info(event, row.id);
      // },
      // sx: {
      //   cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      // },
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
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          width: "100%",
          // padding: '5px',
        }}
      >
        {/* <h1 className='font-semibold'>Redo Information</h1> */}
        <IconButton
          onClick={() => {
            handleExportData();
          }}
        >
          <PrintIcon />
        </IconButton>
      </Box>
    ),
  });


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex h-[100vh] bg-black'>
      {isSidebarOpen && (
        <div className="sidebar"><Technical_Sidebar /></div>
      )}
      <div className=' rounded-xl m-2 p-2 w-100 overflow-y-scroll ' style={{ backgroundColor: "#F0F0F0" }}>
        <button onClick={toggleSidebar}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC' className='h-8 w-8' /></button>
        {/* <h1 className='text-4xl font-bold text-uppercase text-black py-3 mt-3'> Information</h1> */}
        <div className=' bg-white mt-4'>
          <h1 className='text-xl font-semibold bg-black text-white p-2 '>Redo Information</h1>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>)
};  

export default RedoTech;
