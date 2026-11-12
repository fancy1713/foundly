import { verificationData } from "@/data/dashboard";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const VerificationChart = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[220px]">
      <h3 className="font-semibold text-lg mb-4">
        Hasil Verifikasi
      </h3>

      <div className="h-[250px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={verificationData}>
            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
            type="linear"
            dataKey="cocok"
            stroke="#3415b8"
            strokeWidth={3}
          />

          <Line
            type="linear"
            dataKey="tidakCocok"
            stroke="#5da0e8"
            strokeWidth={3}
          />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VerificationChart;