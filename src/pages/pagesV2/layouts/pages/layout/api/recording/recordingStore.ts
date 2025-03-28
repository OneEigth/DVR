import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Device } from '../../../../../../../types/Device';

export interface Recording {
    id: string;
    type: 'audio' | 'video';
    devices: Device[];
    startTime: number;
    // groupId?: string;
    // globalStartTime: number;
    label?: string;
}

interface RecordingState {
    recordings: Recording[];
    isAudioModalVisible: boolean;
    isVideoModalVisible: boolean;
    isStopModalVisible: boolean;
    stopType: 'audio' | 'video';
}

interface RecordingActions {
    startRecording: (type: 'audio' | 'video', devices: Device[]) => void;
    stopRecording: (type: 'audio' | 'video' | string, devices: Device[]) => void;
    setIsAudioModalVisible: (visible: boolean) => void;
    setIsVideoModalVisible: (visible: boolean) => void;
    setIsStopModalVisible: (visible: boolean) => void;
    setStopType: (type: 'audio' | 'video') => void;
    clearRecordings: () => void;
    isDeviceRecording: (deviceUID: string) => boolean;
    getDeviceRecordingType: (deviceUID: string) => 'audio' | 'video' | null;
    canStartRecording: (type: 'audio' | 'video', devices: Device[]) => boolean;
    getDevicesWithRecording: (type?: 'audio' | 'video') => Device[];
}

