import React, { useEffect, useState } from 'react'
import UpdateProfile from '../../Components/UpdateProfile'
import axios from 'axios';
import Cookies from 'universal-cookie';
import CMD_Sidebar from '../../Components/CMD_Sidebar';

export default function UpdateProfileCMD() {
  const [empid, setEmpid] = useState("");
  const cookies = new Cookies();
  const [data, setData] = useState([])

  const getData = async (e,empId) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/viewprofile`,
        { emp_id: empid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (!res.status === 200) {
        throw new Error(`Failed to fetch data. Status: ${res}`);
      }
      console.log(res)
      console.log("data>>", res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const id = cookies.get('emp_id');
    if (id) { 
      setEmpid(id);
    }
  }, []);
  
  useEffect(() => {
    if (empid) {
      getData(empid); 
    }
  }, [empid])

  
  return (
    <div>
    <div className='flex h-[100vh] bg-black'>
        <CMD_Sidebar />
        <div className='bg-white rounded-xl m-2 p-2 w-100 overflow-y-scroll'>
            <UpdateProfile data={data} />
        </div>
    </div>
</div>
  )
}
