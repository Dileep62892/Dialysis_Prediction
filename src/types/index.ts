export interface PatientData {
  id: string;
  date: string;
  name: string;
  age: number;
  creatinine: number;
  diabetesStatus: boolean;
  systolicBP: number;
  diastolicBP: number;
  gfr?: number;
  bun?: number;
  potassium?: number;
}

export interface PredictionResult {
  needsDialysis: boolean;
  confidence: number;
  recommendations: string[];
  gfr: number;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  deviations: {
    creatinine: number;
    gfr: number;
    bun?: number;
    potassium?: number;
  };
}

export interface ChartData {
  date: string;
  creatinine: number;
  systolicBP: number;
  diastolicBP: number;
  gfr: number;
  bun?: number;
  potassium?: number;
}

export interface HealthMarker {
  name: string;
  value: number;
  normalRange: { min: number; max: number };
  unit: string;
  deviation: number;
  severity: 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Critical';
}