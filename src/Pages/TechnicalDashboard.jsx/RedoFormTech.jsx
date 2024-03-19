import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';

export default function RedoFormTech() {
  const [apiResult, setApiResult] = useState([]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [deviceFeild, setDeviceFeild] = useState(false)
  const [simFeild, setSimFeild] = useState(false)
  const [sims, setSims] = useState([])
  const [isListOpen1, setIsListOpen1] = useState(false);
  const [selectedSim, setSelectedSim] = useState("")

  const [createRedo, setCreateRedo] = useState({
    client_id: "",
    complain_id: "",
    customer_name: "",
    reg_no: "",
    old_device: "",
    new_device: "",
    old_imei: "",
    new_imei: "",
    old_sim: "",
    new_sim: "",
    eng_no: "",
    chasis_no: "",
    contact_no: "",
    representative: "",
    technician: "",
    charges: "",
    sales_person: "",
    harness_change: "",
    backupbattery_change: "",
    remarks: "",
    install_loc: "",
    install_date: "",
    nature: "",
    device_id:""
  });

  const cookies = new Cookies();
  const [search_term, setSearch_term] = useState("")
  const [empName, setEmpName] = useState("") // Corrected initialization
  const [selectedOption, setSelectedOption] = useState('complain');

  let value, name;

  const getUserdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setCreateRedo({
      ...createRedo,
      representative: empName,
      [name]: value
    });
    console.log(createRedo);
  };

  const handleSegmentChange = (e) => {

    const value = e.target.value;

    if (value === "simYes") {
      setSimFeild(true)
    } else if (value === "simNo") {
      setIsListOpen1(false)
      setSimFeild(false)
    } else if (value === "deviceYes") {
      setDeviceFeild(true)
    } else if (value === "deviceNo") {
      setIsListOpen(false)
      setDeviceFeild(false)
    }
  };

  const newRedo = async (e) => {
    e.preventDefault();
    try {
      const emp_name = cookies.get('name');
      setEmpName(emp_name)
      // if(!empName){
      // console.log(empName)
      //   return alert("Errro")
      // }  
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/redo_search`,
        { search_term }
      );
      if (response.status === 200) {
        console.log(response.data.data)
        setCreateRedo({
          ...createRedo,
          client_id: response.data.data.user.client_id,
          nature: response.data.data.user.nature_of_complain,
          complain_id: response.data.data.user.complain_id,
          customer_name: response.data.data.user.customer_name,
          reg_no: response.data.data.user.reg_no,
          new_device: response.data.data.technical.device_id,
          new_imei: response.data.data.technical.IMEI_no,
          new_sim: response.data.data.technical.sim,
          old_device: response.data.data.technical.device_id,
          old_imei: response.data.data.technical.IMEI_no,
          old_sim: response.data.data.technical.sim,
          eng_no: response.data.data.other_details.engine_no,
          chasis_no: response.data.data.other_details.chasis_no,
          contact_no: response.data.data.other_details.mobileno_1,
          // technician: response.data.data.technical.technician_name,
          sales_person: response.data.data.other_details.sales_person,
          install_date: response.data.data.other_details.date_of_installation,
          device_id : response.data.data.technical.device_no
        })
        toast.success("Data Found SuccessFully")
        return
      }
      else {
        toast.error("Please Try Again Later");
      }
    }
    catch (error) {
      if (error.response.status === 402) {
        toast.error("Please Fill All the Feild")
console.log(error)
      }
      else if (error.response.status === 400) {
        toast.error("Data Not Found ")
        setCreateRedo({
          client_id: "",
          complain_id: "",
          customer_name: "",
          reg_no: "",
          old_device: "",
          new_device: "",
          eng_no: "",
          chasis_no: "",
          contact_no: "",
          representative: "",
          technician_name: "",
          charges: "",
          sales_person: "",
          harness_change: "",
          backupbattery_change: "",
          remarks: "",
          install_loc: "",
          install_date: ""
        })
        console.log(error)
      }
      else {
        toast.error("Internal Server Error ")
        console.log(error)
      }
    }
  }

  const sendRedo = async (e) => {
    e.preventDefault();
    try {
      const { remarks, new_device, charges, harness_change, backupbattery_change, install_loc, technician } = createRedo
      // if (remarks && new_device && charges && harness_change && backupbattery_change && install_loc && technician) {
      const emp_name = cookies.get('name');
      setEmpName(emp_name)
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/create_redo`,
        createRedo
      );
      if (response.status === 200) {
        console.log(response)
        toast.success("Redo  Submitted Succesfully")
        return
      }
      else {
        toast.error("Please Try Again Later");
      }
      // } else {
      //   toast.error("Plase Fill ALl the Feilds")
      // }
    }
    catch (error) {
      if (error.response.status === 402) {
        toast.error("Please Fill All The Feilds")
        console.log(error)
      }
      else if (error.response.status === 400) {
        toast.error("Error In Submission")
      }
      else {
        setCreateRedo({})
        toast.error("internal Server Error ")
        console.log(error)
      }
    }
  }

  const getDeviceData = async (e) => {
    const { name, value } = e.target;
    setSelectedDeviceId(value)
    if (name === "new_device") {
      setIsListOpen(value.trim().length === 0);
      setIsListOpen(false) // Close list only if value is not empty
    }

    const search_term = [value];
    setCreateRedo({ ...createRedo, [name]: value });
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/getdevices`,
        { search_term: value },
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      setApiResult(response.data.data || [])
      console.log("api >>", apiResult);
      setIsListOpen(true)
    }
    catch (error) {
      console.log(error)
    }
  };

  const getSimData = async (e) => {
    const { name, value } = e.target;
    setSelectedSim(value)
    if (value.trim().length === 0) {
      setIsListOpen1(false) // Close list only if value is not empty
    }

    const search_term = [value];
    setCreateRedo({ ...createRedo, [name]: value });
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/get_avialiable_sim`,
        { search_term: value },
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      setSims(response.data.data)
      console.log("api >>", sims);
      setIsListOpen1(true)
    }
    catch (error) {
      console.log(error)
    }
  };

  const handleDeviceIdSelect = (deviceId, vender, imei, sim) => {
    setSelectedDeviceId(deviceId);
    setCreateRedo(createRedo => ({
      ...createRedo,
      new_device: deviceId,
      new_sim: sim.sim_no,
      new_imei: imei
    }));
    setIsListOpen(false)
  };

  const handleSimSelect = (sim_no, id) => {
    setSelectedSim(sim_no);
    setCreateRedo(createRedo => ({
      ...createRedo,
      new_sim: sim_no,
    }));
    setIsListOpen1(false)
  }

  const handleRadioSelect = (e)=>{
    let value = e.target.value
    if(value === "device"){
      setSelectedOption("device")
    }
    else{
      setSelectedOption("complain")
    }
  }

  useEffect(() => {
    console.log(createRedo)
  }, [createRedo])

  return (
    <>
      <div className=''>
        {/* <div className='flex justify-around ' >
          <div className='w-50 font-semibold'>
            Search BY
          </div>
          <div className='flex justify-around space-x-5'>
            <div class="form-check">
              <input class="border" type="radio" name="mobilizer" value="complain" onChange={handleRadioSelect} />
              <label class="ml-3" for="mobilizer">
                Complain ID
              </label>
            </div>
            <div class="form-check">
              <input class="border" type="radio" name="mobilizer" value="device" onChange={handleRadioSelect} />
              <label class="ml-3" for="mobilizer">
                Device ID
              </label>
            </div>
          </div>
        </div> */}
      </div>
      {selectedOption === 'complain' ? (
        <div className='p-3'>
          <ToastContainer />
          <div className='flex justify-content-center my-3 mb-5'>
            <input onChange={(e) => setSearch_term(e.target.value)} name="search_term" className='w-96 mx-4  p-2 custum_input' placeholder='Enter Complain ID ' />
            <button className='theme_btn_md rounded-0 ' onClick={newRedo}>Search</button>
          </div>
          <div className='flex grid lg:grid-cols-2 md:grid-cols-1 gap-x-4'>
            <div className=' flex flex-col justify-center'>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Customer Name :</p><input onChange={getUserdata} name="customer_name" className=' ml-3 custum_input  p-1  cursor-not-allowed' style={{ width: "55%" }} value={createRedo && createRedo.customer_name} readOnly /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Customer Number :</p><input onChange={getUserdata} name="contact_no" className=' ml-3 custum_input p-1 cursor-not-allowed' style={{ width: "55%" }} value={createRedo && createRedo.contact_no} readOnly /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Registration Number:</p><input onChange={getUserdata} name="reg_no" className=' ml-3 custum_input  p-1  cursor-not-allowed' style={{ width: "55%" }} value={createRedo && createRedo.reg_no} readOnly /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Sales Person :</p><input onChange={getUserdata} name="sales_person" className=' ml-3 custum_input  p-1  cursor-not-allowed' style={{ width: "55%" }} value={createRedo && createRedo.sales_person} readOnly /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Technecian :</p><input onChange={getUserdata} name="technician" className=' ml-3 custum_input  p-1' style={{ width: "55%" }} value={createRedo && createRedo.technician} /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Charges :</p><input onChange={getUserdata} name="charges" className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Old Device :</p><input onChange={getUserdata} name="old_device" className=' ml-3 custum_input p-1 cursor-not-allowed' style={{ width: "55%" }} value={createRedo && createRedo.old_device} readOnly /> </div>

            </div >
            <div className='space-y-3'>
              <div className='flex justify-between ' >
                <div className='w-50 text-sm'>
                  Harness Changed
                </div>
                <div className='flex justify-between space-x-5'>
                  <div class="form-check">
                    <input class="border" onChange={getUserdata} type="radio" name='harness_change' value="Yes" />
                    <label class="ml-3" for="flexRadioDefault1">
                      Yes
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="border" onChange={getUserdata} type="radio" name='harness_change' value="No" />
                    <label class="ml-3" for="flexRadioDefault2">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className='flex justify-between ' >
                <div className='w-50 text-sm'>
                  Backup Battery Changed
                </div>
                <div className='flex justify-between space-x-5'>
                  <div class="form-check">
                    <input class="border" onChange={getUserdata} type="radio" name='backupbattery_change' value="Yes" />
                    <label class="ml-3" for="flexRadioDefault1">
                      Yes
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="border" onChange={getUserdata} type="radio" name='backupbattery_change' value="No" />
                    <label class="ml-3" for="flexRadioDefault2">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex justify-between ' >
                  <div className='w-50 text-sm'>
                    Device Change
                  </div>
                  <div className='flex justify-between space-x-5'>
                    <div class="form-check">
                      <input class="border" onChange={handleSegmentChange} type="radio" name='new_device' value="deviceYes" />
                      <label class="ml-3" for="flexRadioDefault1">
                        Yes
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="border" onChange={handleSegmentChange} type="radio" name='new_device' value="deviceNo" />
                      <label class="ml-3" for="flexRadioDefault2">
                        No
                      </label>
                    </div>
                  </div>

                </div>
                {deviceFeild && (
                  <div className='flex justify-center my-2'><p className='  md:text-start text-sm' style={{ width: "40%" }}> New Device :</p><input onChange={getDeviceData} name="new_device" value={selectedDeviceId} className=' ml-3 custum_input p-1 relative' style={{ width: "55%" }} /> </div>
                )}
                {isListOpen && (
                  <div className='flex justify-center my-2 relative' >
                    <div className='absolute -top-2 right-2 z-0 bg-white overflow-y-scroll shadow' style={{ width: "55%", maxHeight: "300px" }}>
                      <div className='flex flex-col justify-center items-center  space-y-2  p-2'>
                        {apiResult.map(item => (
                          <div key={item.id} className='w-100 hover:bg-gray-300 p-1' onClick={() => handleDeviceIdSelect(item.device_serialno, item.vendor, item.imei_no, item.sim)}>
                            {item.device_serialno}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className='flex justify-between ' >
                  <div className='w-50 text-sm'>
                    Sim Changed
                  </div>
                  <div className='flex justify-between space-x-5'>
                    <div class="form-check">
                      <input class="border" onChange={handleSegmentChange} type="radio" name='new_sim' value="simYes" />
                      <label class="ml-3" for="flexRadioDefault1">
                        Yes
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="border" onChange={handleSegmentChange} type="radio" name='new_sim' value="simNo" />
                      <label class="ml-3" for="flexRadioDefault2">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                {simFeild && (
                  <div className='flex justify-center my-2'><p className='  md:text-start text-sm' style={{ width: "40%" }}> New Sim :</p><input onChange={getSimData} name="new_sim" value={selectedSim} className=' ml-3 custum_input p-1 relative' style={{ width: "55%" }} /> </div>
                )}
                {isListOpen1 && (
                  <div className='flex justify-center my-2 relative' >
                    <div className='absolute -top-2 right-2 z-0 bg-white overflow-y-scroll shadow' style={{ width: "55%", maxHeight: "300px" }}>
                      <div className='flex flex-col justify-center items-center  space-y-2  p-2'>
                        {sims.map(item => (
                          <div key={item.id} className='w-100 hover:bg-gray-300 p-1' onClick={() => handleSimSelect(item.sim_no, item.id)}>
                            {item.sim_no}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className=' flex flex-col justify-center space-y-3'>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Engine Number :</p><input onChange={getUserdata} name="eng_no" className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} value={createRedo && createRedo.eng_no} readOnly /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Chassis Number :</p><input onChange={getUserdata} name="chasis_no" className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} value={createRedo && createRedo.chasis_no} readOnly /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Redo Location :</p><input onChange={getUserdata} name="install_loc" className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Redo  Date :</p><input type="date" name='install_date' className=' ml-3 p-1 ' style={{ width: "55%" }} value={createRedo && createRedo.install_date} onChange={getUserdata} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Remarks :</p><input onChange={getUserdata} name="remarks" className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
              </div>
            </div>
          </div>
          <button className='theme_btn_md rounded-0 float-end my-3' onClick={sendRedo}>Submit</button>
        </div>) : (
        <div className='p-3'>
          <ToastContainer />
          <div className='flex justify-content-center my-3 mb-5'>
            <input onChange={(e) => setSearch_term(e.target.value)} name="search_term" className='w-96 mx-4  p-2 custum_input' placeholder='Enter Device ID ' />
            <button className='theme_btn_md rounded-0 ' onClick={newRedo}>Search</button>
          </div>
          <div className='flex grid lg:grid-cols-2 md:grid-cols-1 gap-x-4'>
            <div className=' flex flex-col justify-center'>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Customer Name :</p><input onChange={getUserdata} name="customer_name" className=' ml-3 custum_input  p-1  cursor-not-allowed' style={{ width: "55%" }} value={createRedo && createRedo.customer_name} readOnly /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Customer Number :</p><input onChange={getUserdata} name="contact_no" className=' ml-3 custum_input p-1 cursor-not-allowed' style={{ width: "55%" }} value={createRedo && createRedo.contact_no} readOnly /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Registration Number:</p><input onChange={getUserdata} name="reg_no" className=' ml-3 custum_input  p-1  cursor-not-allowed' style={{ width: "55%" }} value={createRedo && createRedo.reg_no} readOnly /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Sales Person :</p><input onChange={getUserdata} name="sales_person" className=' ml-3 custum_input  p-1  cursor-not-allowed' style={{ width: "55%" }} value={createRedo && createRedo.sales_person} readOnly /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Technecian :</p><input onChange={getUserdata} name="technician" className=' ml-3 custum_input  p-1' style={{ width: "55%" }} value={createRedo && createRedo.technician} /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Charges :</p><input onChange={getUserdata} name="charges" className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
              <div className='flex justify-center my-2'><p className='text-end md:text-start text-sm' style={{ width: "40%" }}> Old Device :</p><input onChange={getUserdata} name="old_device" className=' ml-3 custum_input p-1 cursor-not-allowed' style={{ width: "55%" }} value={createRedo && createRedo.old_device} readOnly /> </div>

            </div >
            <div className='space-y-3'>
              <div className='flex justify-between ' >
                <div className='w-50 text-sm'>
                  Harness Changed
                </div>
                <div className='flex justify-between space-x-5'>
                  <div class="form-check">
                    <input class="border" onChange={getUserdata} type="radio" name='harness_change' value="Yes" />
                    <label class="ml-3" for="flexRadioDefault1">
                      Yes
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="border" onChange={getUserdata} type="radio" name='harness_change' value="No" />
                    <label class="ml-3" for="flexRadioDefault2">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className='flex justify-between ' >
                <div className='w-50 text-sm'>
                  Backup Battery Changed
                </div>
                <div className='flex justify-between space-x-5'>
                  <div class="form-check">
                    <input class="border" onChange={getUserdata} type="radio" name='backupbattery_change' value="Yes" />
                    <label class="ml-3" for="flexRadioDefault1">
                      Yes
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="border" onChange={getUserdata} type="radio" name='backupbattery_change' value="No" />
                    <label class="ml-3" for="flexRadioDefault2">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex justify-between ' >
                  <div className='w-50 text-sm'>
                    Device Change
                  </div>
                  <div className='flex justify-between space-x-5'>
                    <div class="form-check">
                      <input class="border" onChange={handleSegmentChange} type="radio" name='new_device' value="deviceYes" />
                      <label class="ml-3" for="flexRadioDefault1">
                        Yes
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="border" onChange={handleSegmentChange} type="radio" name='new_device' value="deviceNo" />
                      <label class="ml-3" for="flexRadioDefault2">
                        No
                      </label>
                    </div>
                  </div>

                </div>
                {deviceFeild && (
                  <div className='flex justify-center my-2'><p className='  md:text-start text-sm' style={{ width: "40%" }}> New Device :</p><input onChange={getDeviceData} name="new_device" value={selectedDeviceId} className=' ml-3 custum_input p-1 relative' style={{ width: "55%" }} /> </div>
                )}
                {isListOpen && (
                  <div className='flex justify-center my-2 relative' >
                    <div className='absolute -top-2 right-2 z-0 bg-white overflow-y-scroll shadow' style={{ width: "55%", maxHeight: "300px" }}>
                      <div className='flex flex-col justify-center items-center  space-y-2  p-2'>
                        {apiResult.map(item => (
                          <div key={item.id} className='w-100 hover:bg-gray-300 p-1' onClick={() => handleDeviceIdSelect(item.device_serialno, item.vendor, item.imei_no, item.sim)}>
                            {item.device_serialno}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className='flex justify-between ' >
                  <div className='w-50 text-sm'>
                    Sim Changed
                  </div>
                  <div className='flex justify-between space-x-5'>
                    <div class="form-check">
                      <input class="border" onChange={handleSegmentChange} type="radio" name='new_sim' value="simYes" />
                      <label class="ml-3" for="flexRadioDefault1">
                        Yes
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="border" onChange={handleSegmentChange} type="radio" name='new_sim' value="simNo" />
                      <label class="ml-3" for="flexRadioDefault2">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                {simFeild && (
                  <div className='flex justify-center my-2'><p className='  md:text-start text-sm' style={{ width: "40%" }}> New Sim :</p><input onChange={getSimData} name="new_sim" value={selectedSim} className=' ml-3 custum_input p-1 relative' style={{ width: "55%" }} /> </div>
                )}
                {isListOpen1 && (
                  <div className='flex justify-center my-2 relative' >
                    <div className='absolute -top-2 right-2 z-0 bg-white overflow-y-scroll shadow' style={{ width: "55%", maxHeight: "300px" }}>
                      <div className='flex flex-col justify-center items-center  space-y-2  p-2'>
                        {sims.map(item => (
                          <div key={item.id} className='w-100 hover:bg-gray-300 p-1' onClick={() => handleSimSelect(item.sim_no, item.id)}>
                            {item.sim_no}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className=' flex flex-col justify-center space-y-3'>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Engine Number :</p><input onChange={getUserdata} name="eng_no" className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} value={createRedo && createRedo.eng_no} readOnly /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Chassis Number :</p><input onChange={getUserdata} name="chasis_no" className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} value={createRedo && createRedo.chasis_no} readOnly /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Redo Location :</p><input onChange={getUserdata} name="install_loc" className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Redo  Date :</p><input type="date" name='install_date' className=' ml-3 p-1 ' style={{ width: "55%" }} value={createRedo && createRedo.install_date} onChange={getUserdata} /> </div>
                <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Remarks :</p><input onChange={getUserdata} name="remarks" className=' ml-3 custum_input p-1 ' style={{ width: "55%" }} /> </div>
              </div>
            </div>
          </div>
          <button className='theme_btn_md rounded-0 float-end my-3' onClick={sendRedo}>Submit</button>
        </div>
      )
      }
    </>
  )
}

