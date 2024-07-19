// SelectedDevice.ts
import create from 'zustand';
import {Device} from "../../types/Device";
import {Key} from "antd/lib/table/interface";

interface SelectedRowKeys2State {
    selectedRowKeys2: Key[];
    setSelectedRowKeys2: (SelectedKeys2:Key[]) => void;
}

export const useSelectedRowKeys2 = create<SelectedRowKeys2State>((set) => ({
    selectedRowKeys2: [],
    setSelectedRowKeys2: (selectedRowKeys2: Key[]) => set({ selectedRowKeys2: selectedRowKeys2 }),
}));