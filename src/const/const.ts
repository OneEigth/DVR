//Получение устройств
export const API_URL = 'http://45.141.76.30:7687/device/get_by/all';
export const HEADERS = {
    RSLogin: 'admin',
    RSToken: 'test_token',
};

//Получение списка файлов устройств раннее загруженных в базу
export const FILE_API_URL = 'http://45.141.76.30:7687/device/get_files';
export const FILE_HEADERS = {
    RSLogin: 'admin',
    RSToken: '1b2bb30b-d9f1-11ee-889a-005056010812',
};

//Авторизация пользователя
export const LOGIN_API_URL = 'http://45.141.76.30:7687/user/login';

//Получение пользователей администраторы
export const ADMINS_API_URL = 'http://45.141.76.30:7687/user/get_by/admin';
export const ADMINS_HEADERS = {
    RSLogin: 'admin',
    RSToken: '1b2bb30b-d9f1-11ee-889a-005056010812',
};

//Получение пользователей операторы
export const OPERATORS_API_URL = 'http://45.141.76.30:7687/user/get_by/operator';
export const OPERATORS_HEADERS = {
    RSLogin: 'admin',
    RSToken: '1b2bb30b-d9f1-11ee-889a-005056010812',
};

//Получение пользователей
export const USERS_API_URL = 'http://45.141.76.30:7687/user/get_by/all';
export const USERS_HEADERS = {
    RSLogin: 'admin',
    RSToken: '1b2bb30b-d9f1-11ee-889a-005056010812',
};

//GET_PREVIEW_PICTURES
export const VIDEO_PREVIEW_URL = (fileUID: string) => `http://45.141.76.30:7687/play/file/${fileUID}/preview`;

//GET_PLAY_ONLINE
export const ONLINE_PLAY_URL = (uid: string) => `http://45.141.76.30:7687/play/online/${uid}`;

//GET_PLAY_FILE
export const FILE_PLAY_URL = (uid: string) => `http://45.141.76.30:7687/play/file/${uid}`;

