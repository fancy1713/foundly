import ReportCard from "./Partials/ReportCard";
import VerificationChart from "./Partials/VerificationChart";
import FoundItemCard from "./Partials/FoundItemCard";
import StatisticsChart from "./Partials/StatisticsChart";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-in fade-in duration-300">
      <ReportCard />
      <VerificationChart />
      <FoundItemCard />
      <StatisticsChart />
    </div>
  );
};

export default Dashboard;