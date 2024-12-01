import React from 'react';
import { Activity } from 'lucide-react';
import { DataEntryForm } from './components/DataEntryForm';
import { HistoryTable } from './components/HistoryTable';
import { PredictionDisplay } from './components/PredictionDisplay';
import { AnalysisCharts } from './components/AnalysisCharts';
import { StatisticsPanel } from './components/StatisticsPanel';
import { AdvancedAnalytics } from './components/AdvancedAnalytics';
import { HealthMarkersAnalysis } from './components/HealthMarkersAnalysis';
import { usePatientStore } from './store/patientStore';

function App() {
  const records = usePatientStore((state) => state.records);
  const latestRecord = records[records.length - 1];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Kidney Health Analysis System
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {records.length > 0 && <StatisticsPanel data={records} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Enter Patient Data</h2>
            <DataEntryForm />
          </div>

          {latestRecord && (
            <div className="space-y-6">
              <HealthMarkersAnalysis data={latestRecord} />
              <PredictionDisplay data={latestRecord} />
            </div>
          )}
        </div>

        {records.length > 0 && (
          <>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Advanced Analytics</h2>
              <AdvancedAnalytics data={records} />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Trend Analysis</h2>
              <AnalysisCharts data={records} />
            </div>
          </>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Patient History</h2>
          <HistoryTable />
        </div>
      </main>
    </div>
  );
}

export default App;