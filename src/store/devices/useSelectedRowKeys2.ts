// SelectedDevice.ts
import create from 'zustand';
import {Device} from "../../types/Device";
import {Key} from "antd/lib/table/interface";

interface SelectedRowKeysState {
    selectedRowKeys: Key[];
    setSelectedRowKeys: (SelectedKeys:Key[]) => void;
}

export const useSelectedRowKeys = create<SelectedRowKeysState>((set) => ({
    selectedRowKeys: [],
    setSelectedRowKeys: (selectedRowKeys: Key[]) => set({ selectedRowKeys: selectedRowKeys }),
}));