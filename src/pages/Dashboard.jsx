"use client";
import React from "react";
import surveyData from "../data/surveyData";
import AverageRatingChart from "../components/AverageRatingChart";
import RatingDistributionChart from "../components/RatingDistributionChart";
import SentimentTrendChart from "../components/SentimentTrendChart";
import KeyThemesChart from "../components/KeyThemesChart";

const Dashboard = () => {
  return (
    <div className="h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[90%]">
        <div className="bg-white rounded-lg shadow p-4 overflow-hidden h-full">
          <AverageRatingChart data={surveyData} />
        </div>
        <div className="bg-white rounded-lg shadow p-4 overflow-hidden h-full">
          <RatingDistributionChart data={surveyData} />
        </div>
        <div className="bg-white rounded-lg shadow p-4 overflow-hidden h-full">
          <SentimentTrendChart data={surveyData} />
        </div>
        <div className="bg-white rounded-lg shadow p-4 overflow-hidden h-full">
          <KeyThemesChart data={surveyData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
