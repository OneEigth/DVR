import axios, {AxiosError } from 'axios';

export const getAdmins = async () => {
    try {
        const response = await axios.get('http://178.91.130.237:7687/user/get_by/admin', {
            headers: {
                'RSLogin': 'admin',  'RSToken': '1b2bb30b-d9f1-11ee-889a-005056010812'  }
        });
        return response.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching users:', err.response?.status, err.response?.data);
        return [];
    }
};