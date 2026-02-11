export default function AppointmentList() {
  return (
    <section className="bg-white border border-[#E5E7EB] rounded-xl p-5">
      <header className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Recent Appointment Bookings</h2>
        <button className="btn-secondary">View</button>
      </header>

      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <span>Alice Moore</span>
          <button className="badge-info">New</button>
        </div>
        <div className="flex items-center justify-between">
          <span>Robert Brown</span>
          <button className="badge-success">Confirmed</button>
        </div>
        <div className="flex items-center justify-between">
          <span>Catherine Hall</span>
          <button className="badge-info">New</button>
        </div>
      </div>
    </section>
  );
}
