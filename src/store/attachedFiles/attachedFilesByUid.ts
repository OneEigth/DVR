import create from "zustand";
import { useAuthStore } from "../auth/auth";
import { AttachedFile } from "../../types/AttachedFiles";
import { getAttachedFilesByMediaFile } from "../../api/file/getAttachedFilesByMediaFile";

interface AttachedFilesByUidStore {
    AttachedFilesByUid: AttachedFile[];
    fetchAttachedFilesByUid: (uid: string) => Promise<void>;
}

export const useAttachedFilesByUidStore = create<AttachedFilesByUidStore>((set) => ({
    AttachedFilesByUid: [],
    fetchAttachedFilesByUid: async (uid) => {
        const { SmartDVRToken, user } = useAuthStore.getState();
        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }
        try {
            const response = await getAttachedFilesByMediaFile(SmartDVRToken, user.login, uid);
            const AttachedFilesByUid = response.data || []; // Extracting the array of files from the response
            set({ AttachedFilesByUid });
        } catch (error) {
            console.error('Error fetching AttachedFiles:', error);
        }
    },
}));
