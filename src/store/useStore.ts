import { create } from 'zustand';
import type { Assessment, Asset } from '../types/toolkit';

interface Store {
  assessment: Assessment | null;
  updateAnswer: (questionId: string, value: any) => void;
  updateCurrentPage: (pageId: string) => void;
  startAssessment: () => void;
  addAsset: (asset: Omit<Asset, 'id' | 'timestamp'>) => void;
}

const useStore = create<Store>((set) => ({
  assessment: null,
  startAssessment: () => set({
    assessment: {
      id: 'current',
      startedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      currentPageId: '',
      answers: {},
      assets: [],
      status: 'in-progress'
    }
  }),
  updateAnswer: (questionId, value) => set((state) => ({
    assessment: state.assessment ? {
      ...state.assessment,
      answers: {
        ...state.assessment.answers,
        [questionId]: value
      },
      lastUpdated: new Date().toISOString()
    } : null
  })),
  updateCurrentPage: (pageId) => set((state) => ({
    assessment: state.assessment ? {
      ...state.assessment,
      currentPageId: pageId,
      lastUpdated: new Date().toISOString()
    } : null
  })),
  addAsset: (asset) => set((state) => ({
    assessment: state.assessment ? {
      ...state.assessment,
      assets: [
        ...state.assessment.assets,
        {
          ...asset,
          id: `asset-${state.assessment.assets.length + 1}`,
          timestamp: new Date().toISOString()
        }
      ],
      lastUpdated: new Date().toISOString()
    } : null
  }))
}));

export default useStore;
