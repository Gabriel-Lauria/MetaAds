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

    </div>
  );
};

export default StatsCard;
