import axios from 'axios';
import {URL_A} from "../../const/const";


interface FileData{
    deviceUID?:string,
    start?:string,
    end?:string,
    rating?:number[],
}
export const getFilterFileDevicesFromDB = async (fileData:FileData, SmartDVRToken: string, userLogin: string, page: number,pageSize: number) => {

    const FILE_API_URL = `${URL_A}/media_file/filter/${page}/${pageSize}`;

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            FILE_API_URL,
           fileData,
            {
                headers: {
                    SmartDVRLogin: SmartDVRToken,
                    SmartDVRToken: userLogin,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching files from database:', error);
        throw error;
    }
};