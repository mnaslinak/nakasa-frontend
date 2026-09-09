import './App.css'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage.jsx";
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';

function App() {


  return (
    <>
       {
        <Toaster position='top-right'/>
       
     <Routes>

       <Route path="/" element={<HomePage />} />
       <Route path="/register" element={<RegisterPage />} />
       <Route path="/login" element={<LoginPage />} />
     </Routes>
     <Footer /> }
        
    </>
  )
}

export default App
