const Review = require('../models/review.model');
const ServiceProvider = require('../models/sprovider.model');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { providerId, rating, comment } = req.body;
    const userId = req.user._id;

    // Check if provider exists
    const provider = await ServiceProvider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Service provider not found' });
    }

    // Prevent duplicate review by same user for same provider
    const existingReview = await Review.findOne({ user: userId, provider: providerId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this provider' });
    }

    const review = new Review({
      user: userId,
      provider: providerId,
      rating,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews for a provider
exports.getProviderReviews = async (req, res) => {
  try {
    const { providerId } = req.params;
    const reviews = await Review.find({ provider: providerId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get average rating for a provider
exports.getProviderRating = async (req, res) => {
  try {
    const { providerId } = req.params;
    const result = await Review.aggregate([
      { $match: { provider: mongoose.Types.ObjectId(providerId) } },
      { $group: { _id: '$provider', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    if (result.length === 0) {
      return res.json({ avgRating: 0, count: 0 });
    }
    res.json({ avgRating: result[0].avgRating, count: result[0].count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
