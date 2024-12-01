import React from 'react';
import { Activity, Heart, Stethoscope, Thermometer } from 'lucide-react';
import { PatientData } from '../types';
import { calculateGFR } from '../utils/calculations';

interface StatisticsPanelProps {
  data: PatientData[];
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ data }) => {
  const calculateStats = () => {
    if (data.length === 0) return null;

    const gfrValues = data.map((record) => calculateGFR(record));
    const avgGFR = gfrValues.reduce((a, b) => a + b, 0) / gfrValues.length;
    const avgCreatinine = data.reduce((a, b) => a + b.creatinine, 0) / data.length;
    const avgSystolic = data.reduce((a, b) => a + b.systolicBP, 0) / data.length;
    const diabetesCount = data.filter((record) => record.diabetesStatus).length;

    return {
      avgGFR: avgGFR.toFixed(1),
      avgCreatinine: avgCreatinine.toFixed(2),
      avgSystolic: avgSystolic.toFixed(0),
      diabetesPercentage: ((diabetesCount / data.length) * 100).toFixed(0),
    };
  };

  const stats = calculateStats();
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Average GFR</p>
            <p className="text-2xl font-semibold">{stats.avgGFR}</p>
          </div>
          <Stethoscope className="h-8 w-8 text-blue-500" />
        </div>
        <p className="text-xs text-gray-400 mt-2">mL/min/1.73m²</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Avg Creatinine</p>
            <p className="text-2xl font-semibold">{stats.avgCreatinine}</p>
          </div>
          <Activity className="h-8 w-8 text-purple-500" />
        </div>
        <p className="text-xs text-gray-400 mt-2">mg/dL</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Avg Systolic BP</p>
            <p className="text-2xl font-semibold">{stats.avgSystolic}</p>
          </div>
          <Heart className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-xs text-gray-400 mt-2">mmHg</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Diabetes Rate</p>
            <p className="text-2xl font-semibold">{stats.diabetesPercentage}%</p>
          </div>
          <Thermometer className="h-8 w-8 text-orange-500" />
        </div>
        <p className="text-xs text-gray-400 mt-2">of all patients</p>
      </div>
    </div>
  );
};