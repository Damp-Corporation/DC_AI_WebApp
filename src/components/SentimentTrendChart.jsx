import { Line } from "react-chartjs-2";
import Sentiment from "sentiment";

export default function SentimentTrendChart({ data }) {
  const sentiment = new Sentiment();
  const scores = data.map((d) => sentiment.analyze(d.comment).score);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Sentiment Trend</h2>
      <Line
        data={{
          labels: scores.map((_, i) => `Resp ${i + 1}`),
          datasets: [
            {
              label: "Sentiment Score",
              data: scores,
              borderColor: "#10b981",
              fill: false,
            },
          ],
        }}
        options={{ tension: 0.4 }}
      />
    </div>
  );
}
