import create from 'zustand';

// Интерфейс состояния
interface IsShowNameDeviceState {
    isShowNameDevice: boolean;
    setIsShowNameDevice: (isShowNameDevice: boolean) => void;
}

// Создание состояния с Zustand
export const useStateNameDevice = create<IsShowNameDeviceState>((set) => ({
    isShowNameDevice: true,
    setIsShowNameDevice: (isShowNameDevice: boolean) => set({ isShowNameDevice }),
}));
