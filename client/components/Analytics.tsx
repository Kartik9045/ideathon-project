import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AnalyticsData } from "@/lib/data-generator";
import { AlertCircle } from "lucide-react";

interface AnalyticsProps {
  data: AnalyticsData;
}

export default function Analytics({ data }: AnalyticsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sort locations by AQI for comparison
  const sortedByAQI = [...data.locations].sort((a, b) => b.aqi - a.aqi);
  const highestAQI = sortedByAQI[0];
  const lowestAQI = sortedByAQI[sortedByAQI.length - 1];

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-80 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-80 animate-pulse" />
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-80 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AQI Trend Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AQI Trend - Last 24 Hours</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.aqiTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              domain={[0, 500]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [Math.round(value), 'AQI']}
            />
            <Line
              type="monotone"
              dataKey="aqi"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Temperature & Humidity Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Temperature Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.aqiTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: '#6b7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [Math.round(value) + '°C', 'Temp']}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Humidity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Humidity Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.aqiTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [Math.round(value) + '%', 'Humidity']}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pollutants Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pollutants by Location</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.pollutantData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="pm25" fill="#f97316" name="PM2.5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pm10" fill="#ef4444" name="PM10" radius={[4, 4, 0, 0]} />
            <Bar dataKey="o3" fill="#8b5cf6" name="O₃" radius={[4, 4, 0, 0]} />
            <Bar dataKey="no2" fill="#06b6d4" name="NO₂" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Zone Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highest AQI Zone */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200 p-6">
          <div className="flex items-start gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-700 uppercase mb-1">High AQI Zone</h4>
              <div className="text-2xl font-bold text-gray-900">{highestAQI.name}</div>
              <div className="text-3xl font-bold text-red-600 mt-2">{Math.round(highestAQI.aqi)}</div>
              <p className="text-sm text-gray-600 mt-2">{highestAQI.status}</p>
            </div>
          </div>
        </div>

        {/* Lowest AQI Zone */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-700 uppercase mb-1">Low AQI Zone</h4>
              <div className="text-2xl font-bold text-gray-900">{lowestAQI.name}</div>
              <div className="text-3xl font-bold text-green-600 mt-2">{Math.round(lowestAQI.aqi)}</div>
              <p className="text-sm text-gray-600 mt-2">{lowestAQI.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* All Zones Ranking */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Zones Ranked by AQI</h3>
        <div className="space-y-3">
          {sortedByAQI.map((zone, index) => (
            <div key={zone.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className="text-sm font-bold text-gray-500 w-6 text-center">#{index + 1}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                <div className="text-xs text-gray-600">{zone.status}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{Math.round(zone.aqi)}</div>
                <div className="text-xs text-gray-600">AQI</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
