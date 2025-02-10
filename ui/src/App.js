import logo from './logo.svg';
import './App.css';
import SignInScreen from './sign-in-side/SignInSide'
import LandingPage from "./marketing-page/MarketingPage"

function App() {
  return (
    <BrowserRouter>
    <NavigationHeader />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInScreen />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
