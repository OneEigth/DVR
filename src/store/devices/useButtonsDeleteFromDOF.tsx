import create from 'zustand';


interface useButtonDeleteFromDOFState {
    isDeleteDeviceModal:boolean;
    setIsDeleteDeviceModal: (isDeleteDeviceModal:boolean) => void;

}

export const useButtonDeleteFromDOF = create<useButtonDeleteFromDOFState>((set) => ({
    isDeleteDeviceModal:false,
    setIsDeleteDeviceModal: (isDeleteDeviceModal: boolean) => set({ isDeleteDeviceModal }),
}));