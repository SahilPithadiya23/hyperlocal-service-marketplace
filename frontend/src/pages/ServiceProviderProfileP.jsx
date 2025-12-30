

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ServicesList from "../components/provider/ServicesList";
import ReviewsSection from "../components/provider/ReviewSection";
import ProviderDetails from "../components/provider/ProviderDetails";
import ServiceProviderHeader from "../components/provider/ProviderHeader";
import UserNavbar from "../components/profile/UserNavbar";

import { staticProvider } from "../data/StaticProvider";

const ServiceProviderP = () => {
  const { providerId } = useParams();

  const [provider, setProvider] = useState(staticProvider);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/providers/${providerId}`
        );
        setProvider(res.data);
      } catch (err) {
        console.log("Backend not available, using static data");
        setProvider(staticProvider);
      }
    };

    fetchProvider();
  }, [providerId]);

  return (
    <div className="min-h-screen bg-slate-50">
      <UserNavbar />
      <div className="h-2 bg-slate-100"></div>

      <ServiceProviderHeader provider={provider} />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ServicesList services={provider.services || []} />
            <ReviewsSection providerId={providerId} />
          </div>

          <div>
            <ProviderDetails provider={provider} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceProviderP;
