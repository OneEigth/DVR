
import axios, {AxiosError} from 'axios';
import {FILES_DELETE_URL} from '../../const/const';
import {File} from "../../types/File";

interface FileDeleteDOFData {
    files: File;
}
export const FileDeleteDOF = async (SmartDVRToken: string, userLogin: string, files:FileDeleteDOFData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            FILES_DELETE_URL,
            files,
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error delete device:', err.response?.status, err.response?.data);
        return;
    }
};