import { useEffect, useState } from "react";
import { Star, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";
import { tempReviewsData } from "../../data/tempReviewdata";

/* --------------------
   Rating Bar
-------------------- */
const RatingBar = ({ stars, percentage }) => {
  return (
    <div className="flex items-center gap-2 text-xs sm:text-sm">
      <span className="w-3 text-slate-500">{stars}</span>
      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-10 text-right text-slate-500">
        {percentage}%
      </span>
    </div>
  );
};

/* --------------------
   Review Card
-------------------- */
const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
          {review.userName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">
              {review.userName}
            </span>
            {review.isVerified && (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            )}
          </div>

          <div className="flex items-center gap-2 my-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            ))}
            <span className="text-xs text-slate-500">
              • {review.serviceType}
            </span>
          </div>

          <p className="text-sm text-slate-600 mb-1">
            {review.comment}
          </p>

          <p className="text-xs text-slate-400">
            {new Date(review.date).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

/* --------------------
   Main Component
-------------------- */
const ReviewsSection = () => {
  const { providerId } = useParams(); // 👈 providerId from route

  // 👇 static data first
  const [rating, setRating] = useState(tempReviewsData.rating);
  const [totalReviews, setTotalReviews] = useState(
    tempReviewsData.totalReviews
  );
  const [reviews, setReviews] = useState(tempReviewsData.reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/providers/${providerId}/reviews`
        );
        setRating(res.data.rating);
        setTotalReviews(res.data.totalReviews);
        setReviews(res.data.reviews);
      } catch (error) {
        console.log("Backend not available, using static reviews");
      }
    };

    if (providerId) fetchReviews();
  }, [providerId]);

  const ratingDistribution = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800">
          Reviews
        </h2>
        
      </div>

      {/* Rating Summary */}
      <div className="bg-white p-4 rounded-xl shadow border">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="text-center sm:text-left">
            <div className="text-4xl font-bold">{rating}</div>
            <div className="flex justify-center sm:justify-start my-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-slate-500">
              {totalReviews} reviews
            </p>
          </div>

          <div className="flex-1 space-y-2">
            {ratingDistribution.map((item) => (
              <RatingBar
                key={item.stars}
                stars={item.stars}
                percentage={item.percentage}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.slice(0, 3).map((review, index) => (
          <motion.div
            key={review.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ReviewsSection;
