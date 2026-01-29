import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobDetailsHeader from "../components/spjobdetailsscreen/JobDetailsHeader";
import CustomerDetails from "../components/spjobdetailsscreen/CustomerDetails";
import ServiceInformation from "../components/spjobdetailsscreen/ServiceInformation";
import LocationMap from "../components/spjobdetailsscreen/LocationMap";
import SchedulePricing from "../components/spjobdetailsscreen/SchedulePricing";
import ActionButtons from "../components/spjobdetailsscreen/ActionButtons";

const JobDetailsScreen = () => {
  const navigate = useNavigate();
  const [jobStarted, setJobStarted] = useState(false);

  // Dummy job data
  const job = {
    id: "1",
    customerName: "Amit Sharma",
    customerPhone: "+91 98765 43210",
    customerEmail: "amit.sharma@email.com",
    serviceType: "AC Repair",
    description: "AC not cooling properly. The compressor seems to be working but the air is not cold enough. Need to check refrigerant levels and clean the filters.",
    address: "CG Road, Ahmedabad, Gujarat 380006",
    scheduledTime: "Today, 2:00 PM - 4:00 PM",
    estimatedPrice: "₹800-1200",
    rating: 4.5,
    totalJobs: 12,
    urgency: "Medium",
    specialInstructions: "Please call before arriving. Parking available in basement.",
    paymentMethod: "Cash",
    status: "accepted"
  };

  const handleStartJob = () => {
    setJobStarted(true);
    navigate(`/ongoing-job/${job.id}`);
  };

  const handleCancelJob = () => {
    // Navigate to service requests with rejected tab active
    navigate('/service-requests', { 
      state: { 
        cancelledJobId: job.id,
        activeTab: 'rejected'
      } 
    });
  };

  const handleCallCustomer = () => {
    window.open(`tel:${job.customerPhone}`);
  };

  const handleChatCustomer = () => {
    // Chat functionality removed
    console.log("Chat feature is currently disabled");
  };

  const handleGetDirections = () => {
    // Open Google Maps or navigation app
    const encodedAddress = encodeURIComponent(job.address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <JobDetailsHeader job={job} />

      <div className="px-4 sm:px-6 lg:px-8 mt-8 py-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left and Center Content - spans 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <CustomerDetails job={job} onCallCustomer={handleCallCustomer} />

            {/* Service Information */}
            <ServiceInformation job={job} />

            {/* Address with Map Preview */}
            <LocationMap job={job} onGetDirections={handleGetDirections} />
          </div>

          {/* Right Sidebar - 1 column on large screens */}
          <div className="space-y-6">
            {/* Schedule & Pricing */}
            <SchedulePricing job={job} />

            {/* Action Buttons */}
            <ActionButtons 
              onStartJob={handleStartJob}
              onCancelJob={handleCancelJob}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsScreen;
