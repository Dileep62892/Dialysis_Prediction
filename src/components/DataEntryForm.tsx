import React, { useState } from 'react';
import { usePatientStore } from '../store/patientStore';
import { PatientData } from '../types';

export const DataEntryForm: React.FC = () => {
  const addRecord = usePatientStore((state) => state.addRecord);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    creatinine: '',
    diabetesStatus: false,
    systolicBP: '',
    diastolicBP: '',
    bun: '',
    potassium: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: PatientData = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      name: formData.name,
      age: Number(formData.age),
      creatinine: Number(formData.creatinine),
      diabetesStatus: formData.diabetesStatus,
      systolicBP: Number(formData.systolicBP),
      diastolicBP: Number(formData.diastolicBP),
      bun: formData.bun ? Number(formData.bun) : undefined,
      potassium: formData.potassium ? Number(formData.potassium) : undefined
    };
    addRecord(newRecord);
    setFormData({
      name: '',
      age: '',
      creatinine: '',
      diabetesStatus: false,
      systolicBP: '',
      diastolicBP: '',
      bun: '',
      potassium: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Patient Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Creatinine Level (mg/dL)</label>
        <input
          type="number"
          step="0.1"
          value={formData.creatinine}
          onChange={(e) => setFormData({ ...formData, creatinine: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">BUN (mg/dL)</label>
        <input
          type="number"
          step="0.1"
          value={formData.bun}
          onChange={(e) => setFormData({ ...formData, bun: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Potassium (mEq/L)</label>
        <input
          type="number"
          step="0.1"
          value={formData.potassium}
          onChange={(e) => setFormData({ ...formData, potassium: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={formData.diabetesStatus}
            onChange={(e) => setFormData({ ...formData, diabetesStatus: e.target.checked })}
            className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Diabetes Status
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Systolic BP</label>
          <input
            type="number"
            value={formData.systolicBP}
            onChange={(e) => setFormData({ ...formData, systolicBP: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Diastolic BP</label>
          <input
            type="number"
            value={formData.diastolicBP}
            onChange={(e) => setFormData({ ...formData, diastolicBP: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit Data
      </button>
    </form>
  );
};