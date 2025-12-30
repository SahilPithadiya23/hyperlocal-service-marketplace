import { Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { staticProvider } from "../../data/StaticProvider";

const ServicesList = ({ services = [] }) => {
  // backend se aaye to use karo, warna static
  const finalServices =
    Array.isArray(services) && services.length > 0
      ? services
      : staticProvider.services;

  return (
    <motion.section className="space-y-4">
      <h2 className="text-xl font-bold">Services</h2>

      {finalServices.map((s, i) => (
        <motion.div
          key={s._id || s.id || i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-white border rounded-2xl p-4 shadow-sm"
        >
          <div className="flex justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{s.name}</h3>

                {s.isPopular && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    Popular
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600">
                {s.description}
              </p>

              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <Clock className="w-4 h-4" />
                {s.duration}
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500">Starting at</p>
              <p className="text-lg font-bold">₹{s.price}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default ServicesList;
