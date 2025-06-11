import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import DashboardRoute from "./DashboardRoute";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<DashboardRoute />} />
        </Routes>
      </>
    </>
  );
}

export default App;
