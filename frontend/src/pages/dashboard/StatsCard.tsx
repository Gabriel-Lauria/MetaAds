import React from "react";
import "./Dashboard.scss";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeColor: "green" | "red";
}

const StatsCard = ({ title, value, change, changeColor }: StatsCardProps) => {
  return (
    <div className="stats-card">
      <p className="stats-title">{title}</p>
      <p className="stats-value">{value}</p>
      <p className={`stats-change ${changeColor}`}>{change}</p>
    </div>
  );
};

export default StatsCard;
