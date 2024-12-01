import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { PatientData } from '../types';
import { calculateGFR } from '../utils/calculations';

interface AnalysisChartsProps {
  data: PatientData[];
}

export const AnalysisCharts: React.FC<AnalysisChartsProps> = ({ data }) => {
  const chartData = data.map(record => ({
    date: new Date(record.date).toLocaleDateString(),
    creatinine: record.creatinine,
    systolicBP: record.systolicBP,
    diastolicBP: record.diastolicBP,
    gfr: calculateGFR(record)
  }));

  return (
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">GFR Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="gfr"
              stroke="#8b5cf6"
              name="GFR (mL/min/1.73m²)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Creatinine Levels Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="creatinine"
              stroke="#2563eb"
              name="Creatinine (mg/dL)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Blood Pressure Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="systolicBP"
              stroke="#dc2626"
              name="Systolic BP"
            />
            <Line
              type="monotone"
              dataKey="diastolicBP"
              stroke="#059669"
              name="Diastolic BP"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};