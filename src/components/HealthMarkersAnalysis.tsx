import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { PatientData, HealthMarker } from '../types';
import { analyzeHealthMarkers } from '../utils/healthAnalysis';

interface HealthMarkersAnalysisProps {
  data: PatientData;
}

const SeverityIcon = ({ severity }: { severity: HealthMarker['severity'] }) => {
  switch (severity) {
    case 'Critical':
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    case 'Severe':
      return <AlertTriangle className="h-5 w-5 text-orange-600" />;
    case 'Moderate':
      return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    case 'Mild':
      return <AlertTriangle className="h-5 w-5 text-blue-600" />;
    default:
      return <CheckCircle className="h-5 w-5 text-green-600" />;
  }
};

export const HealthMarkersAnalysis: React.FC<HealthMarkersAnalysisProps> = ({ data }) => {
  const markers = analyzeHealthMarkers(data);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Health Markers Analysis</h2>
      <div className="space-y-6">
        {markers.map((marker) => (
          <div key={marker.name} className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <SeverityIcon severity={marker.severity} />
                <span className="font-medium">{marker.name}</span>
              </div>
              <span className={`text-sm font-semibold ${
                marker.severity === 'Normal' ? 'text-green-600' :
                marker.severity === 'Critical' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {marker.severity}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Current Value:</span>
                <span className="ml-2 font-medium">
                  {marker.value.toFixed(1)} {marker.unit}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Normal Range:</span>
                <span className="ml-2">
                  {marker.normalRange.min}-{marker.normalRange.max} {marker.unit}
                </span>
              </div>
            </div>
            
            {marker.deviation > 0 && (
              <div className="mt-2 text-sm">
                <span className="text-gray-600">Deviation:</span>
                <span className="ml-2 font-medium text-red-600">
                  {marker.deviation.toFixed(1)}% {marker.value > marker.normalRange.max ? 'above' : 'below'} normal range
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};