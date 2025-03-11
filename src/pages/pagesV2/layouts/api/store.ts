import { create } from 'zustand';
import { LayoutType } from '../../../../types/LayoutType';
import { getAllLayouts } from '../../../../api/layout/getAllLayouts';
import { useAuthStore } from '../../../../store/auth/auth';

interface LayoutsState {
    loading?: boolean;
    layouts: LayoutType[];
    openAdd: boolean;
    openDelete: boolean;
    editable?: LayoutType | undefined;
}

interface LayoutsActions {
    getLayoutsAll: () => void;
    // createUser: (props: RegisterAdminUserProps) => void;
    setOpenAdd: (open: boolean) => void;
    // setOpenDelete: (open: boolean) => void;
    setEditable: (layout?: LayoutType) => void;
    // updateUser: (props: UpdateAdminUserProps) => void;
    // deleteUsers: (userIds: any[]) => void;
    // changePasswordUser: (props: ChangePasswordAdminUserProps) => void;
}

const initialState: LayoutsState = {
    loading: false,
    layouts: [],
    openAdd: false,
    openDelete: false,
    editable: undefined,
};

export const useLayoutsStore = create<LayoutsState & LayoutsActions>((set, getState) => ({
    ...initialState,
    setOpenAdd: (open) => {
        set({ openAdd: open });
    },
    getLayoutsAll: () => {
        set({ loading: true });
        const { SmartDVRToken, user } = useAuthStore.getState();

        if (!user || !SmartDVRToken) {
            console.error('User or token information is missing.');
            return;
        }

        console.log(SmartDVRToken, user);

        getAllLayouts(SmartDVRToken, user.login)
            .then((response) => {
                console.log(response);
                set({
                    layouts: response.data ?? [],
                });
            })
            .finally(() => set({ loading: false }));
    },

    setEditable: (user) => {
        set({ editable: user });
    },
}));

export default useLayoutsStore;
