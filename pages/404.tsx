import React from 'react';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-azure-blue flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-wine-red mb-4">404</h1>
        <p className="text-wine-red">Diese Seite wurde nicht gefunden.</p>
      </div>
    </div>
  );
}