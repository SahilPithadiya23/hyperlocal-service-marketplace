import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Navigation, Briefcase } from "lucide-react";
import OngoingJobHeader from "../components/spongoingjob/OngoingJobHeader";
import StatusTracker from "../components/spongoingjob/StatusTracker";
import JobInfo from "../components/spongoingjob/JobInfo";
import ExtraCharges from "../components/spongoingjob/ExtraCharges";
import PhotoUpload from "../components/spongoingjob/PhotoUpload";
import PriceSummary from "../components/spongoingjob/PriceSummary";
import CompleteJobButton from "../components/spongoingjob/CompleteJobButton";
import OtpModal from "../components/spongoingjob/OtpModal";
import ExtraChargesModal from "../components/spongoingjob/ExtraChargesModal";

export default function OngoingJobScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStatus, setCurrentStatus] = useState("accepted");
  const [extraCharges, setExtraCharges] = useState(0);
  const [extraChargesReason, setExtraChargesReason] = useState("");
  const [afterPhoto, setAfterPhoto] = useState(null);
  const [showExtraChargesModal, setShowExtraChargesModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("customer@example.com"); // In real app, this would come from API

  // Get job ID from URL or navigation state
  const jobId = location.pathname.split('/').pop() || location.state?.jobId || "1";

  // Dummy job data - in real app, this would come from API
  const allJobs = {
    "1": {
      id: "1",
      customerName: "Amit Sharma",
      customerPhone: "+91 98765 43210",
      serviceType: "AC Repair",
      address: "123, Sector 15, Noida, Uttar Pradesh 201301",
      startTime: "2:00 PM",
      estimatedPrice: "₹800-1200",
      basePrice: 800
    },
    "3": {
      id: "3",
      customerName: "Rahul Verma",
      customerPhone: "+91 98765 54321",
      serviceType: "Electrician",
      address: "789, Phase 2, Delhi",
      startTime: "2:00 PM",
      estimatedPrice: "₹600-1000",
      basePrice: 600
    }
  };

  const job = allJobs[jobId] || allJobs["1"];

  const statusSteps = [
    { key: "accepted", label: "Accepted", icon: CheckCircle, completed: true },
    { key: "onway", label: "On the Way", icon: Navigation, completed: false },
    { key: "inprogress", label: "In Progress", icon: Briefcase, completed: false },
    { key: "completed", label: "Completed", icon: CheckCircle, completed: false }
  ];

  const updateStatus = (newStatus) => {
    if (newStatus === 'onway' && currentStatus === 'accepted') {
      // Direct update to onway - no OTP required
      setCurrentStatus('onway');
    } else if (newStatus === 'inprogress' && currentStatus === 'onway') {
      // Generate OTP and send to customer email for inprogress
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      sendOtpToEmail(customerEmail, otp);
      setShowOtpModal(true);
      setOtpSent(true);
    } else {
      setCurrentStatus(newStatus);
    }
  };

  const sendOtpToEmail = (email, otp) => {
    // Simulate sending OTP email (in real app, this would be an API call)
    console.log(`Sending OTP ${otp} to email: ${email}`);
    alert(`OTP ${otp} has been sent to ${email}`);
  };

  const verifyOtpAndProceed = () => {
    if (enteredOtp === generatedOtp) {
      setCurrentStatus('inprogress');
      setShowOtpModal(false);
      setEnteredOtp('');
      setOtpSent(false);
      alert('OTP verified! Status updated to "In Progress"');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handlePhotoUpload = () => {
    // Handle photo upload logic
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      setAfterPhoto(file);
    };
    input.click();
  };

  const handleCompleteJob = () => {
    if (!afterPhoto) {
      alert("Please upload the service completion photo first");
      return;
    }
    
    // Update status to completed first
    setCurrentStatus('completed');
    
    console.log("Job completed with data:", {
      jobId: job.id,
      extraCharges,
      extraChargesReason,
      afterPhoto
    });
    
    // Navigate to completion screen or dashboard
    navigate("/service-requests", { 
      state: { completedJobId: job.id }
    });
  };

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === currentStatus);
  };

  const totalPrice = job.basePrice + extraCharges;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <OngoingJobHeader />

      <div className="px-4 sm:px-6 lg:px-8 mt-8 py-6 max-w-6xl mx-auto space-y-6">
        {/* Status Tracker */}
        <StatusTracker 
          currentStatus={currentStatus}
          statusSteps={statusSteps}
          updateStatus={updateStatus}
          getCurrentStepIndex={getCurrentStepIndex}
          otpSent={otpSent}
          setShowOtpModal={setShowOtpModal}
          handleCompleteJob={handleCompleteJob}
          afterPhoto={afterPhoto}
        />

        {/* Job Info */}
        <JobInfo job={job} />

        {/* Extra Charges */}
        <ExtraCharges 
          extraCharges={extraCharges}
          extraChargesReason={extraChargesReason}
          onAddCharges={() => setShowExtraChargesModal(true)}
        />

        {/* Photo Upload */}
        <PhotoUpload 
          afterPhoto={afterPhoto}
          onPhotoUpload={handlePhotoUpload}
          onRemovePhoto={() => setAfterPhoto(null)}
        />

        {/* Price Summary */}
        <PriceSummary 
          job={job}
          extraCharges={extraCharges}
          totalPrice={totalPrice}
        />

        {/* Complete Job Button */}
        <CompleteJobButton 
          currentStatus={currentStatus}
          afterPhoto={afterPhoto}
          onCompleteJob={handleCompleteJob}
        />
      </div>

      {/* OTP Modal */}
      <OtpModal 
        showOtpModal={showOtpModal}
        customerEmail={customerEmail}
        enteredOtp={enteredOtp}
        onOtpChange={(value) => setEnteredOtp(value)}
        onCancel={() => {
          setShowOtpModal(false);
          setEnteredOtp('');
        }}
        onVerifyOtp={verifyOtpAndProceed}
      />

      {/* Extra Charges Modal */}
      <ExtraChargesModal 
        showExtraChargesModal={showExtraChargesModal}
        extraCharges={extraCharges}
        extraChargesReason={extraChargesReason}
        onAmountChange={(value) => setExtraCharges(value)}
        onReasonChange={(value) => setExtraChargesReason(value)}
        onCancel={() => setShowExtraChargesModal(false)}
        onAddCharges={() => setShowExtraChargesModal(false)}
      />
    </div>
  );
}
