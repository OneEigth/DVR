// SelectedDevice.ts
import create from 'zustand';


interface ButtonsFromAllcamsState {
    isDeleteDeviceModal:boolean;
    setIsDeleteDeviceModal: (isDeleteDeviceModal:boolean) => void;

    isEditDeviceGroupModal:boolean;
    setIsEditDeviceGroupModal: (isDeleteDeviceModal:boolean) => void;
}

export const useButtonsFromAllcams = create<ButtonsFromAllcamsState>((set) => ({
    isDeleteDeviceModal:false,
    isEditDeviceGroupModal:false,


    setIsDeleteDeviceModal: (isDeleteDeviceModal: boolean) => set({ isDeleteDeviceModal }),
    setIsEditDeviceGroupModal:(isEditDeviceGroupModal: boolean) => set({ isEditDeviceGroupModal })
}));