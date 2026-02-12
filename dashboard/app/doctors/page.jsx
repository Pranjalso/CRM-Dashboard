 "use client";
import { useState } from "react";

const initialDoctors = [
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
  const [doctors, setDoctors] = useState(initialDoctors);
  const [viewDoctor, setViewDoctor] = useState(null);
  const [editDoctor, setEditDoctor] = useState(null);
  const [deleteDoctor, setDeleteDoctor] = useState(null);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    specialization: "",
    schedule: "",
    phone: "",
    patients: "",
    growth: "",
    status: "",
  });

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
                      <button
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        onClick={() => setViewDoctor(doctor)}
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
                          setEditDoctor(doctor);
                          setEditForm({
                            id: doctor.id,
                            name: doctor.name,
                            specialization: doctor.specialization,
                            schedule: doctor.schedule,
                            phone: doctor.phone,
                            patients: doctor.patients,
                            growth: doctor.growth,
                            status: doctor.status,
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
                        onClick={() => setDeleteDoctor(doctor)}
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
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      onClick={() => setViewDoctor(doctor)}
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
                        setEditDoctor(doctor);
                        setEditForm({
                          id: doctor.id,
                          name: doctor.name,
                          specialization: doctor.specialization,
                          schedule: doctor.schedule,
                          phone: doctor.phone,
                          patients: doctor.patients,
                          growth: doctor.growth,
                          status: doctor.status,
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
                      onClick={() => setDeleteDoctor(doctor)}
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
      </div>
      
      {viewDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-xl bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Doctor Details</h3>
              <button
                onClick={() => setViewDoctor(null)}
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
                <div className="text-gray-500">Doctor ID</div>
                <div className="font-medium">{viewDoctor.id}</div>
              </div>
              <div>
                <div className="text-gray-500">Name</div>
                <div className="font-medium">{viewDoctor.name}</div>
              </div>
              <div>
                <div className="text-gray-500">Phone</div>
                <div className="font-medium">{viewDoctor.phone}</div>
              </div>
              <div>
                <div className="text-gray-500">Specialization</div>
                <div className="font-medium">{viewDoctor.specialization}</div>
              </div>
              <div>
                <div className="text-gray-500">Schedule</div>
                <div className="font-medium">{viewDoctor.schedule}</div>
              </div>
              <div>
                <div className="text-gray-500">Patients</div>
                <div className="font-medium">{viewDoctor.patients}</div>
              </div>
              <div>
                <div className="text-gray-500">Growth</div>
                <div className="font-medium">{viewDoctor.growth}</div>
              </div>
              <div>
                <div className="text-gray-500">Status</div>
                <div className="font-medium">{viewDoctor.status}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Edit Doctor</h3>
              <button
                onClick={() => setEditDoctor(null)}
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
                setDoctors((prev) =>
                  prev.map((d) =>
                    d.id === editForm.id
                      ? {
                          ...d,
                          name: editForm.name,
                          specialization: editForm.specialization,
                          schedule: editForm.schedule,
                          phone: editForm.phone,
                          patients: editForm.patients,
                          growth: editForm.growth,
                          status: editForm.status,
                        }
                      : d
                  )
                );
                setEditDoctor(null);
              }}
              className="p-4 md:p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Name</label>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Specialization</label>
                  <input
                    value={editForm.specialization}
                    onChange={(e) => setEditForm({ ...editForm, specialization: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Schedule</label>
                  <input
                    value={editForm.schedule}
                    onChange={(e) => setEditForm({ ...editForm, schedule: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone</label>
                  <input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Patients</label>
                  <input
                    value={editForm.patients}
                    onChange={(e) => setEditForm({ ...editForm, patients: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Growth</label>
                  <input
                    value={editForm.growth}
                    onChange={(e) => setEditForm({ ...editForm, growth: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option>Active</option>
                    <option>On Leave</option>
                    <option>In Surgery</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" className="btn-secondary" onClick={() => setEditDoctor(null)}>
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

      {deleteDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Delete Doctor</h3>
              <p className="text-sm text-gray-600">Are you sure you want to delete {deleteDoctor.name} ({deleteDoctor.id})?</p>
              <div className="mt-6 flex justify-end gap-3">
                <button className="btn-secondary" onClick={() => setDeleteDoctor(null)}>
                  Cancel
                </button>
                <button
                  className="btn-primary bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setDoctors((prev) => prev.filter((d) => d.id !== deleteDoctor.id));
                    setDeleteDoctor(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
