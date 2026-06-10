'use client';

import { Canvas3D } from '@/components/Canvas3D';
import { useExplorerStore } from '@/store/useExplorerStore';

export default function Home() {
  const { currentStructure, selectStructure } = useExplorerStore();

  const structures = [
    { id: 'left-ventricle', name: 'Left Ventricle', color: '#dc2626' },
    { id: 'right-ventricle', name: 'Right Ventricle', color: '#991b1b' },
    { id: 'left-atrium', name: 'Left Atrium', color: '#ef4444' },
    { id: 'right-atrium', name: 'Right Atrium', color: '#f87171' },
    { id: 'aorta', name: 'Aorta', color: '#fca5a5' },
    { id: 'pulmonary-artery', name: 'Pulmonary Artery', color: '#60a5fa' }
  ];

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#060810] text-slate-100 font-sans">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas3D />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-7 py-4 bg-gradient-to-b from-[#060810]/90 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-700 to-red-500 flex items-center justify-center text-xl shadow-[0_0_0_1px_rgba(239,68,68,0.3),0_0_26px_rgba(185,28,28,0.55)]">
            🫀
          </div>
          <span className="font-bold text-lg tracking-tight">AnatomyOS</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-sm font-medium pointer-events-auto">
          <span 
            className="text-slate-400 cursor-pointer hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            onClick={() => useExplorerStore.getState().resetSelection()}
          >
            Heart
          </span>
          {currentStructure && (
            <>
              <span className="text-slate-600 text-xs select-none">›</span>
              <span className="text-red-400 px-2 py-1">{currentStructure.name}</span>
            </>
          )}
        </div>
        
        <div className="text-[11px] font-semibold tracking-wider uppercase text-red-400 bg-red-600/15 border border-red-600/30 rounded-full px-3.5 py-1.5 pointer-events-auto">
          Phase 1 · Next.js
        </div>
      </header>

      {/* Sidebar */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-[215px] flex flex-col gap-1.5 pointer-events-auto">
        <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-slate-500 px-1 mb-1">
          Structures
        </div>
        
        {structures.map(({ id, name, color }) => {
          const isActive = currentStructure?.id === id;
          return (
            <button
              key={id}
              onClick={() => selectStructure({ id, name, level: 'region' })}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 bg-[#090c16]/84 border ${isActive ? 'border-red-600/50 bg-red-600/10 translate-x-1.5' : 'border-white/5 hover:border-red-600/30 hover:bg-[#0e1222]/90 hover:translate-x-1'} rounded-xl backdrop-blur-[22px] transition-all text-left`}
            >
              <div 
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-shadow ${isActive ? 'shadow-[0_0_12px_var(--tw-shadow-color)]' : 'group-hover:shadow-[0_0_8px_var(--tw-shadow-color)]'}`} 
                style={{ backgroundColor: color, '--tw-shadow-color': color } as React.CSSProperties}
              />
              <div className="overflow-hidden">
                <div className="text-[13px] font-medium text-white whitespace-nowrap overflow-hidden text-ellipsis">{name}</div>
                <div className="text-[10px] text-slate-500 capitalize mt-0.5">Region</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Panel (Only visible when a structure is selected) */}
      <div className={`absolute right-6 top-1/2 -translate-y-1/2 z-10 w-[335px] bg-[#090c16]/84 border border-white/5 rounded-2xl p-6 backdrop-blur-[22px] transition-all duration-300 pointer-events-auto ${currentStructure ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
        {currentStructure && (
          <>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] uppercase px-3 py-1 rounded-full mb-3.5 bg-blue-600/15 text-blue-300 border border-blue-600/35">
              🔴 {currentStructure.level}
            </div>
            <h2 className="text-[22px] font-bold tracking-tight leading-tight mb-1">{currentStructure.name}</h2>
            <div className="text-[13px] italic text-slate-400 mb-4">Latin Name Placeholder</div>
            
            <div className="h-px bg-white/5 my-3.5" />
            
            <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-slate-500 mb-1.5">Function</div>
            <p className="text-[13px] leading-[1.7] text-slate-400">
              Select a structure to explore its function and clinical correlations. This is a placeholder for the rich anatomy data that will be connected to our 3D model.
            </p>
            
            <div className="mt-4.5 flex flex-col gap-2 pt-2">
              <button className="w-full py-3 bg-gradient-to-br from-red-700 to-red-600 rounded-xl text-white text-sm font-semibold shadow-[0_4px_20px_rgba(185,28,28,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(185,28,28,0.55)] active:translate-y-0 transition-all text-center flex items-center justify-center gap-2">
                <span>🔬</span> Dive Deeper
              </button>
              <button 
                onClick={() => useExplorerStore.getState().resetSelection()}
                className="w-full py-2.5 border border-white/5 rounded-xl text-slate-400 text-[13px] font-medium hover:bg-white/5 hover:text-white hover:border-white/15 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>←</span> Back to Heart
              </button>
            </div>
          </>
        )}
      </div>

      {/* HUD Bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5 bg-[#090c16]/84 border border-white/5 rounded-full px-5 py-2 backdrop-blur-[22px] pointer-events-auto whitespace-nowrap">
        <span className="text-xs text-slate-500">Click a structure to explore</span>
        <div className="w-px h-4 bg-white/5" />
        <span className="text-[10px] font-semibold bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-slate-400">scroll</span>
        <span className="text-xs text-slate-500">zoom</span>
        <div className="w-px h-4 bg-white/5" />
        <span className="text-[10px] font-semibold bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-slate-400">drag</span>
        <span className="text-xs text-slate-500">rotate</span>
      </div>
    </div>
  );
}
