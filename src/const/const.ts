
const PORT = ':8172'
const URL = `http://45.141.76.30${PORT}`


//Groups
export const GET_GROUPS_URL =  `${URL}/group/get_by/all`;
export const POST_CREATE_GROUP_URL=`${URL}/group/insert`;
export const POST_UPDATE_GROUP_URL =`${URL}/group/update`
export const POST_DELETE_GROUP_URL= `${URL}/group/delete`


//Device
export const API_URL = `${URL}/device/get_by/all`;
export const API_DEVICE_BY_GROUP =(groupUID: string) => `${URL}/device/${groupUID}/1/10`
export const POST_DELETE_DEVICE_URL= `${URL}/device/delete_array`
export const POST_CREATE_DEVICE_URL=`${URL}/device/insert`;
export const POST_GROUP_EDIT_DEVICE_URL=`${URL}/device/regroup_array`;




//Files
//Получение списка файлов устройств раннее загруженных в базу
export const FILE_API_URL = `${URL}/media_file/filter/1/7`;

//Auth
//Авторизация пользователя
export const LOGIN_API_URL = `${URL}/user/login`;


//USERS
//Получение пользователей администраторы
export const ADMINS_API_URL = `${URL}/user/get_by/admin`;


//Получение пользователей операторы
export const OPERATORS_API_URL = `${URL}/user/get_by/operator`;


//Получение пользователей
export const USERS_API_URL = `${URL}/user/get_by/all`;





//GET_PREVIEW_PICTURES
export const VIDEO_PREVIEW_URL = (fileUID: string, token:any) => `${URL}/play/file/${fileUID}/preview/${token}`;

//GET_PLAY_ONLINE
export const ONLINE_PLAY_URL = (uid: string) => `${URL}/play/online/${uid}`;










