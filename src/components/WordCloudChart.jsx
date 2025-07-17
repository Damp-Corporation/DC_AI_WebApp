import ReactWordcloud from "react-wordcloud";

export default function WordCloudChart({ data }) {
  if (!data || !Array.isArray(data)) return null;
  const allWords = data.flatMap(
    (d) => d.comment.toLowerCase().split(/\s+/) || []
  );

  const wordCounts = allWords.reduce((acc, word) => {
    word = word.replace(/[.,!?]/g, "");
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  const words = Object.entries(wordCounts)
    .map(([text, value]) => ({ text, value }))
    .filter((w) => w.text.length > 3); // ignore short words

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Key Themes (Word Cloud)</h2>
      <ReactWordcloud words={words} />
    </div>
  );
}
