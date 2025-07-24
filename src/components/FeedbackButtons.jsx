const FeedbackButtons = () => {
  return (
    <div className="mt-2 text-xs text-gray-600">
      <span>Cette réponse vous a-t-elle aidé ? </span>
      <button className="ml-2 px-2 py-1 bg-green-200 text-green-800 rounded">Oui</button>
      <button className="ml-2 px-2 py-1 bg-red-200 text-red-800 rounded">Non</button>
    </div>
  );
};

export default FeedbackButtons;
