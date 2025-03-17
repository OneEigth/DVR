// // selectedLayout.ts
// import create from 'zustand';
//
// interface SelectedLayoutState {
//     selectedLayout: any;
//     setSelectedLayout: (layout:any) => void;
// }
//
// export const useSelectedLayout = create<SelectedLayoutState>((set) => ({
//     selectedLayout: '',
//     setSelectedLayout: (layout: any) => set({ selectedLayout: layout }),
// }));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectedLayoutState {
    selectedLayout: any; // Замените `any` на ваш тип LayoutType
    setSelectedLayout: (layout: any) => void; // Замените `any` на ваш тип LayoutType
}

export const useSelectedLayout = create<SelectedLayoutState>()(
    persist(
        (set) => ({
            selectedLayout: null, // Начальное значение
            setSelectedLayout: (layout) => set({ selectedLayout: layout }),
        }),
        {
            name: 'selectedLayout', // Уникальное имя для localStorage
            getStorage: () => localStorage, // Используем localStorage
        },
    ),
);
