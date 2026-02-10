export default function StatCard({ title, value, tag }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
      <div className="text-xs font-medium text-[#0F766E] mb-2">{tag}</div>
      <p className="text-sm text-[#64748B]">{title}</p>
      <p className="text-3xl font-semibold mt-1">{value}</p>
    </div>
  );
}
