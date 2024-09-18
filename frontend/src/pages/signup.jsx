import { useEffect, useState } from "react";
import { BottomWarning } from "../components/bottomWarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { Input } from "../components/input";
import { SubHeading } from "../components/subHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center ">
      <div className="bg-white w-80 text-center p-2 h-max px-4 rounded-lg">
        <Heading label={"Sign up"} />
        <SubHeading text={"Enter your information to create an account"} />
        <Input
          label={"First Name"}
          placeholder={"Jhon"}
          onChange={(e) => setFirstName(e.target.value)}
        ></Input>
        <Input
          label={"Last Name"}
          placeholder={"Doe"}
          onChange={(e) => setLastName(e.target.value)}
        ></Input>
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
          label={"Sign up"}
          onclick={async () => {
            try {
              const response = await axios.post(
                "http://13.61.25.202:3000/api/v1/user/signup",
                {
                  username,
                  firstName,
                  lastName,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate(`/dashboard/${response.data.firstName}`);
              console.log(response);
            } catch (err) {
              const jsonData = JSON.stringify(err.response.data.message);
              alert(jsonData);
            }
          }}
        ></Button>
        <BottomWarning
          message={"Already have an account?"}
          to={"/signin"}
          buttonText={"Sign in"}
        ></BottomWarning>
      </div>
    </div>
  );
}
