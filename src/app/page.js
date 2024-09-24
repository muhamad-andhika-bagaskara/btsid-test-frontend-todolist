"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const jwtToken = Cookies.get('token');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ( !jwtToken ) return;

    const fetchData = async () => {
      try {
        const url = `${API_URL}/checklist`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL, jwtToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const handleLogoutClick = async (event) => {
    if ( confirm("Logout?") ) {
      Cookies.remove('token');
      Cookies.remove('username');

      window.location = "/";
    }
  }

  return (
    <div className="p-5">
      <h1 className="mb-5 text-xl font-bold">TODO LIST</h1>
      <ul>
        {data.map((check, index) => (
          <li key={index}>
            <div class="flex items-center mb-4">
              <input
                id={`default-checkbox-${index}`}
                type="checkbox" value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={check.checklistCompletionStatus}
                readOnly={true}
              />
              <label for={`default-checkbox-${index}`} class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{check.name}</label>
            </div>

            <ul className="mt-4 ml-5">
              {check.items?.map((subCheck, subIndex) => (
                <li key={subIndex}>
                  <div class="flex items-center mb-4">
                    <input
                      id={`default-checkbox-${subIndex}`}
                      type="checkbox" value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={subCheck.itemCompletionStatus}
                    />
                    <label for={`default-checkbox-${subIndex}`} class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{subCheck.name}</label>
                  </div>

                  <ul className="mt-4">
                    
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <button type="button" onClick={handleLogoutClick} className="my-5 py-2 px-5 border-solid border-[1px] border-orange-400 rounded-full flex items-center justify-center p-1 text-orange-400 hover:text-white hover:bg-orange-400 cursor-pointer ease-in duration-300">
          Logout
        </button>
      </div>
    </div>
  );
}
