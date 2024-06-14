// SelectedDevice.ts
import create from 'zustand';

interface IsFormChangedState {
    isFormChanged: boolean;
    setIsFormChanged: (isDeviceAdded:boolean) => void;
    isNotSavedModalVisible:boolean;
    setIsNotSavedModalVisible:(isDeviceAdded:boolean) => void;
}

export const useIsFormChanged = create<IsFormChangedState>((set) => ({
    isFormChanged: false,
    isNotSavedModalVisible:false,
    setIsFormChanged: (isFormChanged: boolean) => set({ isFormChanged }),
    setIsNotSavedModalVisible:(isNotSavedModalVisible: boolean) => set({ isNotSavedModalVisible }),

}));