const useRecordingStore = create<RecordingState & RecordingActions>()(
    persist(
        (set, get) => ({
            recordings: [],
            isAudioModalVisible: false,
            isVideoModalVisible: false,
            isStopModalVisible: false,
            stopType: 'audio',

            // startRecording: (type, devices) => {
            //     const id = `${type}-${devices.map(d => d.UID).join('-')}-${Date.now()}`;
            //     const newRecording: Recording = {
            //         id,
            //         // ... остальные поля
            //     };
            //     set((state) => {
            //         // 1. Удаляем существующие записи для этих устройств
            //         const updatedRecordings = state.recordings
            //             .map((rec) => ({
            //                 ...rec,
            //                 devices: rec.devices.filter(
            //                     (d) => !devices.some((newDevice) => newDevice.UID === d.UID),
            //                 ),
            //             }))
            //             .filter((rec) => rec.devices.length > 0);
            //
            //         // 2. Добавляем новую запись
            //         const newRecording: Recording = {
            //             id: `${type}-${Date.now()}`, // Уникальный ID с типом
            //             type,
            //             devices,
            //             startTime: Date.now(),
            //         };
            //
            //         return { recordings: [...updatedRecordings, newRecording] };
            //     });
            // },

            startRecording: (type, devices) => {
                set((state) => {
                    // 1. Создаём новый ID для записи (тип + timestamp + хеш устройств)
                    const recordingId = `${type}-${Date.now()}-${devices.map((d) => d.UID).join('-')}`;

                    // 2. Удаляем эти устройства из всех текущих записей
                    const updatedRecordings = state.recordings
                        .map((rec) => ({
                            ...rec,
                            devices: rec.devices.filter(
                                (d) => !devices.some((newDevice) => newDevice.UID === d.UID),
                            ),
                        }))
                        .filter((rec) => rec.devices.length > 0); // Удаляем пустые записи

                    // 3. Если начинаем видео, останавливаем аудио на этих же устройствах
                    if (type === 'video') {
                        updatedRecordings.forEach((rec) => {
                            if (rec.type === 'audio') {
                                rec.devices = rec.devices.filter(
                                    (d) =>
                                        !devices.some((videoDevice) => videoDevice.UID === d.UID),
                                );
                            }
                        });
                    }

                    // 4. Добавляем новую запись
                    const newRecording: Recording = {
                        id: recordingId,
                        type,
                        devices: [...devices], // Создаём копию массива
                        startTime: Date.now(),
                    };

                    return { recordings: [...updatedRecordings, newRecording] };
                });
            },

            // startRecording: (type, devices) => {
            //     if (devices.length === 0) {
            //         console.error('Не выбрано ни одной камеры для записи');
            //         return;
            //     }
            //
            //     set((state) => {
            //         // 1. Удаляем эти устройства из всех текущих записей
            //         const updatedRecordings = state.recordings
            //             .map(rec => ({
            //                 ...rec,
            //                 devices: rec.devices.filter(d =>
            //                     !devices.some(newDevice => newDevice.UID === d.UID)
            //                 )
            //             }))
            //             .filter(rec => rec.devices.length > 0);
            //
            //         // 2. Если начинаем видео, останавливаем аудио на этих же устройствах
            //         if (type === 'video') {
            //             updatedRecordings.forEach(rec => {
            //                 if (rec.type === 'audio') {
            //                     rec.devices = rec.devices.filter(d =>
            //                         !devices.some(videoDevice => videoDevice.UID === d.UID)
            //                     );
            //                 }
            //             });
            //         }
            //
            //         // 3. Добавляем новую запись
            //         const newRecording: Recording = {
            //             id: `rec-${Date.now()}`,
            //             type,
            //             devices: [...devices], // Копируем массив
            //             startTime: Date.now(),
            //             label: `${type === 'audio' ? 'Аудио' : 'Видео'} запись ${state.recordings.length + 1}`
            //         };
            //
            //         return { recordings: [...updatedRecordings, newRecording] };
            //     });
            // },

            // startRecording: (type, devices) => {
            //     if (devices.length === 0) return;
            //
            //     set((state) => {
            //         // 1. Генерируем уникальный ID для новой записи
            //         const newRecordingId = `rec-${Date.now()}`;
            //
            //         // 2. Создаем новую запись
            //         const newRecording: Recording = {
            //             id: newRecordingId,
            //             type,
            //             devices: [...devices], // Копируем массив устройств
            //             startTime: Date.now(),
            //             label: `${type === 'audio' ? 'Аудио' : 'Видео'} запись ${state.recordings.length + 1}`,
            //         };
            //
            //         // 3. Добавляем в массив записей
            //         return { recordings: [...state.recordings, newRecording] };
            //     });
            // },
            //
            // stopRecording: (recordingId, devices) => {
            //     set((state) => ({
            //         recordings: state.recordings
            //             .map((rec) => {
            //                 if (rec.id === recordingId) {
            //                     // Фильтруем устройства для остановки
            //                     const remainingDevices = rec.devices.filter(
            //                         (d) => !devices.some((toStop) => toStop.UID === d.UID),
            //                     );
            //
            //                     // Если остались устройства - оставляем запись
            //                     if (remainingDevices.length > 0) {
            //                         return { ...rec, devices: remainingDevices };
            //                     }
            //                     // Иначе удаляем запись полностью
            //                     return null;
            //                 }
            //                 return rec;
            //             })
            //             .filter(Boolean) as Recording[],
            //     }));
            // },

            // Остановка записи
            stopRecording: (type, devicesToStop) => {
                set((state) => ({
                    recordings: state.recordings
                        .map((recording) => {
                            if (recording.type === type) {
                                // Удаляем только указанные устройства из записи
                                const updatedDevices = recording.devices.filter(
                                    (device) => !devicesToStop.some((d) => d.UID === device.UID),
                                );

                                // Если остались устройства - оставляем запись
                                if (updatedDevices.length > 0) {
                                    return { ...recording, devices: updatedDevices };
                                }
                                // Иначе удаляем запись полностью
                                return null;
                            }
                            return recording;
                        })
                        .filter(Boolean) as Recording[], // Фильтруем null
                }));
            },

            // Проверка, записывается ли устройство
            isDeviceRecording: (deviceUID) => {
                return get().recordings.some((rec) => rec.devices.some((d) => d.UID === deviceUID));
            },

            // Получение типа записи устройства
            getDeviceRecordingType: (deviceUID) => {
                const recording = get().recordings.find((rec) =>
                    rec.devices.some((d) => d.UID === deviceUID),
                );
                return recording?.type || null;
            },

            // Проверка возможности начать запись
            canStartRecording: (type, devices) => {
                return devices.every((device) => {
                    const recordingType = get().getDeviceRecordingType(device.UID);
                    // Если записи нет - разрешаем
                    if (!recordingType) return true;
                    // Если пытаемся начать аудио поверх видео - запрещаем
                    if (recordingType === 'video' && type === 'audio') return false;
                    // Во всех остальных случаях разрешаем
                    return true;
                });
            },

            // Получение устройств с записью
            getDevicesWithRecording: (type) => {
                const recordings = type
                    ? get().recordings.filter((r) => r.type === type)
                    : get().recordings;

                const devices: Device[] = [];
                recordings.forEach((rec) => {
                    rec.devices.forEach((device) => {
                        if (!devices.some((d) => d.UID === device.UID)) {
                            devices.push(device);
                        }
                    });
                });
                return devices;
            },

            // Остальные методы остаются без изменений
            setIsAudioModalVisible: (visible) => set({ isAudioModalVisible: visible }),
            setIsVideoModalVisible: (visible) => set({ isVideoModalVisible: visible }),
            setIsStopModalVisible: (visible) => set({ isStopModalVisible: visible }),
            setStopType: (type) => set({ stopType: type }),
            clearRecordings: () => set({ recordings: [] }),
        }),
        {
            name: 'recording-storage', // Название для localStorage
        },
    ),
);

export default useRecordingStore;
