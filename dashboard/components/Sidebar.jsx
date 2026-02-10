export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] p-4 flex flex-col">
      <div className="flex items-center gap-2 font-semibold text-lg mb-8">
        <div className="w-8 h-8 bg-[#0F766E] rounded-md" />
        Modern Clinic
      </div>

      <nav className="space-y-2 text-sm">
        <div className="px-3 py-2 rounded-lg bg-[#F5F7F6] font-medium">
          Dashboard
        </div>
        <div className="px-3 py-2">Appointments</div>
        <div className="px-3 py-2">Patients</div>
        <div className="px-3 py-2">Doctors</div>
      </nav>

      <button className="mt-auto bg-[#0F766E] text-white py-3 rounded-lg text-sm font-medium">
        + New Appointment
      </button>
    </aside>
  );
}
