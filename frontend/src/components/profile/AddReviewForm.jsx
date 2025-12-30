import { useEffect, useState } from "react";
import { Star, Send, X } from "lucide-react";
import axios from "axios";

/* Static fallback completed services */
const staticCompletedServices = [
  {
    id: "1",
    serviceName: "Home Cleaning",
    providerName: "CleanPro Services",
    date: "Dec 20, 2024",
  },
  {
    id: "2",
    serviceName: "Plumbing Repair",
    providerName: "QuickFix Plumbers",
    date: "Dec 15, 2024",
  },
];

const AddReviewForm = ({ onReviewSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [completedServices, setCompletedServices] = useState(
    staticCompletedServices
  );

  const [selectedService, setSelectedService] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------- Fetch completed services ---------------- */
  useEffect(() => {
    const fetchCompletedServices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/services/completed",
          { withCredentials: true }
        );

        if (Array.isArray(res.data) && res.data.length > 0) {
          setCompletedServices(res.data);
        }
      } catch (error) {
        console.log("Backend unavailable, using static services");
      }
    };

    fetchCompletedServices();
  }, []);

  /* ---------------- Helpers ---------------- */
  const resetForm = () => {
    setSelectedService("");
    setRating(0);
    setHoverRating(0);
    setComment("");
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!selectedService) newErrors.service = "Please select a service";
    if (rating < 1) newErrors.rating = "Please select a rating";
    if (comment.trim().length < 10)
      newErrors.comment = "Review must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- Submit Review ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const serviceData = completedServices.find(
      (s) => s.id === selectedService
    );

    const payload = {
      serviceId: selectedService,
      serviceName: serviceData?.serviceName,
      providerName: serviceData?.providerName,
      rating,
      comment,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/reviews",
        payload,
        { withCredentials: true }
      );

      // backend success
      onReviewSubmit?.(res.data);
    } catch (error) {
      //  backend fail → local review
      onReviewSubmit?.({
        id: Date.now(),
        serviceName: serviceData?.serviceName,
        providerName: serviceData?.providerName,
        rating,
        comment,
        date: new Date().toDateString(),
        helpful: 0,
      });
    }

    resetForm();
    setIsOpen(false);
    setIsSubmitting(false);
  };

  const selectedServiceData = completedServices.find(
    (s) => s.id === selectedService
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Write a Review
          </h3>
          {!isOpen && (
            <p className="text-gray-500 text-sm mt-1">
              Share your experience and help others find great services.
            </p>
          )}
        </div>

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Star size={16} />
            Add Review
          </button>
        )}
      </div>

      {/* Form */}
      {isOpen && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service select */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Completed Service
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Choose a service...</option>
              {completedServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.serviceName} - {s.providerName} ({s.date})
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-red-500 text-sm mt-1">{errors.service}</p>
            )}
          </div>

          {/* Selected service info */}
          {selectedServiceData && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <p className="font-medium">
                {selectedServiceData.serviceName}
              </p>
              <p className="text-sm text-gray-600">
                {selectedServiceData.providerName} •{" "}
                {selectedServiceData.date}
              </p>
            </div>
          )}

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    size={28}
                    className={
                      s <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Review
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 resize-none"
              placeholder="Share your experience..."
            />
            <div className="flex justify-between text-xs mt-1">
              {errors.comment && (
                <span className="text-red-500">{errors.comment}</span>
              )}
              <span className="text-gray-400">
                {comment.length}/500
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Submitting..." : <><Send size={16} /> Submit</>}
            </button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setIsOpen(false);
              }}
              className="border px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddReviewForm;
