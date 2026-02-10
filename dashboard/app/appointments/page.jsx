"use client";
import { useState } from "react";

const appointments = [
  {
    id: "#APT-1024",
    patient: "John Doe",
    phone: "+1 (555) 0123",
    doctor: "Dr. Sarah Smith",
    issue: "Fever",
    time: "Oct 24, 2023 10:00 AM - 10:15 AM",
    source: "WHATSAPP",
    status: "Confirmed",
  },
  {
    id: "#APT-1025",
    patient: "Jane Gill",
    phone: "+1 (555) 0456",
    doctor: "Dr. Michael Adams",
    issue: "Cold & Cough",
    time: "Oct 24, 2023 11:30 AM - 11:45 AM",
    source: "STAFF ENTRY",
    status: "Pending",
  },
  {
    id: "#APT-1026",
    patient: "Robert Fox",
    phone: "+1 (555) 0890",
    doctor: "Dr. Sarah Smith",
    issue: "Tooth Pain",
    time: "Oct 24, 2023 02:00 PM - 02:15 PM",
    source: "WHATSAPP",
    status: "Cancelled",
  },
  {
    id: "#APT-1027",
    patient: "Emily Day",
    phone: "+1 (555) 0333",
    doctor: "Dr. Taylor Swift",
    issue: "Other",
    time: "Oct 25, 2023 09:00 AM - 09:15 AM",
    source: "STAFF ENTRY",
    status: "Confirmed",
  },
];

export default function AppointmentsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="bg-white border border-gray-300 rounded-xl p-4 md:p-6">
        <h2 className="text-xl font-semibold">Managing 1,284 scheduled appointments</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-[#0F766E] text-white rounded-lg text-sm">All Appointments</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm">Today</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm">Upcoming</button>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search appointments..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-sm w-full md:w-64"
            />
            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="px-4 py-2 bg-[#0F766E] text-white rounded-lg text-sm">+ New</button>
        </div>
      </div>

      {/* Table - Mobile Cards / Desktop Table */}
      <div className="bg-white border border-gray-300 rounded-xl overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">PATIENT NAME</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">PHONE NUMBER</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">DOCTOR</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">DATE/TIME</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">SOURCE</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">STATUS</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium">{apt.id}</td>
                  <td className="p-4">
                    <div className="font-medium">{apt.patient}</div>
                  </td>
                  <td className="p-4 text-sm">{apt.phone}</td>
                  <td className="p-4">
                    <div className="font-medium">{apt.doctor}</div>
                    <div className="text-xs text-gray-500">{apt.issue}</div>
                  </td>
                  <td className="p-4 text-sm">{apt.time}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.source === "WHATSAPP" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {apt.source}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 p-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold">{apt.patient}</h3>
                  <p className="text-sm text-gray-600">{apt.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                  {apt.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{apt.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{apt.doctor} • {apt.issue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{apt.time}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.source === "WHATSAPP" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {apt.source}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">Showing 1 to 4 of 1,284 entries</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Previous</button>
            <button className="px-3 py-2 bg-[#0F766E] text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">3</button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}