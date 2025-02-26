import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import SignInScreen from './sign-in-side/SignInSide'
import LandingPage from "./marketing-page/MarketingPage"
import Dashboard from './dashboard/Dashboard' 
import Upload from './dashboard/Dashboard2' 
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    const [models, setModels] = React.useState([]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/dashboard" element={<Dashboard models={models}/>} />
      <Route path="/upload" element={<Upload models={models} setModels={setModels}/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
