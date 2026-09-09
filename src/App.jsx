import './App.css'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import MainLayout from './layouts/mlayout';
import ContactUsPage from "./pages/contactUsPage";
import PrivacyPolicyPage from "./pages/privacyPolicyPage";
import TermsPage from "./pages/termsPage";
import AboutPage from "./pages/aboutPage";
import LocationsPage from "./pages/locationsPage";

function App() {


  return (
    <>
       {/* <Toaster position='top-right'/>
       
     <Routes>

       <Route path="/" element={<HomePage />} />
       <Route path="/register" element={<RegisterPage />} />
       <Route path="/login" element={<LoginPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/men" element={<MenPage />} />
     </Routes>
     <Footer /> */}
         <Toaster position='top-right'/>
      <Routes>

            {/* Pages WITH Header + Footer */}

            <Route
                path="/"
                element={
                    <MainLayout>
                        <HomePage />
                    </MainLayout>
                }
            />

            <Route
                 path="/contact"
                  element={
               <MainLayout>
            <ContactUsPage />
            </MainLayout>
    }
    
/>

            <Route
    path="/privacy-policy"
    element={
        <MainLayout>
            <PrivacyPolicyPage />
        </MainLayout>
    }
    
/>
<Route
  path="/terms"
  element={
    <MainLayout>
      <TermsPage />
    </MainLayout>
  }
/>
<Route
  path="/about"
  element={
    <MainLayout>
      <AboutPage />
    </MainLayout>
  }
/>
<Route
  path="/locations"
  element={
    <MainLayout>
      <LocationsPage />
    </MainLayout>
  }
/>

            {/* Pages WITHOUT Header + Footer */}

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />
        </Routes>
    );
    </>
  )
}

export default App
