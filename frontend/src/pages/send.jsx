import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SendMoney() {
  const [searchParams] = useSearchParams();
  const to = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  return (
    <div className="h-screen bg-slate-300 flex justify-center items-center">
      <div className="border shadow-md bg-white h-min text-card-foreground max-w-md p-6 space-y-14 w-96 rounded-md">
        <div>
          <h2 className="text-3xl font-bold text-center">Send Money</h2>
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <div className="rounded-full h-12 w-12 bg-green-500 flex justify-center items-center">
              <span className="text-2xl text-white">{name[0]}</span>
            </div>
            <div className="text-2xl font-semibold">{name}</div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                // for="amount"
              >
                Amount (in RS)
              </label>
              <input
                type="number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="amount"
                placeholder="Enter amount"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <button
            className="mt-2 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
            onClick={() => {
              axios
                .post(
                  "http://13.61.25.202:3000/api/v1/account/transfer",
                  {
                    to,
                    amount,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                )
                .then((response) => {
                  const resJson = JSON.stringify(response.data.message);
                  alert(resJson);
                  const amountInput = document.getElementById("amount");
                  amountInput.value = null;
                });
            }}
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
