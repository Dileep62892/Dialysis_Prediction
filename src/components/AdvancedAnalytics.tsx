import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { PatientData } from '../types';
import { calculateGFR } from '../utils/calculations';

interface AdvancedAnalyticsProps {
  data: PatientData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ data }) => {
  // GFR Stage Distribution
  const getGFRStage = (gfr: number) => {
    if (gfr >= 90) return 'Stage 1';
    if (gfr >= 60) return 'Stage 2';
    if (gfr >= 30) return 'Stage 3';
    if (gfr >= 15) return 'Stage 4';
    return 'Stage 5';
  };

  const gfrDistribution = data.reduce((acc: Record<string, number>, record) => {
    const stage = getGFRStage(calculateGFR(record));
    acc[stage] = (acc[stage] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(gfrDistribution).map(([name, value]) => ({
    name,
    value
  }));

  // Risk Factor Analysis
  const riskFactorData = data.map(record => {
    const gfr = calculateGFR(record);
    return {
      name: new Date(record.date).toLocaleDateString(),
      creatinine: record.creatinine * 10, // Scaled for visibility
      bloodPressure: record.systolicBP / 2, // Scaled for visibility
      gfr: gfr,
      diabetes: record.diabetesStatus ? 50 : 0 // Binary indicator
    };
  });

  // Monthly Trends
  const monthlyData = data.reduce((acc: any[], record) => {
    const month = new Date(record.date).toLocaleDateString('en-US', { month: 'short' });
    const existingMonth = acc.find(item => item.month === month);
    
    if (existingMonth) {
      existingMonth.count += 1;
      existingMonth.avgGFR = (existingMonth.avgGFR * (existingMonth.count - 1) + calculateGFR(record)) / existingMonth.count;
    } else {
      acc.push({
        month,
        count: 1,
        avgGFR: calculateGFR(record)
      });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GFR Stage Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">CKD Stage Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Factor Analysis */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Risk Factor Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={[riskFactorData[riskFactorData.length - 1]]}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar name="Creatinine" dataKey="creatinine" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Blood Pressure" dataKey="bloodPressure" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Radar name="GFR" dataKey="gfr" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
              <Radar name="Diabetes" dataKey="diabetes" stroke="#ff8042" fill="#ff8042" fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly GFR Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgGFR" name="Average GFR" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};