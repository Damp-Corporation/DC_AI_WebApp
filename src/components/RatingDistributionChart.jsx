import { Pie } from "react-chartjs-2";

export default function RatingDistributionChart({ data }) {
  const counts = [1, 2, 3, 4, 5].map(
    (r) => data.filter((d) => d.rating === r).length
  );

  return (
    <div className="p-4 h-64">
      <h2 className="text-xl mb-2">Rating Distribution</h2>
      <Pie
        data={{
          labels: ["1", "2", "3", "4", "5"],
          datasets: [
            {
              label: "Ratings",
              data: counts,
              backgroundColor: [
                "#f87171",
                "#fbbf24",
                "#34d399",
                "#60a5fa",
                "#a78bfa",
              ],
            },
          ],
        }}
      />
    </div>
  );
}
