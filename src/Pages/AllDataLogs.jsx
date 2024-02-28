import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AllDataLogs = () => {

 
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
  const [count,setCount ]=useState();
  const { registeration_no } = useParams();

  const fetchData = async () => {
      try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reg_datalogs/${registeration_no}`);
          // if (!res.ok) {
          //     throw new Error(`Failed to fetch data. Status: ${res}`);
          // }
          console.log(res)
          const response = await res.json();
          console.log("data>>", response);
          setData(response.datalogs);
          setCount(response.count);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiTableHeadCellProps: {
      sx: {
        fontWeight: 'bold',
        fontSize: '12px',
        backgroundColor:"#9CA3AF",
        color:"black"
      },
    },
    muiTableBodyProps:{
      sx:{
          fontSize:"8px"
      }
    },
    muiTableBodyCellProps: {
      sx: {
          fontSize:"11px",
        borderRight: '2px solid #e0e0e0', //add a border between columns
      },
  }
  });

  useEffect(() => {
    fetchData();
}, []);

  return (
      <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll bg'>
       <div className='flex py-3 my-3 justify-between'> <h1 className='text-4xl font-bold text-uppercase text-black'> Data Log  </h1> </div>
        <MaterialReactTable table={table} />
      </div>
    )
};

export default AllDataLogs ;
