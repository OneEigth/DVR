

import axios, {AxiosError} from 'axios';

export const getAllDevices = async () => {
    try {
        const response = await axios.get(
            'http://178.91.130.237:7687/device/get_device/all',
            {
                headers: {
                    RSLogin: 'admin',
                    RSToken: 'test_token',
                },
            }
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching users:', err.response?.status, err.response?.data);
        return [];
    }
};