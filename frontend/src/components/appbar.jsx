import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function AppBar({ firstName }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex justify-between shadow h-12">
      <div className="h-full flex items-center ml-4">PayTM App</div>
      <div className="flex flex-col" ref={dropdownRef}>
        <div className="flex">
          <div className="h-full flex items-center mr-4">Hello</div>
          <div
            onClick={toggleDropdown}
            className="cursor-pointer rounded-full h-8 w-8 bg-slate-200 flex justify-center mt-2 mr-2"
          >
            <div className="flex flex-col justify-center h-full text-xl">
              {firstName[0]}
            </div>
          </div>
        </div>
        {isOpen && (
          <ul>
            <li
              className="shadow text-center mt-2 rounded-bl-md rounded-br-md cursor-pointer"
              onClick={() => {
                localStorage.clear();
                navigate("/signin");
              }}
            >
              Sign out
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
