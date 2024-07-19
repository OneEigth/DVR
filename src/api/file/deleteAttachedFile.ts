
import axios, {AxiosError} from 'axios';
import {DELETE_ATTACHED_FILES_API_URL, FILES_DELETE_URL} from '../../const/const';
import {File} from "../../types/File";

interface DeleteAttachedFileData {
    file: File;
}
export const DeleteAttachedFile = async (SmartDVRToken: string, userLogin: string, file:DeleteAttachedFileData) => {

    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return;
    }

    try {
        const response = await axios.post(
            DELETE_ATTACHED_FILES_API_URL,
            file,
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error delete AttachedFile:', err.response?.status, err.response?.data);
        return;
    }
};