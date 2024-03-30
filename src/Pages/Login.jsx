import React, { useEffect, useState } from 'react'
import bg from "../Assets/back.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTty } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import SuccesAlert from '../Components/SuccesAlert';
import { ToastContainer, toast } from 'react-toastify';
import { ClockLoader } from 'react-spinners';
import { Watch } from 'react-loader-spinner';


export default function Login() {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  const BaseUrl = process.env.REACT_APP_BACKEND_URL;

  const [user, setUser] = useState({
    login_Id: "",
    password: "",
  });

  const Authentication = async () => {
    setLoading(true)
    setTimeout(() => {
      const check = cookies.get('role');
      if (check === "Technical") {
        navigate("/tech");
      } else if (check === "Super Visor") {
        navigate("/sv");
      }
      else if (check === "Customer services") {
        navigate("/cs");
      }
      else if (check === "CRO") {
        navigate("/cro");
      } else if (check === "Head") {
        navigate("/superAdmin");
      }
      else if (check === "CMD") {
        navigate("/cmd");
      }
      else {
        setLoading(false)
      }

    }, 1000);

  }

  useEffect(() => {
    Authentication()
  }, [])

  const cookies = new Cookies();

  let value, name;

  const getUserdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { login_Id, password } = user;

    let data;
    if (login_Id && password) {
      setLoading(true)
      try {
        const response = await axios.post(
          `${BaseUrl}/empLogin`,
          { em_loginid: login_Id, password },
          { withCredentials: true } // Include credentials (cookies)
        );
        data = response.data;
        console.log(data);
        cookies.set('session_token', data.token, { path: '/' });
        cookies.set('role', data.role);
        cookies.set('designation', data.designation);
        cookies.set('name', data.emp_name);
        cookies.set('em_loginid', data.em_loginid);
        cookies.set('emp_id', data.emp_id)
        cookies.set('image', data.image)
        cookies.set('active_id', data.active_id)
        if (response.status === 200) {
          console.log(data.message);
          if (data.role === "Technical") {
            navigate("/tech");
          } else if (data.role === "Super Visor") {
            navigate("/sv");
          }
          else if (data.role === "Customer services") {
            navigate("/cs");
          }
          else if (data.role === "CRO") {
            navigate("/cro");
          } else if (data.role === "Head") {
            navigate("/superAdmin");
          }
          else if (data.role === "CMD") {
            navigate("/cmd");
          }
          else {
            toast.error("Opps it looks Like You are not Eligble");
          }

        }
      } catch (error) {
        if (error.response.status === 401) {
          setLoading(false)
          toast.error(error.response.data.message);
          // console.log(error);
          return
        }
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
          // console.log(error);
          return
        }
        else {
          toast.error("Please  Try again Later");
          console.log("Please Try Again Later .", error);
          return
        }
      }
    } else {
      toast.error("Please Fill the All Feilds ");
    }
  };


  return (
    <div>
      <ToastContainer position="top-center" />
      {loading && (
        <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
          <Watch
            visible={true}
            width="80"
            radius="48"
            color="#000000"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

      <section class="bg-gray-100" style={{ backgroundImage: bg, backgroundSize: "cover" }}>
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div class="lg:col-span-2 lg:py-12">
              <h1 className='text-5xl font-bold text-center'>MAGMA CONSULTING CORPORATION</h1>
              <div class="mt-8">
                <p href="" class="text-2xl font-bold text-pink-600 text-center"><FontAwesomeIcon icon={faTty} /> 021 3453 5573 </p>
                <address class="mt-2 not-italic text-center">59-B NAZR-UL-ISLAM ROAD PECHS BLOCK 2 KARACHI, PAKISTAN</address>
              </div>
            </div>

            <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={sendData} class="space-y-4 text-center">
                <h1 className='text-3xl font-bold'>Welcome</h1>
                <div>
                  <label class="sr-only" for="name">Login Id </label>
                  <input
                    class="w-full rounded-lg border p-3 text-sm"
                    placeholder="Login Id"
                    onChange={getUserdata}
                    name='login_Id'
                    type="text"
                    id="login_id"
                    password="login_id"
                  />
                </div>
                <div>
                  <label class="sr-only" for="name">Password</label>
                  <input
                    class="w-full rounded-lg border p-3 text-sm"
                    placeholder="Password"
                    onChange={getUserdata}
                    name='password'
                    type="password"
                    id="password"
                  />
                </div>
                <div class="mt-4">
                  <button
                    type="submit" // Change type to submit
                    class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white"
                  >
                    Login
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
