import axios from 'axios';
import { VIDEO_FILE_PREVIEW_URL } from "../../const/const";

export const VIDEO_FILE_PREVIEW = async (fileUID: string, SmartDVRToken: string, userLogin: string) => {
    const url = VIDEO_FILE_PREVIEW_URL(fileUID);
    const response = await axios.get(url, {
        headers: {
            SmartDVRLogin: userLogin,
            SmartDVRToken: SmartDVRToken
        },
        responseType: 'arraybuffer'
    });

        const blob = new Blob([response.data], {type: response.headers['content-type']});
        return URL.createObjectURL(blob);

};
