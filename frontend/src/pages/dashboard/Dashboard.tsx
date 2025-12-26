import React from "react";
import Header from "./Header";
import StatsCard from "./StatsCard";
import CampaignTable from "./CampaignTable";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />



      <CampaignTable />
    </div>
  );
};

export default Dashboard;
