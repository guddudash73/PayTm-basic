import { useEffect, useState } from "react";
import { AppBar } from "../components/appbar";
import { Balance } from "../components/balance";
import { Users } from "../components/users";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function Dashboard() {
  const [balance, setBalance] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { firstName } = useParams();

  useEffect(() => {
    async function getBalance() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (err) {
        navigate("/signin");
      }
    }
    getBalance();

    const interval = setInterval(getBalance, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mb-4">
      <AppBar firstName={firstName}></AppBar>
      <div className="mx-6">
        <Balance value={parseFloat(balance).toFixed(2)}></Balance>
        <Users></Users>
      </div>
    </div>
  );
}
