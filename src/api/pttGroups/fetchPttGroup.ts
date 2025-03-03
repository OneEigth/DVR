import axios, { AxiosError } from 'axios';
import { GET_PTT_GROUPS_URL, POST_PTT_INSERT_GROUP_URL, POST_PTT_UPDATE_GROUP_URL, POST_PTT_DELETE_GROUP_URL } from '../../const/const';
import {useAuthStore} from "../../store/auth/auth";

// Тип для PTT группы
interface PTTGroup {
    id: string;
    name: string;
    description?: string;
    devices?: { UID: string }[];
}

// API функции
export const fetchPTTGroups = async (SmartDVRToken: string, userLogin: string) => {
    if (!userLogin || !SmartDVRToken) {
        console.error('User information is missing.');
        return [];
    }

    try {
        const response = await axios.get(GET_PTT_GROUPS_URL, {
            headers: {
                SmartDVRLogin: userLogin,
                SmartDVRToken: SmartDVRToken,
            },
        });
        const data = response.data;
        if (data.success) {
            return data.data; // возвращаем массив групп
        } else {
            console.error('Error fetching groups:', data.error);
            return [];
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching PTT groups:', err.response?.status, err.response?.data);
        return [];
    }
};

export const createPTTGroup = async (
    SmartDVRToken: string,
    userLogin: string,
    payload: { name: string; userUID: string; devices: { UID: string }[] }
) => {
    try {
        const response = await axios.post(POST_PTT_INSERT_GROUP_URL, payload, {
            headers: {
                SmartDVRLogin: userLogin,
                SmartDVRToken: SmartDVRToken,
            },
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error creating PTT group:', err.response?.status, err.response?.data);
        throw error;
    }
};

export const updatePTTGroup = async (
    SmartDVRToken: string,
    userLogin: string,
    group: { uid: string; name?: string; devices?: { UID: string }[] }
) => {
    try {
        if (group.devices && group.devices.length < 1) {
            throw new Error('At least one device must remain in the group.');
        }

        const response = await axios.post(
            POST_PTT_UPDATE_GROUP_URL,
            group,
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            }
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error updating PTT group:', err.response?.status, err.response?.data);
        throw error;
    }
};

export const deletePTTGroup = async (SmartDVRToken: string, userLogin: string, groupId: string) => {
    try {
        const response = await axios.post(
            POST_PTT_DELETE_GROUP_URL,
            { "uid": groupId },
            {
                headers: {
                    SmartDVRLogin: userLogin,
                    SmartDVRToken: SmartDVRToken,
                },
            }
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error deleting PTT group:', err.response?.status, err.response?.data);
        throw error;
    }
};
