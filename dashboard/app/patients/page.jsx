"use client";
import { useState } from "react";
import Link from "next/link";

// Sample patient data matching your image
const initialPatients = [
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
  const [patients, setPatients] = useState(initialPatients);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "Male",
    phone: "",
    lastVisit: "Today",
    nextAppointment: "",
    status: "Active",
  });
  const [viewPatient, setViewPatient] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const lastVisitOptions = ["Today", "Yesterday", "Oct 24, 2023", "Oct 23, 2023"];
  const [editPatient, setEditPatient] = useState(null);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    dob: "",
    gender: "Male",
    phone: "",
    lastVisit: "Today",
    nextAppointment: "",
    status: "Active",
  });

  const calcAge = (dobStr) => {
    if (!dobStr) return "";
    const now = new Date();
    const dob = new Date(dobStr);
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
    return age;
  };

  const createId = () => {
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `PID-${rand}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      id: createId(),
      name: form.name.trim(),
      dob: form.dob,
      age: calcAge(form.dob),
      gender: form.gender,
      phone: form.phone.trim(),
      lastVisit: form.lastVisit.trim(),
      nextAppointment: form.nextAppointment.trim(),
      status: form.status,
    };
    setPatients((prev) => [newPatient, ...prev]);
    setShowModal(false);
    setForm({
      name: "",
      dob: "",
      gender: "Male",
      phone: "",
      lastVisit: "Today",
      nextAppointment: "",
      status: "Active",
    });
    setCurrentPage(1);
  };
  
  const handleDelete = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    setDeleteTarget(null);
  };

  // Filter patients
  const filteredPatients = patients.filter(patient => {
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
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-3 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            + New Patient
          </button>
        </div>
      </div>

      {/* Patient Count */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-gray-800">Managing {patients.length} patient records</h3>
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
                      <button
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        onClick={() => setViewPatient(patient)}
                        aria-label="View"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                        onClick={() => {
                          setEditPatient(patient);
                          setEditForm({
                            id: patient.id,
                            name: patient.name,
                            dob: patient.dob,
                            gender: patient.gender,
                            phone: patient.phone,
                            lastVisit: patient.lastVisit,
                            nextAppointment: patient.nextAppointment,
                            status: patient.status,
                          });
                        }}
                        aria-label="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                        onClick={() => setDeleteTarget(patient)}
                        aria-label="Delete"
                      >
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
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      onClick={() => setViewPatient(patient)}
                      aria-label="View"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                      onClick={() => {
                        setEditPatient(patient);
                        setEditForm({
                          id: patient.id,
                          name: patient.name,
                          dob: patient.dob,
                          gender: patient.gender,
                          phone: patient.phone,
                          lastVisit: patient.lastVisit,
                          nextAppointment: patient.nextAppointment,
                          status: patient.status,
                        });
                      }}
                      aria-label="Edit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                      onClick={() => setDeleteTarget(patient)}
                      aria-label="Delete"
                    >
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
      
      {viewPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-xl bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Patient Details</h3>
              <button
                onClick={() => setViewPatient(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Patient ID</div>
                <div className="font-medium">{viewPatient.id}</div>
              </div>
              <div>
                <div className="text-gray-500">Name</div>
                <div className="font-medium">{viewPatient.name}</div>
              </div>
              <div>
                <div className="text-gray-500">DOB</div>
                <div className="font-medium">{viewPatient.dob} ({viewPatient.age} y.o.)</div>
              </div>
              <div>
                <div className="text-gray-500">Gender</div>
                <div className="font-medium">{viewPatient.gender}</div>
              </div>
              <div>
                <div className="text-gray-500">Phone</div>
                <div className="font-medium">{viewPatient.phone}</div>
              </div>
              <div>
                <div className="text-gray-500">Last Visit</div>
                <div className="font-medium">{viewPatient.lastVisit}</div>
              </div>
              <div>
                <div className="text-gray-500">Next Appointment</div>
                <div className="font-medium">{viewPatient.nextAppointment}</div>
              </div>
              <div>
                <div className="text-gray-500">Status</div>
                <div className="font-medium">{viewPatient.status}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Edit Patient</h3>
              <button
                onClick={() => setEditPatient(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPatients((prev) =>
                  prev.map((p) =>
                    p.id === editForm.id
                      ? {
                          ...p,
                          name: editForm.name,
                          dob: editForm.dob,
                          age: calcAge(editForm.dob),
                          gender: editForm.gender,
                          phone: editForm.phone,
                          lastVisit: editForm.lastVisit,
                          nextAppointment: editForm.nextAppointment,
                          status: editForm.status,
                        }
                      : p
                  )
                );
                setEditPatient(null);
              }}
              className="p-4 md:p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Name</label>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={editForm.dob}
                    onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Gender</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone</label>
                  <input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Last Visit</label>
                  <select
                    value={editForm.lastVisit}
                    onChange={(e) => setEditForm({ ...editForm, lastVisit: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    {lastVisitOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Next Appointment</label>
                  <input
                    value={editForm.nextAppointment}
                    onChange={(e) => setEditForm({ ...editForm, nextAppointment: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text sm text-gray-700 mb-1">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" className="btn-secondary" onClick={() => setEditPatient(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Delete Patient</h3>
              <p className="text-sm text-gray-600">Are you sure you want to delete {deleteTarget.name} ({deleteTarget.id})?</p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="btn-secondary"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary bg-red-600 hover:bg-red-700"
                  onClick={() => handleDelete(deleteTarget.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Patient Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Add New Patient</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Last Visit</label>
                  <select
                    value={form.lastVisit}
                    onChange={(e) => setForm({ ...form, lastVisit: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    {lastVisitOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Next Appointment</label>
                  <input
                    type="text"
                    value={form.nextAppointment}
                    onChange={(e) => setForm({ ...form, nextAppointment: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g. Today, 10:00 AM"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
