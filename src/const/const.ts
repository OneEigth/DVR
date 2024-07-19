
const PORT = ':8172'
export const URL_A = `http://45.141.76.30${PORT}`


//Groups
export const GET_GROUPS_URL =  `${URL_A}/group/get_by/all`;
export const POST_CREATE_GROUP_URL=`${URL_A}/group/insert`;
export const POST_UPDATE_GROUP_URL =`${URL_A}/group/update`
export const POST_DELETE_GROUP_URL= `${URL_A}/group/delete`
export const POST_GROUP_EDIT_DEVICE_URL=`${URL_A}/device/regroup_array`;


//Device
export const API_URL = `${URL_A}/device/get_by/all`;
export const API_DEVICE_BY_GROUP =(groupUID: string) => `${URL_A}/device/${groupUID}/1/30`
export const POST_DELETE_DEVICE_URL= `${URL_A}/device/delete_array`
export const POST_DELETE_DEVICE_ONE_URL= `${URL_A}/device/delete`
export const POST_CREATE_DEVICE_URL=`${URL_A}/device/insert`;
export const POST_DEVICE_UPDATE_URL=`${URL_A}/device/update`;
export const GET_DEVICE_TIME_ONLINE_URL=`${URL_A}/device/online_count`;





//Files
//Получение списка файлов устройств раннее загруженных в базу
export const FILE_API_URL = `${URL_A}/media_file/filter`;
export const FILES_DELETE_URL = `${URL_A}/media_file/delete_array`;
export const FILES_BY_DEVICE_UID =(deviceUID: string, page: number, pageSize: number, fileType?: string) => `${URL_A}/media_file/${deviceUID}/${fileType}/${page}/${pageSize}`;

export const FIlE_ATTACH_API_URL =(file:string)=> `${URL_A}/attached_file/insert/${file}`;


//Auth
//Авторизация пользователя
export const LOGIN_API_URL = `${URL_A}/user/login`;


//USERS
//Получение пользователей администраторы
export const ADMINS_API_URL = `${URL_A}/user/get_by/admin`;


//Получение пользователей
export const USERS_API_URL = `${URL_A}/user/get_by/all`;

//Получение пользователей операторы
export const OPERATORS_API_URL = `${URL_A}/user/get_by/operator`;

export const OPERATORS_API_URL = `${URL_A}/user/get_by/operator`;


//Получение владельцев
export const OWNERS_API_URL =( page: number, pageSize: number) => `${URL_A}/owner/get_all/${page}/${pageSize}`;

//Получение владельцев по uid или device.UID
export const OWNERS_BY_UID_OR_DEVICE_UID_API_URL = `${URL_A}/owner/get_by/uid`;

//Создние владельца
export const CREATE_OWNER_API_URL = `${URL_A}/owner/insert`;

//Удаление владельца
export const DELETE_OWNER_API_URL = `${URL_A}/owner/delete_array`;

//Редактирование владельца
export const UPDATE_OWNER_API_URL = `${URL_A}/owner/update`;






//GET_PREVIEW_PICTURES
export const VIDEO_PREVIEW_URL = (fileUID: string, token:any) => `${URL_A}/play/file/${fileUID}/preview/${token}`;
export const VIDEO_FILE_PREVIEW_URL = (fileUID: string)=>`${URL_A}/media_file/preview/${fileUID}`;

//GET_PLAY_ONLINE
export const ONLINE_PLAY_URL = `${URL_A}/play/stream/`;

//GET_PLAY_FILE
export const FILE_PLAY_URL = `${URL_A}/play/file/`;











