

    import axios, {AxiosError} from 'axios';
    import {GET_DEVICE_TIME_ONLINE_URL} from '../../const/const';
    import {Device} from "../../types/Device";


    export const getTimeOnline = async ( SmartDVRToken: string, userLogin: string, deviceData:string) => {

        if (!userLogin || !SmartDVRToken) {
            console.error('User information is missing.');
            return;
        }

        try {
            const url = `${GET_DEVICE_TIME_ONLINE_URL}/${deviceData}`;
            const response = await axios.get(url, {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            console.error('Error fetching users:', err.response?.status, err.response?.data);
            return;
        }
    };