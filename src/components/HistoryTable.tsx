import React from 'react';
import { usePatientStore } from '../store/patientStore';
import { Trash2, Edit } from 'lucide-react';
import { calculateGFR } from '../utils/calculations';

export const HistoryTable: React.FC = () => {
  const records = usePatientStore((state) => state.records);
  const deleteRecord = usePatientStore((state) => state.deleteRecord);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creatinine</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GFR</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diabetes</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Pressure</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.map((record) => (
            <tr key={record.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(record.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{record.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{record.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">{record.creatinine} mg/dL</td>
              <td className="px-6 py-4 whitespace-nowrap">{calculateGFR(record)} mL/min/1.73m²</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {record.diabetesStatus ? 'Yes' : 'No'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {record.systolicBP}/{record.diastolicBP}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};