import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import HomeSuperAdmin from './Pages/SuperAdminDashboard/HomeSuperAdmin';
import SuperAdminEditProfile from './Pages/SuperAdminDashboard/SuperAdminEditProfile';
import AllEmployeesSuperAdmin from "./Pages/SuperAdminDashboard/AllEmployeesSuperAdmin"
import AddEmployessSuperAdmin from './Pages/SuperAdminDashboard/AddEmployessSuperAdmin';
import VehicleSuperAdmin from './Pages/SuperAdminDashboard/VehicleSuperAdmin';
import EditEmployeSuperAdmin from './Pages/SuperAdminDashboard/EditEmployeSuperAdmin';
import AttendenceReportSuperAdmin from './Pages/SuperAdminDashboard/AttendenceReportSuperAdmin';
import LogSuperAdmin from './Pages/SuperAdminDashboard/LogSuperAdmin';
import VehicleInformation from './Pages/SuperAdminDashboard/VehicleInformation';
import TechHome from './Pages/TechnicalDashboard.jsx/TechHome';
import AllUserTech from './Pages/TechnicalDashboard.jsx/AllUserTech'
import DataLogTech from './Pages/TechnicalDashboard.jsx/DataLogTech';
import AddUserTech from './Pages/TechnicalDashboard.jsx/AddUserTech';
import ComplainLogTech from './Pages/TechnicalDashboard.jsx/ComplainLogTech';
import FormTech from './Pages/TechnicalDashboard.jsx/FromTech';
import UpdateProfileTech from './Pages/TechnicalDashboard.jsx/UpdateProfileTech'
import DevicesTech from './Pages/TechnicalDashboard.jsx/DevicesTech';
import InventroyListTech from './Pages/TechnicalDashboard.jsx/InventoryListTech';
import RemovalTech from './Pages/TechnicalDashboard.jsx/RemovalTech';
import RedoTech from './Pages/TechnicalDashboard.jsx/RedoTech';
import MISITech from './Pages/TechnicalDashboard.jsx/MISITech';
import SuperVisorHome from './Pages/SuperVisorDashboard/SuperVisorHome'
import AddUserSuperVisor from './Pages/SuperVisorDashboard/AddUserSuperVisor';
import AllUserSuperVisor from './Pages/SuperVisorDashboard/AllUserSuperVisor';
import SuperVisorLogs from './Pages/SuperVisorDashboard/SuperVisorLogs';
import EditProfileSuperVisor from './Pages/SuperVisorDashboard/EditProfileSuperVisor'
import DataLogSuperVisor from './Pages/SuperVisorDashboard/DataLogSuperVisor';
import InfoSuperVisor from './Pages/SuperVisorDashboard/InfoSuperVisor';
import ComplainLogSuperVisor from './Pages/SuperVisorDashboard/ComplainLogSuperVisor';
import UpdateTrakerSuperVisor from './Pages/SuperVisorDashboard/UpdateTrakerSuperVisor';
import CS_Home from './Pages/CSDashboard.jsx/CS_Home'
import AddUserCS from './Pages/CSDashboard.jsx/AddUserCS';
import AllUserCS from './Pages/CSDashboard.jsx/AllUserCS';
import UserInfoCS from './Pages/CSDashboard.jsx/UserInfoCS';
import LogsCS from './Pages/CSDashboard.jsx/LogsCS';
import ComplainCS from './Components/ComplainCS';
import RequestCS from './Pages/CSDashboard.jsx/RequestCS';
import EditProfileCRO from './Pages/CRO_Dashboard.jsx/EditProfileCRO';
import CROLogs from './Pages/CRO_Dashboard.jsx/CROLogs';
import DataLogCRO from './Pages/CRO_Dashboard.jsx/DataLogCRO'
import ServiceOrderFormCS from './Pages/CSDashboard.jsx/ServiceOrderFormCS';
import InstallationForm from "./Pages/CSDashboard.jsx/InstallationForm"
import NRForm from './Pages/CSDashboard.jsx/NRForm';
import RedoForm from './Pages/CSDashboard.jsx/RedoForm';
import EditProfileCS from './Pages/CSDashboard.jsx/EditProfileCS';
import UpdateTrackerCS from './Pages/CSDashboard.jsx/UpdateTrackerCS'
import UsersStatusSuperAdmin from './Pages/SuperAdminDashboard/UsersStatusSuperAdmin';
import AddPayment from './Pages/SuperVisorDashboard/AddPayment';
import RenewalSuperAdmin from './Pages/SuperAdminDashboard/RenewalSuperAdmin';
import RenewalSuperVisor from './Pages/SuperVisorDashboard/RenewalSuperVisor';
import RemovalCS from './Pages/CSDashboard.jsx/RemovalCS';
import TestCS from './Pages/CSDashboard.jsx/TestCS';
import ViewRenewalsTech from './Pages/SuperVisorDashboard/ViewRenewalsTech'
import UserInfoTech from './Pages/TechnicalDashboard.jsx/UserInfoTech';
import ComplainResolveTech from './Pages/TechnicalDashboard.jsx/ComplainResolveTech';
import UpdateRenewal from './Pages/SuperVisorDashboard/UpdateRenewal';
import AllDataLogs from './Pages/AllDataLogs';
import TechInventery from './Pages/TechnicalDashboard.jsx/TechInventery';
import TechLogs from './Pages/TechnicalDashboard.jsx/TechLogs';
import RemovalTransferLog from './Pages/TechnicalDashboard.jsx/RemovalTransferLog';
import EditUser from './Pages/TechnicalDashboard.jsx/EditUser';
import CMD_Home from './Pages/CMD_Dashboard/CMD_Home';
import CMD_Complain from './Pages/CMD_Dashboard/CMD_Complains';
import CMD_Log from './Pages/CMD_Dashboard/CMD_Log';
import UpdateProfileCMD from './Pages/CMD_Dashboard/UpdateProfileCMD';
import CMD_Resolve from './Pages/CMD_Dashboard/CMD_Resolve';
import CMD_Forward from './Pages/CMD_Dashboard/CMD_Forward';
import CMD_ForwadingReport from './Pages/CMD_Dashboard/CMD_ForwadingReport';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dataLog/:registeration_no' element={<AllDataLogs/>}/>

      {/* CRO Routes  */}
      <Route path='/cro' element={<CROLogs/>}/>
      <Route path="/cro/updateProfile" element={<EditProfileCRO/>}/>
      <Route path="/cro/logs" element={<CROLogs/>}/>
      <Route path="/cro/dataLogs" element={<DataLogCRO/>}/>
      <Route path="/cro/updateProfile" element={<EditProfileCRO/>}/>

      {/* Super Admin Routes  */}
      <Route path='/superAdmin' element={<HomeSuperAdmin/>}/>
      <Route path="/superAdmin/updateProfile" element={<SuperAdminEditProfile/>}/>
      <Route path="/superAdmin/allEmployees" element={<AllEmployeesSuperAdmin/>}/>
      <Route path='/superAdmin/addEmployee' element={<AddEmployessSuperAdmin/>}/>
      <Route path='/superAdmin/vehiclesInfo' element={<VehicleSuperAdmin/>}/>
      <Route path='/superAdmin/editEmployee' element={<EditEmployeSuperAdmin/>}/>
      <Route path='/superAdmin/logs' element={<LogSuperAdmin/>}/>
      <Route path='/superAdmin/attendence' element={<AttendenceReportSuperAdmin/>}/>
      <Route path='/superAdmin/vehiclesInfo/:reg_no' element={<VehicleInformation/>}/>
      <Route path='/superAdmin/usersStatus' element={<UsersStatusSuperAdmin/>}/>

      {/* Technical Routes  */}
      <Route path='/tech' element={<TechHome/>}/>
      <Route path='/tech/allUser' element={<AllUserTech/>}/>
      <Route path='/tech/addInventory' element={<TechInventery/>}/>
      <Route path='/tech/userInfo/:reg_no' element={<UserInfoTech/>}/>
      <Route path='/tech/Datalog' element={<DataLogTech/>}/>
      <Route path='/tech/addUser/:reg_no' element={<AddUserTech/>}/>
      <Route path='/tech/complains' element={<ComplainLogTech/>}/>
      <Route path='/tech/form' element={<FormTech/>}/>
      <Route path='/tech/devices' element={<DevicesTech/>}/>
      <Route path='/tech/editUser' element={<EditUser/>}/>
      <Route path='/tech/inventory' element={<InventroyListTech/>}/>
      <Route path='/tech/removal' element={<RemovalTech/>}/>
      <Route path='/tech/removalTransfer' element={<RemovalTransferLog/>}/>
      <Route path='/tech/logs' element={<TechLogs/>}/>
      <Route path='/tech/misi' element={<MISITech/>}/>
      <Route path='/tech/redo' element={<RedoTech/>}/>
      <Route path='/tech/updateProfile' element={<UpdateProfileTech/>}/>
      <Route path='/tech/resolve/:complain_id' element={<ComplainResolveTech/>}/>

      {/* Super Visor Routes  */}
      <Route path='/sv' element={<SuperVisorHome/>}/>
      <Route path='/sv/addUser/:reg_no' element={<AddUserSuperVisor/>}/>
      <Route path='/sv/allUser' element={<AllUserSuperVisor/>}/>
      <Route path='/sv/logs' element={<SuperVisorLogs/>}/>
      <Route path='/sv/Datalog' element={<DataLogSuperVisor/>}/>
      <Route path="/sv/updateProfile" element={<EditProfileSuperVisor/>}/>
      <Route path="/sv/userInfo/:reg_no" element={<InfoSuperVisor/>}/>
      <Route path="/sv/complains" element={<ComplainLogSuperVisor/>}/>
      <Route path='/sv/updateTracker' element={<UpdateTrakerSuperVisor/>}/>
      <Route path="/sv/addPayment/:reg_no" element={<AddPayment/>}/>
      <Route path="/sv/view/:reg_no" element={<ViewRenewalsTech/>}/>
      <Route path="/sv/renewal" element={<RenewalSuperVisor/>}/>
      <Route path="/sv/updaterenewal/:reg_no" element={<UpdateRenewal/>}/>


      {/* Routes for Customer Services  */}
      <Route path='/cs' element={<CS_Home/>}/>
      <Route path='/cs/addUser' element={<AddUserCS/>}/>
      <Route path='/cs/allUser' element={<AllUserCS/>}/>


      {/* <Route path='/cs/allUser' element={<Approved/>}/>  */}
      <Route path='/cs/userInfo/:reg_no' element={<UserInfoCS/>}/>
      <Route path='/cs/logs' element={<LogsCS/>}/>
      <Route path='/cs/complains' element={<ComplainCS/>}/>
      <Route path='/cs/request' element={<RequestCS/>}/>
      <Route path='/cs/serviceForm' element={<ServiceOrderFormCS/>}/>
      <Route path='/cs/installForm' element={<InstallationForm/>}/>
      <Route path='/cs/NRForm' element={<NRForm/>}/>
      <Route path='/cs/RedoForm' element={<RedoForm/>}/>
      <Route path='/cs/updateProfile' element={<EditProfileCS/>}/>
      <Route path='/cs/updateTracker' element={<UpdateTrackerCS/>}/>


      {/* Routes For Complain  Manage Department  */}
      <Route path='/cmd' element={<CMD_Home/>}/>
      <Route path='/cmd/updateProfile' element={<UpdateProfileCMD/>}/>
      <Route path='/cmd/complains' element={<CMD_Complain/>}/>
      <Route path='/cmd/allUser' element={<CMD_Home/>}/>
      <Route path='/cmd/resolve/:complain_id' element={<CMD_Resolve/>}/>
      <Route path='/cmd/logs' element={<CMD_Log/>}/>
      <Route path='/cmd/forwardingReports' element={<CMD_ForwadingReport/>}/>
      <Route path='/cmd/forward/:complain_id' element={<CMD_Forward/>}/>
    </Routes>
  );
}

export default App;
