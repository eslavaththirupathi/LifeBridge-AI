const ResultCard = ({ result }) => {
  if (!result) return null;

  const severityColor = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  return (
    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <h2 className="text-3xl font-bold text-white mb-8">
        AI Prediction Result
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-800 rounded-2xl p-5">
          <p className="text-slate-400">Possible Disease</p>
          <h3 className="text-cyan-400 text-2xl font-bold mt-2">
            {result.disease}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5">
          <p className="text-slate-400">Confidence</p>
          <h3 className="text-white text-2xl font-bold mt-2">
            {result.confidence}%
          </h3>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5">
          <p className="text-slate-400 mb-2">Severity</p>

          <span
            className={`px-4 py-2 rounded-full text-white ${
              severityColor[result.severity]
            }`}
          >
            {result.severity}
          </span>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5">
          <p className="text-slate-400">Recommended Action</p>

          <p className="text-white mt-2">
            {result.firstAid}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ResultCard;