import { Outlet, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import Dashboard from "./pages/dashboard/Dashboard"
import SalseAdd from "./pages/salse/add/SalseAdd"
import SalseList from "./pages/salse/list/SalseList"
import WelcomePage from "./pages/welcome-page/WelcomePage"
import { useFrappeAuth } from "frappe-react-sdk"
import { useEffect } from "react"




const baseUrl = "http://excel_erpnext.localhost:8000"

const data = {
  usr: 'azmin',
  pwd: 'Azmin@123#',
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
};

function App() {

  useEffect(() => {
    fetch(`${baseUrl}/api/method/login`, options).then((res) => res.json()).then(() => console.log("login successfull"))

  }, [])

  return (
    <>
      <Header />
      <div className="flex justify-between">
        <Routes>
          <Route path="/" element={<WelcomePage />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales/add" element={<SalseAdd />} />
            <Route path="/sales/list" element={<SalseList />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
