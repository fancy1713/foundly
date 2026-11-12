
import ReportCard from "@/components/dashboard/ReportCard";
import FoundItemCard from "@/components/dashboard/FoundItemCard";

import VerificationChart from "@/components/charts/VerificationChart";
import StatisticsChart from "@/components/charts/StatisticsChart";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ReportCard />

      <VerificationChart />

      <FoundItemCard />

      <StatisticsChart />
    </div>
  );
};

export default Dashboard;