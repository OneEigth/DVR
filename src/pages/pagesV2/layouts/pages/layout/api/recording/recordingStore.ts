import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Device } from '../../../../../../../types/Device';

export interface Recording {
    id: string;
    type: 'audio' | 'video';
    devices: Device[];
    startTime: number;
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
    stopRecording: (type: 'audio' | 'video', devices: Device[]) => void;
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

            startRecording: (type, devices) => {
                set((state) => {
                    // 1. Удаляем аудио-записи для выбранных устройств (если начинаем видео)
                    const updatedRecordings = state.recordings
                        .map((rec) => {
                            if (type === 'video' && rec.type === 'audio') {
                                return {
                                    ...rec,
                                    devices: rec.devices.filter(
                                        (d) => !devices.some((selected) => selected.UID === d.UID),
                                    ),
                                };
                            }
                            return rec;
                        })
                        .filter((rec) => rec.devices.length > 0); // Удаляем пустые записи

                    // 2. Добавляем новую запись
                    const newRecording: Recording = {
                        id: Date.now().toString(),
                        type,
                        devices,
                        startTime: Date.now(),
                    };

                    return { recordings: [...updatedRecordings, newRecording] };
                });
            },

            // Остановка записи
            stopRecording: (type, devices) => {
                set((state) => ({
                    recordings: state.recordings.filter(
                        (recording) =>
                            !(
                                recording.type === type &&
                                devices.some((d) =>
                                    recording.devices.some((rd) => rd.UID === d.UID),
                                )
                            ),
                    ),
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
