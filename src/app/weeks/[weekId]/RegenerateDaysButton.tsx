'use client';

import React from 'react';

export default function RegenerateDaysButton({ weekId }: { weekId: string }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegenerate = async () => {
    if (!confirm('This will delete all existing daily entries for this week and recreate them with the Penguin Class timetable. Are you sure?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/weeks/${weekId}/regen-days`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('Daily entries regenerated successfully!');
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to regenerate daily entries'}`);
      }
    } catch (error) {
      alert('Error regenerating daily entries');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRegenerate}
      disabled={isLoading}
      className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg border hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? '🔄 Regenerating...' : '🔄 Regenerate Days'}
    </button>
  );
}
