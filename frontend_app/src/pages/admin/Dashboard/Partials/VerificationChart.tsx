import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { verificationData } from "@/data/dashboard";

const VerificationChart = () => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm min-h-[240px] flex flex-col justify-between">
      <h3 className="text-lg font-bold text-gray-800 mb-4 m-0">
        Hasil Verifikasi
      </h3>

      <div className="h-[250px] w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={verificationData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Line
              type="monotone"
              dataKey="cocok"
              stroke="#3415b8"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Cocok"
            />
            <Line
              type="monotone"
              dataKey="tidakCocok"
              stroke="#5da0e8"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Tidak Cocok"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VerificationChart;