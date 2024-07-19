
import axios, {AxiosError} from 'axios';
import {CREATE_USER_API_URL} from '../../const/const';
import {Group} from "../../types/Group";


interface CreateUserData{
    login: string,
    password: string,
    name: string,
    role: string,
    groups: Group
}
export const getCreateUser = async (SmartDVRToken: string, userLogin: string, userData:CreateUserData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            CREATE_USER_API_URL,
            userData,
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error create user:', err.response?.status, err.response?.data);
        return { success: false, error: err.response?.data || 'Unknown error' };
    }
};