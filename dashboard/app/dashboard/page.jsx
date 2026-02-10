import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import AppointmentList from "@/components/AppointmentList";
import ActivityFeed from "@/components/ActivityFeed";
import ScheduleTable from "@/components/ScheduleTable";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F7F6]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Top Navbar */}
        <Navbar />

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard title="Today's Appointments" value="42" tag="LIVE" />
          <StatCard title="Pending WhatsApp Flows" value="18" tag="AUTOMATED" />
          <StatCard title="New Patients" value="12" tag="NEW" />
          <StatCard title="Active Doctors" value="08" tag="DUTY" />
        </section>

        {/* Middle Section */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <AppointmentList />
          <ActivityFeed />
        </section>

        {/* Schedule Table */}
        <ScheduleTable />
      </main>
    </div>
  );
}
