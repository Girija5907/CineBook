import React from 'react';

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-zinc-900/40 border border-zinc-800/60 animate-pulse">
      <div className="aspect-[2/3] w-full bg-zinc-800/60" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800/60 rounded w-1/2" />
        <div className="h-9 bg-zinc-800 rounded-xl w-full mt-2" />
      </div>
    </div>
  );
};
