import { getAQIColor } from "@/lib/data-generator";

interface AQIGaugeProps {
  value: number;
  size?: number;
}

export default function AQIGauge({ value, size = 200 }: AQIGaugeProps) {
  // Ensure value is within 0-500
  const normalizedValue = Math.max(0, Math.min(500, value));
  const percentage = (normalizedValue / 500) * 100;
  
  // SVG dimensions
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const color = getAQIColor(normalizedValue);

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-4xl font-bold text-gray-900">
          {Math.round(normalizedValue)}
        </div>
        <div className="text-sm text-gray-600">AQI</div>
      </div>
    </div>
  );
}
