'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload, Download, AlertCircle } from 'lucide-react';

interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  onSuccess: () => void;
}

export default function ImportCSVModal({
  isOpen,
  onClose,
  organizationId,
  onSuccess,
}: ImportCSVModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  function downloadTemplate() {
    const csvContent = 'name,email,department,position,startDate\nJuan Pérez,juan@empresa.com,Desarrollo,Developer,2024-01-15\nMaría García,maria@empresa.com,Ventas,Ejecutiva,2024-02-01';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_empleados.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  async function handleFileUpload(file: File) {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      // Leer archivo CSV
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());

      if (lines.length < 2) {
        throw new Error('El archivo CSV está vacío o no tiene datos');
      }

      // Parsear CSV
      const headers = lines[0].split(',').map(h => h.trim());
      const employees = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const employee: any = {};

        headers.forEach((header, index) => {
          employee[header] = values[index] || '';
        });

        employees.push(employee);
      }

      // Enviar a API
      const res = await fetch('/api/employees/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId,
          employees,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error al importar empleados');
      }

      const data = await res.json();
      setResults(data.results);

      if (data.results.success > 0) {
        setTimeout(() => {
          onSuccess();
          if (data.results.failed === 0) {
            onClose();
          }
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      handleFileUpload(file);
    } else {
      setError('Por favor sube un archivo CSV válido');
    }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Importar Empleados CSV</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Instrucciones
            </h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Descarga la plantilla CSV de ejemplo</li>
              <li>Completa los datos de tus empleados</li>
              <li>Sube el archivo CSV completado</li>
            </ol>
          </div>

          {/* Download Template */}
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="w-full gap-2"
          >
            <Download className="w-4 h-4" />
            Descargar Plantilla CSV
          </Button>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 font-medium mb-2">
              Arrastra tu archivo CSV aquí
            </p>
            <p className="text-gray-500 text-sm mb-4">o</p>
            <label className="inline-block">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="hidden"
                disabled={loading}
              />
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 cursor-pointer inline-block">
                Seleccionar archivo
              </span>
            </label>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-3 text-gray-600">Importando empleados...</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-3">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✓ {results.success} empleado(s) importado(s) exitosamente
                </p>
              </div>

              {results.failed > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium mb-2">
                    ✗ {results.failed} empleado(s) fallaron
                  </p>
                  <ul className="text-sm text-red-700 space-y-1">
                    {results.errors.map((err: string, i: number) => (
                      <li key={i}>• {err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* CSV Format Info */}
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p className="font-medium mb-2">Formato del CSV:</p>
            <ul className="space-y-1">
              <li><strong>name</strong>: Nombre completo (requerido)</li>
              <li><strong>email</strong>: Email corporativo (requerido)</li>
              <li><strong>department</strong>: Departamento (opcional)</li>
              <li><strong>position</strong>: Puesto (opcional)</li>
              <li><strong>startDate</strong>: Fecha de ingreso YYYY-MM-DD (opcional)</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
