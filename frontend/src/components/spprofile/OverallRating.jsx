import { Star } from "lucide-react";

const OverallRating = ({ averageRating, totalJobs, renderStars }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Overall Rating</h3>
        <div className="text-right">
          <div className="flex items-center gap-1">
            {renderStars(Math.floor(averageRating))}
            <span className="text-xl font-bold text-gray-900 ml-2">{averageRating}</span>
          </div>
          <p className="text-sm text-gray-500">Based on {totalJobs} jobs</p>
        </div>
      </div>
    </div>
  );
}

export default OverallRating;
