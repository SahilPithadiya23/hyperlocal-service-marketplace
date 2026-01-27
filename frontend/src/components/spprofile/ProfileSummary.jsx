import { User, Camera, Star } from "lucide-react";

const ProfileSummary = ({ profileData, averageRating, totalJobs, onPhotoUpload, renderStars }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          {profileData.profilePhoto ? (
            <img 
              src={typeof profileData.profilePhoto === 'string' ? profileData.profilePhoto : URL.createObjectURL(profileData.profilePhoto)} 
              alt="Profile" 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
            </div>
          )}
          <button 
            onClick={onPhotoUpload}
            className="absolute bottom-2 right-2 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-50 transition shadow-lg"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold">{profileData.name}</h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2">
            <div className="flex items-center gap-1">
              {renderStars(Math.floor(averageRating))}
              <span className="text-sm ml-1">{averageRating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-900">{totalJobs} jobs completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSummary;
