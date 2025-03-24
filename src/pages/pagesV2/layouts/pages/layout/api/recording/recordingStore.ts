import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Device } from '../../../../../../../types/Device';

export interface Recording {
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
}

const useRecordingStore = create<RecordingState & RecordingActions>()(
    persist(
        (set, get) => ({
            recordings: [],
            isAudioModalVisible: false,
            isVideoModalVisible: false,
            isStopModalVisible: false,
            stopType: 'audio',

            // Запуск записи
            startRecording: (type, devices) => {
                set((state) => ({
                    recordings: [
                        ...state.recordings,
                        {
                            type,
                            devices,
                            startTime: Date.now(),
                        },
                    ],
                }));
            },

            // Остановка записи
            stopRecording: (type, devices) => {
                set((state) => ({
                    recordings: state.recordings.filter(
                        (recording) =>
                            !(
                                recording.type === type &&
                                devices.some((d) => recording.devices.includes(d))
                            ),
                    ),
                }));
            },

            // Управление модалками
            setIsAudioModalVisible: (visible) => set({ isAudioModalVisible: visible }),
            setIsVideoModalVisible: (visible) => set({ isVideoModalVisible: visible }),
            setIsStopModalVisible: (visible) => set({ isStopModalVisible: visible }),
            setStopType: (type) => set({ stopType: type }),

            // Очистка всех записей
            clearRecordings: () => set({ recordings: [] }),
        }),
        {
            name: 'recording-storage', // Название для localStorage
        },
    ),
);

export default useRecordingStore;
