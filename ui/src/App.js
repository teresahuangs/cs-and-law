import logo from './logo.svg';
import './App.css';
import SignInScreen from './sign-in-side/SignInSide'
import LandingPage from "./marketing-page/MarketingPage"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInScreen />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
