import { useState, useEffect } from "react";
import { Star, Shield, Clock, Briefcase, ChevronRight, ChevronLeft, Check, Calendar, MapPin, CreditCard, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookingModel from "../booking/BookingModel";

// Static fallback data
const tempProvider = {
  id: 1,
  name: "John Doe",
  category: "Plumbing",
  subcategory: "Pipe Repair",
  rating: 4.8,
  totalReviews: 120,
  yearsExperience: 5,
  isVerified: true,
  credentials: ["Licensed", "Insured"],
  responseTime: "Within 2 hours",
  visitingCost: 99,
  services: [
    { id: 1, name: "Pipe Fix", duration: "1 hr", price: 50 },
    { id: 2, name: "Leak Repair", duration: "2 hrs", price: 80 },
  ],
};

export default function ProviderHeader() {
  const { providerId } = useParams(); // get providerId from route
  const [provider, setProvider] = useState(tempProvider);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/providers/${providerId}`);
        if (res.data && Object.keys(res.data).length > 0) {
          setProvider(res.data);
        }
      } catch (err) {
        console.log("Backend not available, using static data");
      }
    };

    if (providerId) fetchProvider();
  }, [providerId]);

  return (
    <section className="rounded-2xl p-6 bg-blue-50 shadow-lg border border-blue-200">
      {/* Provider Header */}
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="relative mx-auto md:mx-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold">
            {provider.name.split(" ").map((n) => n[0]).join("")}
          </div>
          {provider.isVerified && (
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow">
              <Shield className="text-green-600 w-5 h-5" />
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl font-bold">{provider.name}</h1>
          <p className="text-sm text-slate-600 mb-2">{provider.category} • {provider.subcategory}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm mb-3">
            <div className="flex items-center gap-1"><Star className="fill-yellow-400 text-yellow-400 w-4" />{provider.rating} <span className="text-slate-600">({provider.totalReviews})</span></div>
            <div className="flex items-center gap-1 text-slate-600"><Briefcase className="w-4" />{provider.yearsExperience} yrs experience</div>
            {provider.isVerified && <div className="flex items-center gap-1 text-green-600"><Shield className="w-4" />Verified</div>}
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
            {provider.credentials?.map((c,i) => <span key={i} className="bg-white/70 px-2 py-1 rounded text-xs border">✔ {c}</span>)}
          </div>
          <div className="flex justify-center md:justify-start items-center gap-1 text-sm text-slate-600"><Clock className="w-4" />{provider.responseTime}</div>
        </div>

        <div className="w-full md:w-auto">
          <button onClick={() => setIsBookingOpen(true)} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">Book Service</button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModel 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        provider={provider} 
      />
    </section>
  );
}
