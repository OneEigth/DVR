// SelectedDevice.ts
import create from 'zustand';
interface SelectedGroupState {
    selectedGroup: any;
    setSelectedGroup: (group:any) => void;
}
export const useSelectedGroup = create<SelectedGroupState>((set) => ({
    selectedGroup: '00000000-0000-0000-0000-000000000003',
    setSelectedGroup: (group: any) => set({ selectedGroup: group }),
}));