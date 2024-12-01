import { PatientData, PredictionResult } from '../types';
import { calculateGFR } from './calculations';

export const calculateDialysisPrediction = (data: PatientData): PredictionResult => {
  const gfr = calculateGFR(data);
  
  // Updated prediction model including GFR
  const riskFactors = [
    data.creatinine > 4.0,
    data.diabetesStatus,
    data.systolicBP > 180 || data.systolicBP < 90,
    data.diastolicBP > 120 || data.diastolicBP < 60,
    data.age > 65,
    gfr < 15 // Stage 5 CKD / ESRD
  ];

  const riskScore = riskFactors.filter(Boolean).length;
  const needsDialysis = riskScore >= 3 || gfr < 15;
  const confidence = (riskScore / riskFactors.length) * 100;

  const recommendations = [
    `Current GFR: ${gfr} mL/min/1.73m²`,
    gfr < 60 ? 'Consider consultation with a nephrologist' : 'Maintain healthy kidney function',
    'Maintain a balanced diet low in sodium and phosphorus',
    'Monitor blood pressure regularly',
    'Take prescribed medications as directed',
    'Stay hydrated within recommended fluid limits',
    'Consult with your healthcare provider regularly'
  ];

  return {
    needsDialysis,
    confidence,
    recommendations,
    gfr
  };
};