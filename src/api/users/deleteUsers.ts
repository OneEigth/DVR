
import axios, {AxiosError} from 'axios';
import {DELETE_USER_API_URL, POST_DELETE_DEVICE_URL, POST_DELETE_GROUP_URL} from '../../const/const';
import {Device} from "../../types/Device";
import {User} from "../../types/User";

interface DeleteUserData {
    users: User ;
}
export const DeleteUser = async (SmartDVRToken: string, userLogin: string, users:DeleteUserData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            DELETE_USER_API_URL,
            users,
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error delete user:', err.response?.status, err.response?.data);
        return [];
    }
};