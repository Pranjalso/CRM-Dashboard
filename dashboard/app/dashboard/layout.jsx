"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes("/appointments")) return "Appointment Directory";
    if (pathname.includes("/patients")) return "Patient Management";
    if (pathname.includes("/doctors")) return "Doctor Management";
    return "Dashboard Overview";
  };

  const getPageDescription = () => {
    if (pathname.includes("/appointments")) return "Managing 1,284 scheduled appointments";
    if (pathname.includes("/patients")) return "Manage all patient records and information";
    if (pathname.includes("/doctors")) return "Manage doctors and their schedules";
    return "Welcome back, Admin. Here's what's happening today.";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-auto">
        <Navbar 
          title={getPageTitle()} 
          description={getPageDescription()}
        />
        {children}
      </main>
    </div>
  );
}