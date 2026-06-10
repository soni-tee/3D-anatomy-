import { create } from 'zustand'

export type SemanticLevel = 'organ' | 'region' | 'tissue' | 'cell' | 'organelle'

export interface SelectedStructure {
  id: string
  level: SemanticLevel
  name: string
}

interface ExplorerState {
  currentStructure: SelectedStructure | null
  breadcrumbHistory: SelectedStructure[]
  selectStructure: (structure: SelectedStructure) => void
  goBackToStructure: (structureId: string) => void
  resetSelection: () => void
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  currentStructure: null,
  breadcrumbHistory: [],
  
  selectStructure: (structure) => set((state) => {
    // Prevent adding the exact same structure sequentially
    if (state.currentStructure?.id === structure.id) {
      return state;
    }
    
    return {
      currentStructure: structure,
      breadcrumbHistory: [...state.breadcrumbHistory, structure]
    };
  }),
  
  goBackToStructure: (structureId) => set((state) => {
    const index = state.breadcrumbHistory.findIndex(s => s.id === structureId);
    if (index === -1) return state;
    
    // Slice history up to and including the selected structure
    const newHistory = state.breadcrumbHistory.slice(0, index + 1);
    
    return {
      breadcrumbHistory: newHistory,
      currentStructure: newHistory[newHistory.length - 1]
    };
  }),
  
  resetSelection: () => set({ currentStructure: null, breadcrumbHistory: [] })
}))
