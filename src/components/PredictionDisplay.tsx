import React from 'react';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { PatientData, PredictionResult } from '../types';
import { calculateDialysisPrediction } from '../utils/predictions';

interface PredictionDisplayProps {
  data: PatientData;
}

export const PredictionDisplay: React.FC<PredictionDisplayProps> = ({ data }) => {
  const prediction: PredictionResult = calculateDialysisPrediction(data);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Prediction Results</h2>
        <Activity className="h-6 w-6 text-blue-600" />
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-2">
          {prediction.needsDialysis ? (
            <AlertTriangle className="h-6 w-6 text-red-500" />
          ) : (
            <CheckCircle className="h-6 w-6 text-green-500" />
          )}
          <span className="text-lg font-medium">
            {prediction.needsDialysis
              ? 'Dialysis may be needed'
              : 'Dialysis likely not needed'}
          </span>
        </div>
        <div className="mt-2">
          <div className="text-sm text-gray-600">
            Confidence: {prediction.confidence.toFixed(1)}%
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Recommendations:</h3>
        <ul className="space-y-2">
          {prediction.recommendations.map((rec, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="mr-2">•</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};