import { Device } from '../../../../../../../types/Device';

interface ModalCameraGridProps {
    devices: Device[];
    selectedDevices: Device[];
    onTileClick: (device: Device) => void;
    getTileStatus?: (device: Device) => {
        isDisabled?: boolean;
        tooltip?: string;
        highlight?: 'audio' | 'video';
    };
}

export const ModalCameraGrid: React.FC<ModalCameraGridProps> = ({
    devices,
    selectedDevices,
    onTileClick,
    getTileStatus,
}) => {
    // Рассчитываем оптимальное количество колонок
    const columnCount = Math.min(Math.ceil(Math.sqrt(devices.length)), 4);
    const rowCount = Math.ceil(devices.length / columnCount);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                gap: '8px',
                width: '100%',
            }}
        >
            {devices.map((device, index) => {
                const status = getTileStatus?.(device) || {};
                return (
                    <div
                        key={device.UID}
                        style={{
                            aspectRatio: '16/9',
                            position: 'relative',
                            backgroundColor: 'var(--gray-01)',
                            borderRadius: '8px',
                            border:
                                status.highlight === 'video'
                                    ? '2px solid var(--warning)'
                                    : status.highlight === 'audio'
                                      ? '2px solid var(--warning)'
                                      : selectedDevices.some((d) => d.UID === device.UID)
                                        ? '2px solid var(--tertiary-dark)'
                                        : 'none',
                            opacity: status.isDisabled ? 0.5 : 1,
                            cursor: status.isDisabled ? 'not-allowed' : 'pointer',
                        }}
                        onClick={() => !status.isDisabled && onTileClick(device)}
                    >
                        {status.tooltip && (
                            <div className="recording-status-tooltip">{status.tooltip}</div>
                        )}
                        <div style={{ padding: '4px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        backgroundColor: selectedDevices.some(
                                            (d) => d.UID === device.UID,
                                        )
                                            ? 'var(--tertiary-dark)'
                                            : 'transparent',
                                        border: '1px solid var(--tertiary-dark)',
                                    }}
                                />
                                <span
                                    style={{
                                        fontSize: '12px',
                                        color: 'white',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {device.name}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
