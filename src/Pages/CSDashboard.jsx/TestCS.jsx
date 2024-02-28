import React, { useState } from 'react'
import axios from 'axios'; 

const TestCS = () =>{
    const [ newCustomer , setnewCustomer ] = useState({
        reg_no: "",
        eng_no: "",
        chasis_no: ""
    });

    let name, value
    const getUserData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setnewCustomer({ ...newCustomer, [name]: value });
        console.log(newCustomer);
    };

    const sendData = async (e) => {
        e.preventDefault();
        
        const { reg_no, eng_no, chasis_no } = newCustomer;
    
        if (chasis_no && eng_no && reg_no) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/test_api`,
                    newCustomer, // send newCustomer directly as the request body
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );
    
                console.log(response.data); // use response.data to get the server response
    
                if (response.status === 200) {
                    console.log("Request successful");
                } else if (response.status === 401) {
                    console.log("Unauthorized");
                } else {
                    console.log("Please Try Again Later.");
                }
            } catch (error) {
                console.log("Error:", error);
            }
        } else {
            console.log("Nhi ho Rha Bc");
        }
    };
    

    return (
        <div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Registration Number :</p><input onChange={getUserData} name="reg_no" type='number' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Engine Number :</p><input onChange={getUserData} name="eng_no" type='number' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
            <div className='flex justify-between'><p className='text-start text-sm' style={{ width: "40%" }}> Chassis Number :</p><input onChange={getUserData} name="chasis_no" type='number' className=' ml-3 p-1 custum_input ' style={{ width: "55%" }} /> </div>
            <button onClick={sendData}>SEnd</button>
        </div>
    )
}
export default TestCS;