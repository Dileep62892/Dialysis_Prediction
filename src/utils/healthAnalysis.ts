import { PatientData, HealthMarker } from '../types';
import { calculateGFR } from './calculations';

const NORMAL_RANGES = {
  creatinine: { min: 0.8, max: 1.4, unit: 'mg/dL' },
  gfr: { min: 60, max: 200, unit: 'mL/min/1.73m²' },
  bun: { min: 7, max: 20, unit: 'mg/dL' },
  potassium: { min: 3.5, max: 5.0, unit: 'mEq/L' }
};

export const calculateDeviation = (value: number, min: number, max: number): number => {
  if (value < min) {
    return ((min - value) / min) * 100;
  }
  if (value > max) {
    return ((value - max) / max) * 100;
  }
  return 0;
};

export const determineSeverity = (deviation: number): 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Critical' => {
  if (deviation <= 0) return 'Normal';
  if (deviation <= 20) return 'Mild';
  if (deviation <= 50) return 'Moderate';
  if (deviation <= 100) return 'Severe';
  return 'Critical';
};

export const analyzeHealthMarkers = (data: PatientData): HealthMarker[] => {
  const gfr = calculateGFR(data);
  const markers: HealthMarker[] = [];

  // Creatinine Analysis
  const creatinineDeviation = calculateDeviation(
    data.creatinine,
    NORMAL_RANGES.creatinine.min,
    NORMAL_RANGES.creatinine.max
  );
  markers.push({
    name: 'Creatinine',
    value: data.creatinine,
    normalRange: NORMAL_RANGES.creatinine,
    unit: NORMAL_RANGES.creatinine.unit,
    deviation: creatinineDeviation,
    severity: determineSeverity(creatinineDeviation)
  });

  // GFR Analysis
  const gfrDeviation = calculateDeviation(
    gfr,
    NORMAL_RANGES.gfr.min,
    NORMAL_RANGES.gfr.max
  );
  markers.push({
    name: 'eGFR',
    value: gfr,
    normalRange: NORMAL_RANGES.gfr,
    unit: NORMAL_RANGES.gfr.unit,
    deviation: gfrDeviation,
    severity: determineSeverity(gfrDeviation)
  });

  // BUN Analysis
  if (data.bun) {
    const bunDeviation = calculateDeviation(
      data.bun,
      NORMAL_RANGES.bun.min,
      NORMAL_RANGES.bun.max
    );
    markers.push({
      name: 'BUN',
      value: data.bun,
      normalRange: NORMAL_RANGES.bun,
      unit: NORMAL_RANGES.bun.unit,
      deviation: bunDeviation,
      severity: determineSeverity(bunDeviation)
    });
  }

  // Potassium Analysis
  if (data.potassium) {
    const potassiumDeviation = calculateDeviation(
      data.potassium,
      NORMAL_RANGES.potassium.min,
      NORMAL_RANGES.potassium.max
    );
    markers.push({
      name: 'Potassium',
      value: data.potassium,
      normalRange: NORMAL_RANGES.potassium,
      unit: NORMAL_RANGES.potassium.unit,
      deviation: potassiumDeviation,
      severity: determineSeverity(potassiumDeviation)
    });
  }

  return markers;
};