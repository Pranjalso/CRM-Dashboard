export default function ScheduleTable() {
  return (
    <section className="bg-white border border-[#E5E7EB] rounded-xl p-5">
      <h2 className="font-semibold mb-4">Today’s Schedule</h2>

      <table className="w-full text-sm">
        <thead className="text-[#64748B] border-b border-[#E5E7EB]">
          <tr>
            <th className="text-left py-2">Patient</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-[#E5E7EB]">
            <td className="py-3">John Doe</td>
            <td>09:30 AM</td>
            <td>Dr. Emily Smith</td>
            <td className="text-[#16A34A]">Arrived</td>
          </tr>
          <tr>
            <td className="py-3">Sarah Williams</td>
            <td>10:15 AM</td>
            <td>Dr. Mark Adams</td>
            <td className="text-[#2563EB]">Via WhatsApp</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
