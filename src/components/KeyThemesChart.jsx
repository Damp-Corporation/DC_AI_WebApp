// src/components/KeyThemesChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function KeyThemesChart({ data }) {
  if (!data || !Array.isArray(data)) return null;

  // Extract words from comments
  const allWords = data.flatMap((d) =>
    d.comment
      ?.toLowerCase()
      .split(/\s+/)
      .map((word) => word.replace(/[.,!?]/g, ""))
  );

  // Count word frequency
  const wordCounts = allWords.reduce((acc, word) => {
    if (word.length > 3) {
      acc[word] = (acc[word] || 0) + 1;
    }
    return acc;
  }, {});

  // Get top 10 frequent words
  const topWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const chartData = {
    labels: topWords.map(([word]) => word),
    datasets: [
      {
        label: "Word Frequency",
        data: topWords.map(([, count]) => count),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // horizontal bar
    scales: {
      x: { beginAtZero: true },
    },
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Key Themes (Top Words)</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
