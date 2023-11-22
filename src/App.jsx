import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from './pages/MainPage';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from 'react';
import { AddItem } from './pages/AddItem';
import { Profile } from './pages/Profile';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Authenticate } from './pages/Authenticate';
import useToken from './components/useToken';

const themeLight = createTheme({
  palette: {
    background: {
      default: '#ffffff',
      secondary: "#BEE3DB"
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: '#ffffff'
    },
    text: {
      primary: "#ffffff"
    }
  }
});

export default function App() {
  console.log("app running");
  const [light, setLight] = useState(true);
  const { token, removeToken, setToken } = useToken();

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <BrowserRouter>
          {!token && token!=="" && token !== undefined?
            <Routes>
              <Route path="/" element={<Authenticate token={token} setToken={setToken}/>} />
              <Route path="/login" element={<Login token={token} setToken={setToken}/>} />    
              <Route path="/signup" element={<Signup token={token} setToken={setToken}/>} />    
              <Route path="/add" element={<Authenticate token={token} setToken={setToken}/>} />    
              <Route path="/profile" element={<Authenticate token={token} setToken={setToken}/>} />            
            </Routes>  
          :(
            <Routes>
              <Route path="/" element={<MainPage token={token} setToken={setToken}/>} />
              <Route path="/add" element={<AddItem token={token} setToken={setToken}/>} />
              <Route path="/profile" element={<Profile removeToken={removeToken} token={token} setToken={setToken}/>} />
            </Routes>
          )}
        
      </BrowserRouter>
    </ThemeProvider>
  );
}

