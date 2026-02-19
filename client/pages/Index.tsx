import { useEffect, useState } from "react";
import { AnalyticsData, generateAllData, updateDataIncrementally } from "@/lib/data-generator";
import LocationCard from "@/components/LocationCard";
import Analytics from "@/components/Analytics";
import { Wind, MapPin } from "lucide-react";

export default function Index() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate initial data
    const initialData = generateAllData();
    setData(initialData);
    setIsLoading(false);

    // Set up interval to refresh data every 30 seconds with incremental changes
    const interval = setInterval(() => {
      setData((prevData) => {
        if (!prevData) return prevData;
        return updateDataIncrementally(prevData);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);


  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AQI data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AQI Monitor</h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Delhi, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Real-time AQI Data:</span> Air Quality Index (AQI) measures air pollution from 0-500. Lower values indicate better air quality. Data is currently simulated as hardware setup is in progress.
          </p>
        </div>

        {/* Locations Grid */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Current Air Quality by Location</h2>
            <p className="text-gray-600 mt-1">Real-time metrics for Delhi zones</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.locations.map((location) => (
              <LocationCard key={location.id} data={location} />
            ))}
          </div>
        </section>

        {/* Analytics Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
            <p className="text-gray-600 mt-1">Detailed trends and comparisons</p>
          </div>
          <Analytics data={data} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">About AQI</h3>
              <p className="text-sm text-gray-600">
                The Air Quality Index (AQI) is a number used to communicate how polluted the air currently is or how polluted it is forecast to become.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">AQI Ranges</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><span className="font-medium">0-50:</span> Good</li>
                <li><span className="font-medium">51-100:</span> Satisfactory</li>
                <li><span className="font-medium">101-200:</span> Moderately Polluted</li>
                <li><span className="font-medium">201-300:</span> Poor</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Data Source</h3>
              <p className="text-sm text-gray-600">
                Simulated data for demonstration purposes. Integration with IoT sensors coming soon.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 AQI Monitor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
