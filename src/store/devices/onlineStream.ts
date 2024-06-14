import create from 'zustand';


interface useOnlineStateStreamState {
    isStreamOnline:boolean;
    setIsStreamOnline: (isDeleteDeviceModal:boolean) => void;


}

export const useOnlineStateStream = create<useOnlineStateStreamState>((set) => ({
    isStreamOnline:true,



    setIsStreamOnline: (isStreamOnline: boolean) => set({ isStreamOnline }),

}));