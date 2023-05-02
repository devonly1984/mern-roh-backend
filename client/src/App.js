import { CssBaseline,ThemeProvider } from "@mui/material";
import {createTheme} from '@mui/material/styles'
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import {useMemo} from 'react'
import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Dashboard from "scenes/Dashboard";
import Layout from "scenes/Layout";
import Products from 'scenes/Products';
import Customers from 'scenes/Customers';
import Transaction from 'scenes/Transactions'
import Geography from 'scenes/Geography';
const App =() => {
  const mode = useSelector(state=>state.global.mode);
  const theme = useMemo(()=>{
    return createTheme(themeSettings(mode))
  },[mode])
  return (
    <div className="app">
      <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route element={<Layout/>}>
              <Route path="/" element={<Navigate to="/dashboard"/>} replace/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/customers" element={<Customers/>}/>
              <Route path="/transactions" element={<Transaction/>}/>
              <Route path="/geography" element={<Geography/>}/>

            </Route>

        </Routes>
      </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
