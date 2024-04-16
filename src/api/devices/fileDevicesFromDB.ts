
import axios from 'axios';
import { FILE_API_URL, FILE_HEADERS } from '../../const/const';

export const getFileDevicesFromDB = async (deviceUID: string, startDateTime: string, endDateTime: string) => {
    try {
        const response = await axios.post(
            FILE_API_URL,
            {
                deviceUID,
                startDateTime,
                endDateTime,
            },
            {
                headers: FILE_HEADERS,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching files from database:', error);
        throw error;
    }
};