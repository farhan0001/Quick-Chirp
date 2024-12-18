import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Authentication from './pages/Authentication/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from './store/Auth/Action';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    }
  }
})

function App() {

  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(jwt){
      dispatch(getUserProfile(jwt));
      navigate("/");
    }
  }, [jwt, dispatch, navigate]);

  return (
    <div className="">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
