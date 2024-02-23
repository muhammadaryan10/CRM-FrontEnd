import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccesAlert = ({ type, message }) => {
  // Use the toast function to display the notification
    toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: 'dark', // Choose a theme: 'dark' or 'light'
  });

  return null; // Return nothing as the component triggers toasts internally
};

export default SuccesAlert;
