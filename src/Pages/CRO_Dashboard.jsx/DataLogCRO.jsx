import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Link } from 'react-router-dom';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];

const DataLogCRO = () => {

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'Customer Name',
        size: 100,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Contact Person',
        size: 100,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Registration',
        size: 100,
      },
      {
        accessorKey: 'Contact No',
        header: 'Alert',
        size: 100,
      },
      {
        accessorKey: 'CNIC',
        header: 'Contact',
        size: 100,
      },
      {
        accessorKey: 'Role',
        header: 'Day/Date',
        size: 100,
      },
      {
        accessorKey: 'Role',
        header: 'Remarks',
        size: 100,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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

  return (
    <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll bg'>
      <div className='flex py-3 my-3 justify-between'> <h1 className='text-4xl font-bold text-uppercase text-black'> Data Log Entry </h1> <Link className='text-xl theme_btn_md font-bold text-uppercase'>Add Data log </Link></div>
      <MaterialReactTable table={table} />
    </div>
  )
};

export default DataLogCRO;
