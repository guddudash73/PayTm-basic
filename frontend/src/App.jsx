import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { SendMoney } from "./pages/send";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard/:firstName" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
