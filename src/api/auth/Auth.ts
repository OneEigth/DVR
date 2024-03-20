import axios from 'axios';

export const loginRequest = async (username: string, password: string) => {
    try {
        const response = await axios.post('http://178.91.130.237:7687/user/login', {
            login: username,
            password: password
        });
        return response.data;
    } catch (error) {
        console.error('Error during login request:', error);
        throw error;
    }
};