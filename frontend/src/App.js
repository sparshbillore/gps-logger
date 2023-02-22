import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login';
import Register from './pages/Register';
import SummaryGPS from './pages/SummaryGPS';
import DeviceDetail from './pages/DeviceDetail'
import Header from './components/Header';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';


function App() {
  const {user } = useSelector((state) => state.auth)

  if(!user){
    <Spinner/>
  }
  return (
    <>
    <Router>
      <div className='contianer'>
        <Header />
        <Routes>
          <Route exact path='/'  element={ user ? <Navigate to="/summary" /> : <Navigate to="/user/login" />}/>
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/register' element={<Register />} />
          <Route path='/summary' element={<SummaryGPS />} /> 
          <Route path='/details/:deviceId' element= {<DeviceDetail />} />

        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </>
  )
}

export default App;
