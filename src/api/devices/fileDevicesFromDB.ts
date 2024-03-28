// api/devices/fileDevicesFromDB.ts

import axios from 'axios';

export const getFileDevicesFromDB = async (deviceUID: string, startDateTime: string, endDateTime: string) => {
    try {
        const response = await axios.post(
            'http://178.91.130.237:7687/device/get_files',
            {
                deviceUID,
                startDateTime,
                endDateTime,
            },
            {
                headers: {
                    RSLogin: 'admin',
                    RSToken: '1b2bb30b-d9f1-11ee-889a-005056010812',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching files from database:', error);
        throw error;
    }
};