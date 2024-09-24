"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from 'axios';
import https from "https";

import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function Login() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const url = `${API_URL}/login`;
      const response = await axios.post(
        url,
        { username, password },
        {
          headers : {
            "Content-Type" : "application/json",
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false // Disable SSL verification (for dev only)
          })
        }
      );

      alert("Login Successfully!");

      const { token } = response.data.data;

      /* Create cookie */
      Cookies.set("username", username, { expires: 1 });
      Cookies.set("token", token, { expires: 1 });

      /* redirect to home page */
      router.push('/');
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error);
      alert("Login Failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      {/* <Image src={background} alt="background" /> */}
      <form onSubmit={handleSubmit} className="text-white rounded-2xl shadow-lg shadow-grey-500 flex flex-col items-center justify-between border-solid border-2 border-orange-300 w-[360px] px-8">
        <div className="w-full flex flex-col items-center">
          <span className="text-4xl font-semibold mt-5">Login</span>
          <div className="w-full relative my-7 border-solid border-b-[2px] border-b-orange-300 ">
            <input
              name="username"
              className="peer/input w-full outline-none p-3 pl-2 text-m bg-transparent"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="label peer-focus/input:top-[-0px] peer-valid/input:top-[-0px]">Username</div>
          </div>
          <div className="w-full relative my-7 border-solid border-b-[2px] border-b-orange-300 ">
            <input
              name="password"
              className="peer/input w-full outline-none p-3 pl-2 text-m bg-transparent"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="label peer-focus/input:top-[-0px] peer-valid/input:top-[-0px]">Password</div>
          </div>
          <button type="submit" className="w-full my-5 py-2 border-solid border-[1px] border-orange-400 rounded-full flex items-center justify-center p-1 text-orange-400 hover:text-white hover:bg-orange-400 cursor-pointer ease-in duration-300">
            Login
          </button>
        </div>
        <div className="mb-10">
          Already have an Account. <Link href="/login"><strong>Login</strong></Link>
        </div>
      </form>

      <style jsx>
        {`
          .center {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .label {
            position: absolute;
            top: 50%;
            left: 5px;
            transform: translateY(-50%);
            font-size: 1em;
            pointer-events: none;
            transition: 0.5s;
          }
        `}
      </style>
    </div>
  )
}