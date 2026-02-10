"use client";
import { useState } from "react";

const doctors = [
  {
    id: "#DOC-8821",
    name: "Dr. Sarah Jenkins",
    specialization: "Cardiologist",
    schedule: "09:00 AM - 05:00 PM Mon, Tue, Wed, Fri",
    phone: "+1 (555) 012-3456",
    patients: "1,248",
    growth: "+12%",
    status: "Active",
  },
  {
    id: "#DOC-7742",
    name: "Dr. Michael Chen",
    specialization: "Neurologist",
    schedule: "10:00 AM - 06:00 PM Mon - Sat",
    phone: "+1 (555) 012-9876",
    patients: "856",
    growth: "+5%",
    status: "Active",
  },
  {
    id: "#DOC-4412",
    name: "Dr. Jessica Wu",
    specialization: "Pediatrician",
    schedule: "08:00 AM - 04:00 PM Tue, Thu, Sat",
    phone: "+1 (555) 012-5522",
    patients: "2,104",
    growth: "+18%",
    status: "In Surgery",
  },
  {
    id: "#DOC-4413",
    name: "Dr. Robert King",
    specialization: "Dermatologist",
    schedule: "Off-Duty Scheduled Leave",
    phone: "+1 (555) 012-1100",
    patients: "532",
    growth: "0%",
    status: "On Leave",
  },
];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "in surgery": return "bg-blue-100 text-blue-800";
      case "on leave": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 rounded-xl p-6">
        <h1 className="text-2xl font-bold">Doctor Management Directory</h1>
        <p className="text-gray-600 mt-2">Showing 4 of 28 practitioners</p>
        <div className="mt-4 text-sm">
          <span className="font-semibold">Alex Johnson</span> — ADMINISTRATOR
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name, ID or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-sm"
          />
          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex gap-3">
          <select className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm min-w-[200px]">
            <option>All Specializations</option>
            <option>Cardiologist</option>
            <option>Neurologist</option>
            <option>Pediatrician</option>
            <option>Dermatologist</option>
          </select>
          
          <button className="px-6 py-3 bg-[#0F766E] text-white rounded-lg text-sm font-medium">
            + Add Doctor
          </button>
        </div>
      </div>

      {/* Doctors List */}
      <div className="bg-white border border-gray-300 rounded-xl overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">DOCTOR NAME</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">SPECIALIZATION</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">AVAILABLE TIME</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">PHONE NUMBER</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">TOTAL PATIENTS</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">STATUS</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-semibold">{doctor.name}</div>
                    <div className="text-sm text-gray-500">{doctor.id}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {doctor.specialization}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{doctor.schedule}</td>
                  <td className="p-4 text-sm">{doctor.phone}</td>
                  <td className="p-4">
                    <div className="font-semibold">{doctor.patients}</div>
                    <div className={`text-sm ${doctor.growth.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                      {doctor.growth}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 p-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}>
                  {doctor.status}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    {doctor.specialization}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{doctor.schedule}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{doctor.phone}</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <div>
                    <p className="font-semibold">{doctor.patients} patients</p>
                    <p className={`text-xs ${doctor.growth.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                      {doctor.growth}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}