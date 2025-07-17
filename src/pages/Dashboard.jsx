import React from "react";
import surveyData from "../data/surveyData";
import AverageRatingChart from "../components/AverageRatingChart";
import RatingDistributionChart from "../components/RatingDistributionChart";
import SentimentTrendChart from "../components/SentimentTrendChart";
import KeyThemesChart from "../components/KeyThemesChart";

const Dashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <AverageRatingChart data={surveyData} />
      <RatingDistributionChart data={surveyData} />
      <SentimentTrendChart data={surveyData} />
      <KeyThemesChart data={surveyData} />
    </div>
  );
};

export default Dashboard;
