import { LocationData } from "@/lib/data-generator";
import AQIGauge from "./AQIGauge";
import { Cloud, Droplets, Wind } from "lucide-react";

interface LocationCardProps {
  data: LocationData;
}

const statusColors: Record<LocationData['status'], string> = {
  'Good': 'text-green-600 bg-green-50',
  'Satisfactory': 'text-yellow-600 bg-yellow-50',
  'Moderately Polluted': 'text-orange-600 bg-orange-50',
  'Poor': 'text-red-600 bg-red-50',
  'Very Poor': 'text-purple-600 bg-purple-50',
  'Severe': 'text-red-900 bg-red-50',
};

export default function LocationCard({ data }: LocationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header with location name and status */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{data.name}</h3>
          <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[data.status]}`}>
            {data.status}
          </div>
        </div>
      </div>

      {/* AQI Gauge */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <AQIGauge value={data.aqi} size={150} />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Temperature */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Wind className="w-5 h-5 text-orange-600" />
            <span className="text-xs text-gray-600 font-medium uppercase">Temperature</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.temperature}°C</div>
        </div>

        {/* Humidity */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="w-5 h-5 text-blue-600" />
            <span className="text-xs text-gray-600 font-medium uppercase">Humidity</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.humidity}%</div>
        </div>
      </div>

      {/* PM2.5 */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Cloud className="w-5 h-5 text-gray-600" />
          <span className="text-xs text-gray-600 font-medium uppercase">PM2.5</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{Math.round(data.pm25)}</div>
      </div>

      {/* Detailed Pollutants */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-700 uppercase mb-3">Pollutants</h4>
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">PM10</div>
            <div className="text-sm font-semibold text-gray-900">{Math.round(data.pm10)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">O₃</div>
            <div className="text-sm font-semibold text-gray-900">{Math.round(data.o3)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">NO₂</div>
            <div className="text-sm font-semibold text-gray-900">{Math.round(data.no2)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">PM2.5</div>
            <div className="text-sm font-semibold text-gray-900">{Math.round(data.pm25)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
