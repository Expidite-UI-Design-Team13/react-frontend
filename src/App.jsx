import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from './pages/MainPage';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from 'react';
import { AddItem } from './pages/AddItem';
import { Profile } from './pages/Profile';

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

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

