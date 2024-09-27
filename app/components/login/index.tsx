"use client";
import { imgData } from "@/app/data";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DefaultState {
  username: string;
  email: string;
  password: string;
  cnfPwd: string;
}

interface DefaultLoginState {
  email: string;
  password: string;
  username: string;
  avatar: string;
}

interface LoginProps {
  onClose: () => void;
  isLoginOpen: boolean;
  toggleLogin: () => void;
  isRegistered: boolean;
  setIsRegistered: (registered: boolean) => void;
}

interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  avatar: string;
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
  username: "",
  avatar: "",
};

export default function Login({
  toggleLogin,
  isRegistered,
  setIsRegistered,
}: LoginProps) {
  const [state, setState] = useState<DefaultState>(defaultState);
  const [loginState, setLoginState] =
    useState<DefaultLoginState>(defaultLoginState);
  const [userObj, setUserObj] = useState<User[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isRegistered) {
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setLoginState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Password validation: at least 8 characters, 1 number, and 1 special character
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(state.password)) {
      toast.error(
        "Password must be at least 8 characters long, contain at least 1 number, and 1 special character."
      );
      return;
    }

    if (state.cnfPwd !== state.password) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://6554c0c563cafc694fe6e489.mockapi.io/auth-properties",
        {
          username: state.username,
          email: state.email,
          password: state.password,
        }
      );
      setState(defaultState); // Reset form state
      toast.success("Registration successful!");
    } catch (error: any) {
      toast.error("Registration failed: " + error.message);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        "https://6554c0c563cafc694fe6e489.mockapi.io/auth-properties"
      );

      const users = response.data.map((d: User) => ({
        id: d.id,
        email: d.email,
        password: d.password,
        username: d.username,
        avatar: d.avatar,
      }));
      setUserObj(users);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    localStorage.removeItem("id");
  }, []);

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginState;

    const user = userObj.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      toast.error("Wrong email or password");
      return;
    }
    const randomImage = imgData[Math.floor(Math.random() * imgData.length)];

    localStorage.setItem(
      "login",
      JSON.stringify({ token: 1, img: randomImage, name: user.username })
    );
    toast.success("Login successful");
    toggleLogin();
  };

  return (
    <>
      {isRegistered ? (
        <div className="min-h-screen flex items-center justify-center w-[410px] mx-auto p-4 bg-gray-200">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="cnfPwd"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="cnfPwd"
                  name="cnfPwd"
                  required
                  value={state.cnfPwd}
                  onChange={handleInput}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsRegistered(false)}
              >
                Log in
              </span>
            </p>
            <button
              onClick={toggleLogin}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center w-[410px] mx-auto p-4 bg-gray-200">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Log In</h2>
            <form className="space-y-4" onSubmit={submitLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={loginState.email}
                  onChange={handleInput}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={loginState.password}
                  onChange={handleInput}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Log In
              </button>
            </form>
            <p className="mt-4 text-sm">
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsRegistered(true)}
              >
                Register here
              </span>
            </p>
            <button
              onClick={toggleLogin}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}
