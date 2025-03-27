export interface CameraConfig {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface LayoutConfig {
    cols: number;
    rows: number;
    cameras: CameraConfig[];
}

// Конфигурация раскладок
export const layoutConfigs: Record<string, LayoutConfig> = {
    '2х2': {
        cols: 2,
        rows: 2,
        cameras: [
            { x: 0, y: 0, width: 1, height: 1 }, // Камера 1
            { x: 1, y: 0, width: 1, height: 1 }, // Камера 2
            { x: 0, y: 1, width: 1, height: 1 }, // Камера 3
            { x: 1, y: 1, width: 1, height: 1 }, // Камера 4
        ],
    },
    '1х5': {
        cols: 3,
        rows: 3,
        cameras: [
            { x: 0, y: 0, width: 2, height: 2 }, // Большая камера
            { x: 2, y: 0, width: 1, height: 1 }, // Камера 2
            { x: 2, y: 1, width: 1, height: 1 }, // Камера 3
            { x: 0, y: 2, width: 1, height: 1 }, // Камера 4
            { x: 1, y: 2, width: 1, height: 1 }, // Камера 5
            { x: 2, y: 2, width: 1, height: 1 }, // Камера 6
        ],
    },
    '1х7': {
        cols: 4,
        rows: 4,
        cameras: [
            { x: 0, y: 0, width: 3, height: 3 }, // Большая камера
            { x: 3, y: 0, width: 1, height: 1 }, // Камера 2
            { x: 3, y: 1, width: 1, height: 1 }, // Камера 3
            { x: 3, y: 2, width: 1, height: 1 }, // Камера 4
            { x: 0, y: 3, width: 1, height: 1 }, // Камера 5
            { x: 1, y: 3, width: 1, height: 1 }, // Камера 6
            { x: 2, y: 3, width: 1, height: 1 }, // Камера 7
            { x: 3, y: 3, width: 1, height: 1 }, // Камера 8
        ],
    },
    '3х3': {
        cols: 3,
        rows: 3,
        cameras: [
            { x: 0, y: 0, width: 1, height: 1 },
            { x: 1, y: 0, width: 1, height: 1 },
            { x: 2, y: 0, width: 1, height: 1 },
            { x: 0, y: 1, width: 1, height: 1 },
            { x: 1, y: 1, width: 1, height: 1 },
            { x: 2, y: 1, width: 1, height: 1 },
            { x: 0, y: 2, width: 1, height: 1 },
            { x: 1, y: 2, width: 1, height: 1 },
            { x: 2, y: 2, width: 1, height: 1 },
        ],
    },
    '3х4': {
        cols: 4,
        rows: 4,
        cameras: [
            { x: 0, y: 0, width: 2, height: 2 },
            { x: 2, y: 0, width: 2, height: 2 },
            { x: 0, y: 2, width: 2, height: 2 },
            { x: 2, y: 2, width: 1, height: 1 },
            { x: 3, y: 2, width: 1, height: 1 },
            { x: 2, y: 3, width: 1, height: 1 },
            { x: 3, y: 3, width: 1, height: 1 },
        ],
    },
    '2х8': {
        cols: 4,
        rows: 4,
        cameras: [
            { x: 0, y: 0, width: 2, height: 2 },
            { x: 2, y: 0, width: 2, height: 2 },
            { x: 0, y: 2, width: 1, height: 1 },
            { x: 1, y: 2, width: 1, height: 1 },
            { x: 2, y: 2, width: 1, height: 1 },
            { x: 3, y: 2, width: 1, height: 1 },
            { x: 0, y: 3, width: 1, height: 1 },
            { x: 1, y: 3, width: 1, height: 1 },
            { x: 2, y: 3, width: 1, height: 1 },
            { x: 3, y: 3, width: 1, height: 1 },
        ],
    },
    '1х12': {
        cols: 4,
        rows: 4,
        cameras: [
            { x: 0, y: 0, width: 2, height: 2 }, // Большая камера
            { x: 2, y: 0, width: 1, height: 1 },
            { x: 3, y: 0, width: 1, height: 1 },
            { x: 2, y: 1, width: 1, height: 1 },
            { x: 3, y: 1, width: 1, height: 1 },
            { x: 0, y: 2, width: 1, height: 1 },
            { x: 1, y: 2, width: 1, height: 1 },
            { x: 2, y: 2, width: 1, height: 1 },
            { x: 3, y: 2, width: 1, height: 1 },
            { x: 0, y: 3, width: 1, height: 1 },
            { x: 1, y: 3, width: 1, height: 1 },
            { x: 2, y: 3, width: 1, height: 1 },
            { x: 3, y: 3, width: 1, height: 1 },
        ],
    },
    '4х4': {
        cols: 4,
        rows: 4,
        cameras: [
            { x: 0, y: 0, width: 1, height: 1 }, // Большая камера
            { x: 1, y: 0, width: 1, height: 1 },
            { x: 2, y: 0, width: 1, height: 1 },
            { x: 3, y: 0, width: 1, height: 1 },
            { x: 0, y: 1, width: 1, height: 1 },
            { x: 1, y: 1, width: 1, height: 1 },
            { x: 2, y: 1, width: 1, height: 1 },
            { x: 3, y: 1, width: 1, height: 1 },
            { x: 0, y: 2, width: 1, height: 1 },
            { x: 1, y: 2, width: 1, height: 1 },
            { x: 2, y: 2, width: 1, height: 1 },
            { x: 3, y: 2, width: 1, height: 1 },
            { x: 0, y: 3, width: 1, height: 1 },
            { x: 1, y: 3, width: 1, height: 1 },
            { x: 2, y: 3, width: 1, height: 1 },
            { x: 3, y: 3, width: 1, height: 1 },
        ],
    },
};

// Fallback-конфигурация по умолчанию
export const defaultConfig: LayoutConfig = {
    cols: 2,
    rows: 2,
    cameras: [
        { x: 0, y: 0, width: 1, height: 1 },
        { x: 1, y: 0, width: 1, height: 1 },
        { x: 0, y: 1, width: 1, height: 1 },
        { x: 1, y: 1, width: 1, height: 1 },
    ],
};
