import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import HomePreLaunch from "./pages/HomePreLaunch"
import HomeTest from "./pages/HomeTest"
import ResetPassword from './pages/ResetPassword';
import ResetPasswordSuccess from "./pages/ResetPasswordSuccess"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePreLaunch />} />
        <Route path="/resetpassword/:resetToken/" element={<ResetPassword />} />
        <Route path="/resetpasswordsuccess/" exact element={<ResetPasswordSuccess />} />
        {/*<Route path="/hometest/" exact element={<HomeTest />} />
         <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App