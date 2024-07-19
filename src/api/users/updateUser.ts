
import axios, {AxiosError} from 'axios';
import {UPDATE_USER_API_URL} from '../../const/const';


interface getEditUserData{

    uid: string,
    login: string,
    password: string,
    name: string,
    isAdmin:boolean,
    groups: string,

}
export const getEditUser = async (SmartDVRToken: string, userLogin: string, userData:getEditUserData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            UPDATE_USER_API_URL,
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
        console.error('Error edit user:', err.response?.status, err.response?.data);
        return { success: false, error: err.response?.data || 'Unknown error' };
    }
};