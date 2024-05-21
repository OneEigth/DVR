
import axios from 'axios';
import { FILE_API_URL, FILE_HEADERS } from '../../const/const';
import {useAuthStore} from "../../store/auth/auth";

export const getFileDevicesFromDB = async (deviceUID: string, startDateTime: string, endDateTime: string) => {
    const SmartDVRToken = useAuthStore.getState().SmartDVRToken;
    const user = useAuthStore.getState().user

    if (!user || !user.login) {
        console.error('User information is missing.');
        return;
    }
    console.log("api user.login: "+ user.login)
    console.log("api user.token: "+ SmartDVRToken)
    try {
        const response = await axios.post(
            FILE_API_URL,
            {
                deviceUID,
                startDateTime,
                endDateTime,
            },
            {
                headers: {
                    SmartDVRLogin:user.login,
                    SmartDVRToken: SmartDVRToken

                },
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching files from database:', error);
        throw error;
    }
};