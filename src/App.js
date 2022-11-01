import './App.css';
import Navbar from './Pages/Shared/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Login/Login';
import Appointment from './Pages/Appointment/Appointment';
import Register from './Pages/Login/Register';
import RequireAuth from './Pages/Login/RequireAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointment from './Pages/Dashboard/MyAppointment';
import MyReview from './Pages/Dashboard/MyReview';
import MyHistory from './Pages/Dashboard/MyHistory';
import Users from './Pages/Dashboard/Users';
import RequireAdmin from './Pages/Login/RequireAdmin';


function App() {
  return (
    <div className='max-w-7xl mx-auto'>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/appointment' element={<RequireAuth>
            <Appointment></Appointment>
          </RequireAuth>}></Route>
          <Route path='/dashboard' element={<RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>}>
            <Route index element={<MyAppointment></MyAppointment>}></Route>
            <Route path='review' element={<MyReview></MyReview>}></Route>
            <Route path='history' element={<MyHistory></MyHistory>}></Route>
            <Route path='users' element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
          </Route>
          <Route path='/reviews' element={<About></About>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
        <ToastContainer />
    </div>
  );
}

export default App;
