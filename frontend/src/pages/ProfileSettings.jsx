import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Camera,
  MapPin,
  Phone,
  Mail,
  Star,
  Briefcase,
  Check,
  X,
  Edit2,
  Clock
} from "lucide-react";
import ProfileHeader from "../components/spprofile/ProfileHeader";
import ProfileSummary from "../components/spprofile/ProfileSummary";
import NavigationMenu from "../components/spprofile/NavigationMenu";
import PersonalDetails from "../components/spprofile/PersonalDetails";
import ProfessionalInfo from "../components/spprofile/ProfessionalInfo";
import BusinessInfo from "../components/spprofile/BusinessInfo";
import AvailabilityStatus from "../components/spprofile/AvailabilityStatus";
import WorkingHours from "../components/spprofile/WorkingHours";
import AvailableDays from "../components/spprofile/AvailableDays";
import OverallRating from "../components/spprofile/OverallRating";
import RatingCard from "../components/spprofile/RatingCard";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    address: "123, Sector 15, Noida, Uttar Pradesh 201301",
    city: "Noida",
    zipcode: "201301",
    serviceArea: "Noida, Greater Noida, Ghaziabad",
    experience: "5 years",
    visitingCost: "₹150-200",
    businessName: "Rajesh Repair Services",
    businessType: "Individual",
    gstNumber: "09AAAPL1234C1ZV",
    profilePhoto: null,
    description: "Professional AC repair and plumbing services with 5+ years of experience. Certified technician with excellent customer ratings."
  });

  const [documents, setDocuments] = useState({
    aadhar: { uploaded: true, name: "Aadhar Card.pdf", verified: true },
    license: { uploaded: true, name: "Service License.pdf", verified: true },
    pan: { uploaded: false, name: null, verified: false },
    certificate: { uploaded: true, name: "Technical Certificate.pdf", verified: false }
  });

  const [ratings] = useState([
    { id: 1, customer: "Amit Sharma", rating: 5, comment: "Excellent service! Very professional and knowledgeable.", date: "2 days ago" },
    { id: 2, customer: "Priya Patel", rating: 4, comment: "Good work, arrived on time and fixed the issue quickly.", date: "1 week ago" },
    { id: 3, customer: "Rahul Verma", rating: 5, comment: "Highly recommended! Very reasonable pricing and quality service.", date: "2 weeks ago" }
  ]);

  const averageRating = 4.8;
  const totalJobs = 127;

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log("Profile saved:", profileData);
  };

  const handleProfileDataChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      handleSaveProfile();
    } else {
      setIsEditing(true);
    }
  };

  const handleProfilePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log("Profile photo uploaded:", file);
        // Update the profile photo in state
        setProfileData(prev => ({
          ...prev,
          profilePhoto: file
        }));
      }
    };
    // Append to DOM and trigger click
    document.body.appendChild(input);
    input.click();
    // Clean up after a short delay to ensure file dialog opens
    setTimeout(() => {
      document.body.removeChild(input);
    }, 100);
  };

  const menuItems = [
    { key: "profile", label: "Profile", icon: User },
    { key: "availability", label: "Availability", icon: Clock },
    { key: "ratings", label: "Ratings & Reviews", icon: Star }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ProfileHeader navigate={navigate} />

      {/* Profile Summary */}
      <div className="px-4 sm:px-6 lg:px-8 mt-6 max-w-6xl mx-auto">
        <ProfileSummary 
          profileData={profileData}
          averageRating={averageRating}
          totalJobs={totalJobs}
          onPhotoUpload={handleProfilePhotoUpload}
          renderStars={renderStars}
        />
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">
        {/* Navigation Menu */}
        <NavigationMenu 
          menuItems={menuItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Profile Section */}
        {activeSection === "profile" && (
          <div className="space-y-6">
            <PersonalDetails 
              profileData={profileData}
              isEditing={isEditing}
              onProfileDataChange={handleProfileDataChange}
              onToggleEdit={handleToggleEdit}
            />

            <ProfessionalInfo 
              profileData={profileData}
              isEditing={isEditing}
              onProfileDataChange={handleProfileDataChange}
              onToggleEdit={handleToggleEdit}
            />

            <BusinessInfo 
              profileData={profileData}
              isEditing={isEditing}
              onProfileDataChange={handleProfileDataChange}
              onToggleEdit={handleToggleEdit}
            />
          </div>
        )}

        {/* Availability Section */}
        {activeSection === "availability" && (
          <div className="space-y-6">
            <AvailabilityStatus 
              isAvailable={isAvailable}
              onToggle={() => setIsAvailable(!isAvailable)}
            />

            <WorkingHours 
              isEditing={isEditing}
              onToggleEdit={handleToggleEdit}
            />

            <AvailableDays isEditing={isEditing} />
          </div>
        )}

        {/* Ratings Section */}
        {activeSection === "ratings" && (
          <div className="space-y-4">
            <OverallRating 
              averageRating={averageRating}
              totalJobs={totalJobs}
              renderStars={renderStars}
            />

            <div className="space-y-3">
              {ratings.map((rating) => (
                <RatingCard 
                  key={rating.id}
                  rating={rating}
                  renderStars={renderStars}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProfileSettings;
