import { useEffect, useState } from "react";
import { Button } from "./button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = setTimeout(() => {
      //Debouncing
      axios
        .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
        .then((response) => {
          setUsers(response.data.users);
        });
    }, 500);

    return () => clearTimeout(getUser);
  }, [filter]);

  return (
    <div>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div>
        <input
          className="w-full px-2 py-1 border rounded border-slate-200 "
          type="text"
          placeholder="Search users..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user}></User>
        ))}
      </div>
    </div>
  );
}

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-8 w-8 bg-slate-200 flex justify-center mt-4 mr-2">
          <div className=" flex items-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div>
        <Button
          label={"Send Money"}
          onclick={() =>
            navigate(`/send?id=${user._id}&name=${user.firstName}`)
          }
        ></Button>
      </div>
    </div>
  );
}
