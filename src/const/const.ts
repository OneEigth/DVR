
const PORT = ':8181'
export const URL_A = `https://89.218.134.252${PORT}/api/v1`


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


//layouts
export const GET_ALL_LAYOUTS_URL= `${URL_A}/layout/get_by/all`
export const CREATE_LAYOUT_URL= `${URL_A}/layout/insert`
export const UPDATE_LAYOUT_URL= `${URL_A}/layout/update`
export const DELETE_LAYOUT_URL= `${URL_A}/layout/delete`
export const FIND_LAYOUT_URL = `${URL_A}/layout/search`


//Files
//Получение списка файлов устройств раннее загруженных в базу
export const FILE_API_URL = `${URL_A}/media_file/filter`;
export const FILES_DELETE_URL = `${URL_A}/media_file/delete_array`;
export const FILES_BY_DEVICE_UID =(deviceUID: string, page: number, pageSize: number, fileType?: string) => `${URL_A}/media_file/${deviceUID}/${fileType}/${page}/${pageSize}`;

//attachedFiles
export const FIlE_ATTACH_API_URL =(file:string)=> `${URL_A}/attached_file/upload/${file}`;
export const GET_ATTACHED_FILES_BY_MEDIA_FILE_UID_API_URL =(file:string)=> `${URL_A}/attached_file/media_file_uid/${file}`;
export const GET_ATTACHED_FILES_API_URL = `${URL_A}/attached_file/get_by/all`;
export const DELETE_ATTACHED_FILES_API_URL = `${URL_A}/attached_file/delete`;

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
//Получение пользователей администраторы
export const ADM_API_URL = `${URL_A}/user/get_by/admin`;

//Получение пользователей по UID
export const USER_BY_UID_API_URL = `${URL_A}/user/get_by/admin`;

//Создание пользователя
export const CREATE_USER_API_URL = `${URL_A}/user/insert`;

//Обновление пользователя
export const UPDATE_USER_API_URL = `${URL_A}/user/update`;

//Удаление пользователя
export const DELETE_USER_API_URL = `${URL_A}/user/delete`;




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

//Video Record Device
export const VIDEO_RECORD_START_DEVICE_API_URL = `${URL_A}/device/start_record`;
export const VIDEO_RECORD_END_DEVICE_API_URL = `${URL_A}/device/stop_record`;

//Video Record Device Array
export const VIDEO_ARRAY_RECORD_START_DEVICE_API_URL = `${URL_A}/device/start_record_array`;
export const VIDEO_ARRAY_RECORD_END_DEVICE_API_URL = `${URL_A}/device/stop_record_array`;

//Audio Record Device
export const AUDIO_RECORD_START_DEVICE_API_URL = `${URL_A}/device/start_audio_record`;
export const AUDIO_RECORD_END_DEVICE_API_URL = `${URL_A}/device/stop_audio_record`;

//Audio Record Device Array
export const AUDIO_ARRAY_RECORD_START_DEVICE_API_URL = `${URL_A}/device/start_audio_record_array`;
export const AUDIO_ARRAY_RECORD_END_DEVICE_API_URL = `${URL_A}/device/stop_audio_record_array`;

//Photo Record Device

export const PHOTO_RECORD_START_DEVICE_API_URL = `${URL_A}/device/get_photo`;

export const PHOTO_ARRAY_RECORD_START_DEVICE_API_URL = `${URL_A}/device/get_photo_array`;

//GET_PREVIEW_PICTURES
export const VIDEO_PREVIEW_URL = (fileUID: string, token:any) => `${URL_A}/play/file/${fileUID}/preview/${token}`;
export const VIDEO_FILE_PREVIEW_URL = (fileUID: string)=>`${URL_A}/media_file/preview/${fileUID}`;

//GET_PLAY_ONLINE
export const ONLINE_PLAY_URL = `${URL_A}/play/hls-stream/`;
export const ONLINE_PLAY_LAYOUT_URL = `${URL_A}/play/stream/`;

//GET_PLAY_FILE
export const FILE_PLAY_URL = `${URL_A}/play/file/`;


//GET_PTT_GROUPS
export const GET_PTT_GROUPS_URL = `${URL_A}/pttgroup/get_by/all`;
//POST_PTT_INSERT_GROUP
export const POST_PTT_INSERT_GROUP_URL = `${URL_A}/pttgroup/insert`;
//POST_PTT_UPDATE_GROUP
export const POST_PTT_UPDATE_GROUP_URL = `${URL_A}/pttgroup/update`;
//POST_PTT_DELETE_GROUP
export const POST_PTT_DELETE_GROUP_URL = `${URL_A}/pttgroup/delete`;







