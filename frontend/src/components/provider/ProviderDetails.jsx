import { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  Shield,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";
import { tempProvider } from "../../data/tempProviderDetails";

const DetailSection = ({
  title,
  Icon,
  children,
  defaultExpanded = true,
}) => {
  const [open, setOpen] = useState(defaultExpanded);

  return (
    <div className="bg-white rounded-xl shadow border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500" />
        )}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.25 }}
          className="px-4 pb-4 text-sm text-slate-600"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

const ProviderDetails = () => {
  const { providerId } = useParams();
  const [provider, setProvider] = useState(tempProvider);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/providers/${providerId}`
        );
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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4 px-2 sm:px-0"
    >
      <h2 className="text-lg sm:text-xl font-bold text-slate-800">
        Provider Details
      </h2>

      {/* About */}
      <div className="bg-white rounded-xl p-4 shadow border">
        <h3 className="font-semibold mb-2 text-slate-800">About</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {provider.about}
        </p>
      </div>

      {/* Availability */}
      <DetailSection title="Availability" Icon={Clock}>
        <div className="flex justify-between">
          <span>{provider.workingHours?.days}</span>
          <span className="font-medium text-slate-800">
            {provider.workingHours?.hours}
          </span>
        </div>
        <p className="text-xs mt-1">Sunday: Closed</p>
      </DetailSection>

      {/* Service Area */}
      <DetailSection title="Service Area" Icon={MapPin}>
        <div className="flex flex-wrap gap-2">
          {provider.serviceArea?.map((area, i) => (
            <span
              key={i}
              className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded"
            >
              {area}
            </span>
          ))}
        </div>
      </DetailSection>

      {/* Trust & Safety */}
      <DetailSection title="Trust & Safety" Icon={Shield}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {provider.credentials?.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </DetailSection>

      {/* Contact Details */}
      <DetailSection title="Contact Details" Icon={AlertCircle}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Phone</span>
            </div>
            <a
              href={`tel:${provider.contact?.phone}`}
              className="font-medium text-slate-800 hover:text-blue-600"
            >
              {provider.contact?.phone}
            </a>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Email</span>
            </div>
            <a
              href={`mailto:${provider.contact?.email}`}
              className="font-medium text-slate-800 hover:text-blue-600 break-all"
            >
              {provider.contact?.email}
            </a>
          </div>
        </div>
      </DetailSection>
    </motion.section>
  );
};

export default ProviderDetails;
