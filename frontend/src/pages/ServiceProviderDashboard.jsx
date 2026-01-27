import { useState, useEffect } from "react";
import DashboardHeader from "../components/spdashboard/DashboardHeader";
import SummaryCards from "../components/spdashboard/SummaryCards";
import QuickActions from "../components/spdashboard/QuickActions";
import RecentActivity from "../components/spdashboard/RecentActivity";

const Dashboard = () => {
  const providerName = "Rajesh Kumar";

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* ===================== HEADER ===================== */}
      <DashboardHeader providerName={providerName} />

      {/* ===================== SUMMARY ===================== */}
      <SummaryCards />

      {/* ===================== QUICK ACTIONS ===================== */}
      <QuickActions />

      {/* ===================== RECENT ACTIVITY ===================== */}
      <RecentActivity />
    </div>
  );
}
export default Dashboard;
