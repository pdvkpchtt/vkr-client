import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import DriversPage from "../pages/driver/DriversPage";

const NavMain = () => {
  return (
    <Routes>
      <Route path="/" element={<a href="/driver">to auth</a>} />

      {/* auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* auth */}

      {/* driver */}
      <Route path="/driver" element={<DriversPage />} />
      {/* driver */}

      <Route path="*" element={<h1>error</h1>} />
    </Routes>
  );
};

export default NavMain;
