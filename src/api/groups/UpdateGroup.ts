
import axios, {AxiosError} from 'axios';
import { POST_UPDATE_GROUP_URL} from '../../const/const';

interface UpdateGroupData {
    uid: string;
    name?: string;
    parent_uid?: string;
}
export const UpdateGroup = async (SmartDVRToken: string, userLogin: string, groupData:UpdateGroupData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            POST_UPDATE_GROUP_URL,
            groupData,
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error update group:', err.response?.status, err.response?.data);
        return [];
    }
};