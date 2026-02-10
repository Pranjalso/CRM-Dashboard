export default function AppointmentList() {
  return (
    <section className="bg-white border border-[#E5E7EB] rounded-xl p-5">
      <header className="flex justify-between mb-4">
        <h2 className="font-semibold">Recent Appointment Bookings</h2>
        <span className="text-sm text-[#0F766E]">View All</span>
      </header>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span>Alice Moore</span>
          <span className="text-[#2563EB]">NEW</span>
        </div>
        <div className="flex justify-between">
          <span>Robert Brown</span>
          <span className="text-[#16A34A]">CONFIRMED</span>
        </div>
        <div className="flex justify-between">
          <span>Catherine Hall</span>
          <span className="text-[#2563EB]">NEW</span>
        </div>
      </div>
    </section>
  );
}
