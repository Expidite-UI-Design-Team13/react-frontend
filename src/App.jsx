import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from './pages/MainPage';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from 'react';
import { NewItem } from './pages/NewItem';
import { Profile } from './pages/Profile';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Authenticate } from './pages/Authenticate';
import useToken from './components/useToken';
import useId from './components/useId';

const themeLight = createTheme({
  palette: {
    background: {
      default: '#ffffff',
      secondary: "#BEE3DB"
    },
    primary: {
      main: "#BEE3DB", //this overide blue color
      light: "#FAF9F9", //overides light blue
      dark: "#89B0AE", //overides dark blue color
    },
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
  },
  typography: {
    "fontFamily": `"Lato", sans-serif`
   },
   menuPaper: {
    maxHeight: 100
  }
});

export default function App() {
  console.log("app running");
  const [light, setLight] = useState(true);
  const { token, removeToken, setToken } = useToken();
  const { id, removeId, setId } = useId();

  //console.log(token)

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <BrowserRouter>
        {!token && token !== "" && token == undefined ?
          <Routes>
            <Route path="/" element={<Authenticate token={token} setToken={setToken} id={id} setId={setId} />} />
            <Route path="/login" element={<Login token={token} setToken={setToken} id={id} setId={setId} />} />
            <Route path="/signup" element={<Signup token={token} setToken={setToken} id={id} setId={setId} />} />
            <Route path="/add" element={<Authenticate token={token} setToken={setToken} id={id} setId={setId} />} />
            <Route path="/profile" element={<Authenticate token={token} setToken={setToken} id={id} setId={setId} />} />
          </Routes>
          : (
            <Routes>
              <Route path="/" element={<MainPage token={token} setToken={setToken} id={id} setId={setId} />} />
              <Route path="/add" element={<NewItem token={token} setToken={setToken} id={id} setId={setId} />} />
              <Route path="/profile" element={<Profile removeToken={removeToken} removeId={removeId} token={token} setToken={setToken} id={id} setId={setId} />} />
            </Routes>
          )}

      </BrowserRouter>
    </ThemeProvider>
  );
}

