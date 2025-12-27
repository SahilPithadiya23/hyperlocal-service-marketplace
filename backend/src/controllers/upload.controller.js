

async function uploadUserProfile  (req, res) {
  const user = req.user;
  user.profileImage = req.file.filename;
  await user.save();
  res.json({ profileImage: user.profileImage });
};


async function uploadProviderProfile (req, res) {
  const provider = req.serviceprovider;
  provider.profileImage = req.file.filename;
  await provider.save();
  res.json({ profileImage: provider.profileImage });
};

module.exports = {
  uploadUserProfile,uploadProviderProfile
};