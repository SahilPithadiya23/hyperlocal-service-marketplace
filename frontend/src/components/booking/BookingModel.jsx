import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check, Calendar, Clock, MapPin, CreditCard } from "lucide-react";

// Time slots (static fallback)
const availableTimeSlots = [
  { id: 1, time: "10:00 AM", available: true },
  { id: 2, time: "11:00 AM", available: true },
  { id: 3, time: "12:00 PM", available: false },
];

// Booking steps
const steps = [
  { id: "service", label: "Service", icon: Check },
  { id: "datetime", label: "Date & Time", icon: Calendar },
  { id: "address", label: "Address", icon: MapPin },
  { id: "summary", label: "Confirm", icon: CreditCard },
];

export default function BookingModel({ isOpen, onClose, provider }) {
  const [currentStep, setCurrentStep] = useState("service");
  const [bookingData, setBookingData] = useState({
    service: null,
    date: "",
    timeSlot: null,
    address: { street: "", apartment: "", city: "", zipCode: "" },
  });

  if (!isOpen) return null;

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    const order = ["service", "datetime", "address", "summary"];
    const idx = order.indexOf(currentStep);
    if (idx < order.length - 1) setCurrentStep(order[idx + 1]);
  };

  const handleBack = () => {
    const order = ["service", "datetime", "address", "summary"];
    const idx = order.indexOf(currentStep);
    if (idx > 0) setCurrentStep(order[idx - 1]);
  };

  const handleConfirmBooking = () => {
    alert(`Booking Confirmed! ${bookingData.service?.name} with ${provider.name}`);
    onClose();
    setCurrentStep("service");
    setBookingData({ service: null, date: "", timeSlot: null, address: { street: "", apartment: "", city: "", zipCode: "" } });
  };

  const canProceed = () => {
    switch (currentStep) {
      case "service": return bookingData.service !== null;
      case "datetime": return bookingData.date && bookingData.timeSlot;
      case "address": return bookingData.address.street && bookingData.address.city && bookingData.address.zipCode;
      default: return true;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.95 }} 
        className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">Book Service</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800"><X className="w-5 h-5" /></button>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${idx < currentStepIndex ? 'bg-green-500 text-white' : idx === currentStepIndex ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {idx < currentStepIndex ? <Check className="w-4 h-4"/> : idx+1}
              </div>
              {idx < steps.length -1 && <div className={`flex-1 h-0.5 ${idx < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === "service" && (
            <motion.div key="service" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="space-y-3">
              <h3 className="font-semibold">Select a Service</h3>
              {provider.services.map((s) => (
                <div key={s.id} className={`p-3 border rounded cursor-pointer ${bookingData.service?.id===s.id?'border-blue-600 bg-blue-50':'hover:bg-gray-50'}`} onClick={()=>setBookingData({...bookingData, service:s})}>
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-sm text-gray-500">{s.duration}</div>
                    </div>
                    <div className="font-bold">₹{s.price}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {currentStep === "datetime" && (
            <motion.div key="datetime" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="space-y-4">
              <div>
                <label className="font-semibold flex items-center gap-2"><Calendar className="w-4 h-4"/> Select Date</label>
                <input type="date" className="w-full border p-2 rounded mt-1" value={bookingData.date} onChange={e=>setBookingData({...bookingData, date:e.target.value})}/>
              </div>
              <div>
                <label className="font-semibold flex items-center gap-2"><Clock className="w-4 h-4"/> Select Time</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {availableTimeSlots.map(t => (
                    <button key={t.id} disabled={!t.available} className={`p-2 rounded border ${bookingData.timeSlot?.id===t.id?'bg-blue-600 text-white':'hover:bg-gray-100'}`} onClick={()=>setBookingData({...bookingData,timeSlot:t})}>{t.time}</button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === "address" && (
            <motion.div key="address" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="space-y-3">
              <div>
                <label className="font-semibold">Street *</label>
                <input type="text" className="w-full border p-2 rounded" value={bookingData.address.street} onChange={e=>setBookingData({...bookingData,address:{...bookingData.address,street:e.target.value}})} />
              </div>
              <div>
                <label className="font-semibold">Apartment</label>
                <input type="text" className="w-full border p-2 rounded" value={bookingData.address.apartment} onChange={e=>setBookingData({...bookingData,address:{...bookingData.address,apartment:e.target.value}})} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold">City *</label>
                  <input type="text" className="w-full border p-2 rounded" value={bookingData.address.city} onChange={e=>setBookingData({...bookingData,address:{...bookingData.address,city:e.target.value}})} />
                </div>
                <div>
                  <label className="font-semibold">ZIP *</label>
                  <input type="text" className="w-full border p-2 rounded" value={bookingData.address.zipCode} onChange={e=>setBookingData({...bookingData,address:{...bookingData.address,zipCode:e.target.value}})} />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === "summary" && (
            <motion.div key="summary" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="space-y-3">
              <h3 className="font-semibold">Booking Summary</h3>
              <div className="p-3 border rounded space-y-2">
                <div className="flex justify-between"><span>Service</span><span>{bookingData.service?.name}</span></div>
                <div className="flex justify-between"><span>Date</span><span>{bookingData.date}</span></div>
                <div className="flex justify-between"><span>Time</span><span>{bookingData.timeSlot?.time}</span></div>
                <div className="flex justify-between"><span>Address</span><span>{bookingData.address.street} {bookingData.address.apartment}, {bookingData.address.city}, {bookingData.address.zipCode}</span></div>
              </div>
              <div className="p-3 border rounded bg-blue-50 flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-bold">₹{bookingData.service?.price}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex gap-2 mt-4">
          {currentStep!=="service" && <button onClick={handleBack} className="flex-1 py-2 px-3 border rounded flex items-center justify-center gap-1"><ChevronLeft className="w-4 h-4"/> Back</button>}
          {currentStep==="summary" ? <button onClick={handleConfirmBooking} className="flex-1 py-2 px-3 bg-blue-600 text-white rounded">Confirm</button> : <button onClick={handleNext} disabled={!canProceed()} className="flex-1 py-2 px-3 bg-blue-100 disabled:opacity-50 rounded flex items-center justify-center gap-1">Continue <ChevronRight className="w-4 h-4"/></button>}
        </div>
      </motion.div>
    </div>
  );
}
