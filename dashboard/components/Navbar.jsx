export default function Navbar() {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold">Dashboard Overview</h1>
        <p className="text-sm text-[#64748B]">
          Welcome back, Admin. Here’s what’s happening today.
        </p>
      </div>

      <div className="w-9 h-9 rounded-full bg-[#E5E7EB]" />
    </header>
  );
}
