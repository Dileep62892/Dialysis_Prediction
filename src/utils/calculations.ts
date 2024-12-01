import { PatientData } from '../types';

export const calculateGFR = (data: PatientData): number => {
  // Using the CKD-EPI Creatinine Equation (2021)
  // Reference: https://www.kidney.org/content/ckd-epi-creatinine-equation-2021
  
  const { age, creatinine } = data;
  const isFemale = false; // Add gender to PatientData if needed for more accurate calculation
  
  const k = isFemale ? 0.7 : 0.9;
  const a = isFemale ? -0.241 : -0.302;
  const s = isFemale ? 1.012 : 1;
  
  const creatinineDivK = creatinine / k;
  const min = Math.min(creatinineDivK, 1);
  const max = Math.max(creatinineDivK, 1);
  
  let gfr = 142 * 
    Math.pow(min, -0.241) * 
    Math.pow(max, a) * 
    Math.pow(0.9938, age) * 
    s;
    
  return Math.round(gfr * 10) / 10; // Round to 1 decimal place
};