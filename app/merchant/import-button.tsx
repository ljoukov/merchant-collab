'use client';

import { useState } from 'react';

export default function ImportButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/merchant/import', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Import failed');
      // Handle success
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleImport}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
    >
      {isLoading ? 'Importing...' : 'Import Products'}
    </button>
  );
}
