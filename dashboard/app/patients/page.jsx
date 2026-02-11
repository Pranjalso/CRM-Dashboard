"use client";
import { useState } from "react";
import Link from "next/link";

// Sample patient data matching your image
const patientsData = [
  {
    id: "PID-882910",
    name: "John Doe",
    age: 35,
    gender: "Male",
    phone: "+1 (555) 0123",
    lastVisit: "Oct 24, 2023",
    nextAppointment: "Today, 10:00 AM",
    status: "Active",
    alerts: ["Allergic to Penicillin", "Mild Hypertension history"],
    doctor: "Dr. Sarah Smith",
    specialty: "Cardiology Specialist",
    bookingId: "#APT-1024",
    dob: "Oct 12, 1988",
  },
  {
    id: "PID-882911",
    name: "Jane Gill",
    age: 28,
    gender: "Female",
    phone: "+1 (555) 0456",
    lastVisit: "Oct 23, 2023",
    nextAppointment: "Tomorrow, 2:30 PM",
    status: "Active",
    alerts: ["None"],
    doctor: "Dr. Michael Adams",
    specialty: "Cold & Cough Specialist",
    bookingId: "#APT-1025",
    dob: "Mar 15, 1995",
  },
  {
    id: "PID-882912",
    name: "Robert Fox",
    age: 42,
    gender: "Male",
    phone: "+1 (555) 0890",
    lastVisit: "Oct 22, 2023",
    nextAppointment: "Oct 26, 2023",
    status: "Active",
    alerts: ["Diabetic"],
    doctor: "Dr. Sarah Smith",
    specialty: "Dentistry",
    bookingId: "#APT-1026",
    dob: "Jun 08, 1981",
  },
  {
    id: "PID-882913",
    name: "Emily Day",
    age: 31,
    gender: "Female",
    phone: "+1 (555) 0333",
    lastVisit: "Oct 21, 2023",
    nextAppointment: "Oct 27, 2023",
    status: "Active",
    alerts: ["Asthma"],
    doctor: "Dr. Taylor Swift",
    specialty: "General Physician",
    bookingId: "#APT-1027",
    dob: "Sep 22, 1992",
  },
];

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter patients
  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(search.toLowerCase()) ||
                         patient.id.toLowerCase().includes(search.toLowerCase()) ||
                         patient.phone.includes(search) ||
                         patient.doctor.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || patient.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg bg-white text-sm"
          >
            <option value="all">All Patients</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="px-4 py-3 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
            + New Patient
          </button>
        </div>
      </div>

      {/* Patient Count */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-gray-800">Managing {patientsData.length} patient records</h3>
      </div>

      {/* Patients Table - Main Content */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">PATIENT ID</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">PATIENT NAME</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">DATE OF BIRTH</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">GENDER</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">PHONE NUMBER</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">LAST VISIT</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">NEXT APPOINTMENT</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">STATUS</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr 
                  key={patient.id} 
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium">{patient.id}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold">{patient.name}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {patient.dob} ({patient.age} y.o.)
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                      {patient.gender}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm">{patient.phone}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{patient.lastVisit}</td>
                  <td className="py-4 px-6">
                    <div className="font-medium">{patient.nextAppointment}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link href={`/patients/${patient.id}`}>
                        <button className="p-1 text-gray-400 hover:text-teal-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </Link>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden space-y-4 p-4">
          {currentPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                  <p className="text-sm text-gray-600">{patient.id}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  patient.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {patient.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>DOB:</span>
                  <span className="font-medium">{patient.dob} ({patient.age} y.o.)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Gender:</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                    {patient.gender}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phone:</span>
                  <span className="font-medium">{patient.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Next Visit:</span>
                  <span className="font-medium">{patient.nextAppointment}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last Visit: {patient.lastVisit}</span>
                  <Link href={`/patients/${patient.id}`}>
                    <button className="text-teal-600 text-sm font-medium hover:text-teal-700">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-teal-600 text-white"
                      : "border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
