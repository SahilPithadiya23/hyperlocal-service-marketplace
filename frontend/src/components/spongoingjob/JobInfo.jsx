import { User, MapPin, Clock, Phone } from "lucide-react";

export function JobInfo({ job }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">{job.serviceType}</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-4 h-4" />
          <span className="text-sm">{job.customerName}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{job.address}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Started at {job.startTime}</span>
        </div>
      </div>
    </div>
  );
}

export default JobInfo;
