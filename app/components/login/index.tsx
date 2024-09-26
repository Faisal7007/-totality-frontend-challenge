"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Define interfaces for state and props
interface DefaultState {
  username: string;
  email: string;
  password: string;
  cnfPwd: string;
}

interface DefaultLoginState {
  email: string;
  password: string;
}

interface LoginProps {
  onClose: () => void;
  login: boolean;
  setLogin: (login: boolean) => void;
}

interface User {
  email: string;
  password: string;
  id: string;
}

const defaultState: DefaultState = {
  username: "",
  email: "",
  password: "",
  cnfPwd: "",
};

const defaultLoginState: DefaultLoginState = {
  email: "",
  password: "",
};

export default function Login({ onClose, login, setLogin }: LoginProps) {
  const [state, setState] = useState<DefaultState>(defaultState);
  const [state2, setState2] = useState<DefaultLoginState>(defaultLoginState);
  const [userObj, setUserObj] = useState<User[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [email1, setEmail1] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail1(e.target.value);
  };

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(e.target.value);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.cnfPwd === state.password) {
      try {
        const data = await axios.post(
          "https://6554c0c563cafc694fe6e489.mockapi.io/auth-properties",
          {
            username: state.username,
            email: state.email,
            password: state.password,
          }
        );
        console.log(data);
        setState(defaultState);
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      toast.error("Password does not match");
    }
  };

  const fetchUserDetails = () => {
    axios
      .get("https://6554c0c563cafc694fe6e489.mockapi.io/auth-properties")
      .then((res) => setUserData(res.data))
      .catch((rej) => console.log(rej));
  };

  useEffect(() => {
    fetchUserDetails();
    sessionStorage.removeItem("login");
    localStorage.removeItem("id");
  }, []);

  useEffect(() => {
    const users = userData.map((d) => ({
      password: d.password,
      email: d.email,
      id: d.id,
    }));
    setUserObj(users);
  }, [userData]);

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = {
      email: email1,
      password: password1,
    };
    const func = userObj.filter((d) => d.password === obj.password && d.email === obj.email);
    if (func.length === 0) {
      alert("Wrong email or password");
    } else {
      sessionStorage.setItem("login", "1");
      localStorage.setItem("id", func[0].id);
      console.log("Login successful");
    }
  };

  return (
    <>
      {!login ? (
        <div className="min-h-screen flex items-center justify-center w-[410px] mx-auto p-4 bg-gray-200">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={state.username}
                  onChange={handleInput}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={state.email}
                  onChange={handleInput}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={state.password}
                  onChange={handleInput}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="cnfPwd"
                  required
                  value={state.cnfPwd}
                  onChange={handleInput}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <span onClick={() => setLogin(!login)} className="text-indigo-600 cursor-pointer">
                Login
              </span>
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center w-[410px] mx-auto p-4 bg-gray-200">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form className="space-y-4" onSubmit={submitLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  onChange={handleEmail}
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email1}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  onChange={handlePass}
                  value={password1}
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <span onClick={() => setLogin(false)} className="text-indigo-600 cursor-pointer">
                Register
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
