

import axios, {AxiosError} from 'axios';
import {API_DEVICE_BY_GROUP,} from '../../const/const';

export const getDeviceByGroup = async ( SmartDVRToken: string, userLogin: string,groupUID:string ) => {

    console.log("api ",SmartDVRToken)
    console.log("api ",userLogin)
    console.log("api ",groupUID)

    console.log(API_DEVICE_BY_GROUP(groupUID))
    try {
        const response = await axios.get(
            `http://45.141.76.30:8172/device/group/${groupUID}/1/5`,
            {headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching users:', err.response?.status, err.response?.data);
        return [];
    }
};