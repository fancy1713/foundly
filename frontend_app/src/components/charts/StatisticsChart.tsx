import DashboardCard from "@/components/common/DashboardCard";

import { itemStatistics } from "@/data/dashboard";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const StatisticsChart = () => {
  return (
    <DashboardCard
      title="Statistik Barang"
      className="min-h-[320px]"
    >
      <div className="h-[260px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={itemStatistics}>
            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="linear"
              dataKey="barangTemuan"
              stroke="#3415b8"
              strokeWidth={3}
            />

            <Line
              type="linear"
              dataKey="barangLaporan"
              stroke="#3415b8"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default StatisticsChart;