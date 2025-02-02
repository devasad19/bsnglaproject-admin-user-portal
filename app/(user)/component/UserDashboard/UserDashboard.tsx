"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import React, {  useEffect } from "react";
import { useState } from "react";

const UserDashboard = ({ stats }: { stats: any }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let userData: any = Cookies.get("user");
    if (userData) {
      userData = JSON?.parse(userData);
    }
    setUser(userData);
  }, []);

  // console.log("user", user);

  return (
    <>
      <div className="flex flex-col flex-grow">
        <header className="bg-white shadow p-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Welcome {user ? user?.name : ""}
          </h1>
          <div className="flex items-center space-x-4">
            {/* <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-primary"
        />
        <div className="relative">
          <button className="p-2 bg-primary text-white rounded-full">
            🔔
          </button>
          <span className="absolute top-0 right-0 bg-danger text-white text-xs rounded-full px-1">5</span>
        </div> */}
          </div>
        </header>

        <main className="p-6 space-y-6">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href={{
                pathname: "/user/accounts-settings/purchase-services",
              }}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6">
                <div className="p-4 bg-primary text-white rounded-full">📊</div>
                <div>
                  <h3 className="text-lg font-semibold">Active Services</h3>
                  <p className="text-2xl font-bold text-gray-700">
                    {stats?.activeServices}
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href={{
                pathname: "/user/accounts-settings/payment-history",
              }}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6">
                <div className="p-4 bg-secondary text-white rounded-full">
                  💰
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Total Payments (Tk)</h3>
                  <p className="text-2xl font-bold text-gray-700">
                    {stats?.totalPayments}
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href={{
                pathname: "/user/comment",
              }}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6">
                <div className="p-4 bg-accent text-white rounded-full">👥</div>
                <div>
                  <h3 className="text-lg font-semibold">My Feedbacks</h3>
                  <p className="text-2xl font-bold text-gray-700">
                    {stats?.feedbacks}
                  </p>
                </div>
              </div>
            </Link>

            {/* <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6">
          <div className="p-4 bg-danger text-white rounded-full">
            ⚠️
          </div>
          <div>
            <h3 className="text-lg font-semibold">Issues</h3>
            <p className="text-2xl font-bold text-gray-700">12</p>
          </div>
        </div> */}
          </section>

          <section className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
              <p>Graph/Chart Placeholder</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
