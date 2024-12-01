import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PatientData } from '../types';

interface PatientStore {
  records: PatientData[];
  addRecord: (data: PatientData) => void;
  deleteRecord: (id: string) => void;
  updateRecord: (id: string, data: PatientData) => void;
}

export const usePatientStore = create<PatientStore>()(
  persist(
    (set) => ({
      records: [],
      addRecord: (data) =>
        set((state) => ({ records: [...state.records, data] })),
      deleteRecord: (id) =>
        set((state) => ({
          records: state.records.filter((record) => record.id !== id),
        })),
      updateRecord: (id, data) =>
        set((state) => ({
          records: state.records.map((record) =>
            record.id === id ? data : record
          ),
        })),
    }),
    {
      name: 'patient-storage',
    }
  )
);