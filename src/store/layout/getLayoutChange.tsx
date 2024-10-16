
import create from 'zustand';

interface IsLayoutFormChangedState {
    isLayoutFormChanged: boolean;
    setIsLayoutFormChanged: (isDeviceAdded: boolean) => void;
    isNotSavedModalVisible: boolean;
    setIsNotSavedModalVisible: (isDeviceAdded: boolean) => void;
    layoutViewType: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4';
    setLayoutViewType: (size: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4') => void; // Добавили метод для изменения состояния
}

export const useIsLayoutFormChanged = create<IsLayoutFormChangedState>((set) => ({
    isLayoutFormChanged: false,
    isNotSavedModalVisible: false,
    layoutViewType: '2x2',  // Установили начальное значение
    setIsLayoutFormChanged: (isLayoutFormChanged: boolean) => set({ isLayoutFormChanged }),
    setIsNotSavedModalVisible: (isNotSavedModalVisible: boolean) => set({ isNotSavedModalVisible }),
    setLayoutViewType: (layoutViewType: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4') => set({ layoutViewType }),  // Метод для изменения состояния
}));