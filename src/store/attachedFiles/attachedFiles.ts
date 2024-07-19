import create from "zustand";
import { useAuthStore } from "../auth/auth";
import { AttachedFile } from "../../types/AttachedFiles";
import { getAllAttachedFiles } from "../../api/file/getAttachedFiles";

interface AllAttachedFilesStore {
    AllAttachedFiles: AttachedFile[];
    fetchAllAttachedFiles: () => Promise<void>;
}

export const useAllAttachedFilesStore = create<AllAttachedFilesStore>((set) => ({
    AllAttachedFiles: [],
    fetchAllAttachedFiles: async () => {
        const { SmartDVRToken, user } = useAuthStore.getState();
        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }
        try {
            const response = await getAllAttachedFiles(SmartDVRToken, user.login);
            const AllAttachedFiles = response.data || []; // Extracting the array of files from the response
            set({ AllAttachedFiles });
        } catch (error) {
            console.error('Error fetching AttachedFiles:', error);
        }
    },
}));
