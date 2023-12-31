
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import NavBar from "./components/NavBar";
import SummaryScreen from "./components/screens/SummaryScreen";
import { themeSettings } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {useMemo}  from 'react';
import {createTheme } from '@mui/material/styles'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import NormalWrapper from './components/routing/NormalWrapper';
import PrivateRoute from './components/routing/PrivateRoute';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}}`);


function App() {
  const theme= useMemo(()=> createTheme (themeSettings()), []);
  return (
    <Elements stripe={stripePromise}> 
    <div className="App">
      <ThemeProvider theme={theme}> 
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          <Route exact path="/summary" element={ <PrivateRoute><NormalWrapper ><SummaryScreen /> </NormalWrapper> </PrivateRoute> } />

        </Routes>
      </ThemeProvider>
    </div>
    </Elements>
  );
}

export default App;
