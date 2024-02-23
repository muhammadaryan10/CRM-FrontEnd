import React from 'react';
import CSR_Sidebar from '../../Components/CRO_SIdebar';
import CROLogs from './CROLogs'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function HomeCRO() {
 

  return (
    <div>
        <CROLogs/>
      </div>
  )
}
