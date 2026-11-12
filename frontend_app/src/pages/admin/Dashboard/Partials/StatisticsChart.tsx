import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { useDashboardStatsQuery } from "@/hooks/queries/admin/useDashboardQueries";

const StatisticsChart = () => {
  const { data } =
    useDashboardStatsQuery();

  const stats = data?.data;

  // Dummy titik awal supaya line muncul
  const chartData = [
    {
      month: "Awal",
      barangTemuan: 0,
      barangLaporan: 0,
    },
    {
      month: "Aktif",
      barangTemuan:
        stats?.aktif_barang_disimpan ||
        0,
      barangLaporan:
        stats?.aktif_laporan_hilang ||
        0,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm min-h-[320px] flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-4 m-0">
        Statistik Barang
      </h3>

      <div className="h-[250px] w-full flex-1">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: -20,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F3F4F6"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9CA3AF",
                fontSize: 12,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9CA3AF",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.05)",
              }}
            />

            <Legend
              layout="vertical"
              align="right"
              verticalAlign="top"
              iconType="circle"
              wrapperStyle={{
                top: 0,
                right: 0,
                fontSize: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="barangTemuan"
              stroke="#3415b8"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
              name="Barang Temuan"
            />

            <Line
              type="monotone"
              dataKey="barangLaporan"
              stroke="#11998E"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
              name="Barang Laporan"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsChart;