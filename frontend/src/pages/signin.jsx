import { useState } from "react";
import { BottomWarning } from "../components/bottomWarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { Input } from "../components/input";
import { SubHeading } from "../components/subHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center ">
      <div className="bg-white w-80 text-center p-2 h-max px-4 rounded-lg">
        <Heading label={"Sign in"} />
        <SubHeading text={"Enter your credentials to access your account"} />
        <Input
          label={"Email"}
          placeholder={"email@gmail.com"}
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
        <Input
          label={"Password"}
          placeholder={"Password"}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button
          label={"Sign in"}
          onclick={async () => {
            try {
              const response = await axios.post(
                "http://13.53.39.182:3000/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate(`/dashboard/${response.data.firstName}`);
              console.log(response);
            } catch (err) {
              const errJson = JSON.stringify(err.response.data.message);
              alert(errJson);
            }
          }}
        ></Button>
        <BottomWarning
          message={"Don't have an account?"}
          to={"/signup"}
          buttonText={"Sign Up"}
        ></BottomWarning>
      </div>
    </div>
  );
}
