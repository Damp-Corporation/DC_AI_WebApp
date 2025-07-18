import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function AverageRatingChart({ data }) {
  const avg = data.reduce((acc, cur) => acc + cur.rating, 0) / data.length;

  return (
    <div className="p-4 h-64">
      <h2 className="text-xl mb-2">Average Rating</h2>
      <Bar
        data={{
          labels: ["Average"],
          datasets: [
            {
              label: "Average Rating",
              data: [avg.toFixed(2)],
              backgroundColor: "#4F46E5",
            },
          ],
        }}
        options={{ scales: { y: { min: 0, max: 5 } } }}
      />
    </div>
  );
}
