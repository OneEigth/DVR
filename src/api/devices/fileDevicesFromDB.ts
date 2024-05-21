import axios from 'axios';
import { FILE_API_URL } from '../../const/const';

export const getFileDevicesFromDB = async (deviceUID: string, startDateTime: string, endDateTime: string, SmartDVRToken: string, userLogin: string) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

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
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching files from database:', error);
        throw error;
    }
};