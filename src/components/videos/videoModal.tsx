import React, { useState, useEffect } from 'react';
import { Modal, Spin, Button } from 'antd';
import ReactPlayer from 'react-player';
import { FILE_PLAY_URL } from '../../const/const';

interface VideoModalProps {
    uid: string;
    visible: boolean;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ uid, visible, onClose }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        setIsPlaying(true); // Установка воспроизведения видео по умолчанию при открытии модального окна
    }, [visible]); // Обновление состояния воспроизведения при изменении видимости модального окна

    const handleCancel = () => {
        setIsPlaying(false); // Остановка воспроизведения видео при закрытии модального окна
        onClose();
    };

    return (
        <Modal
            title="Просмотр видео"
            visible={visible}
            onCancel={handleCancel} // Используем новый обработчик onCancel
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Закрыть
                </Button>,
            ]}
        >
            {loading ? (
                <Spin size="large" />
            ) : (
                <ReactPlayer
                    url={FILE_PLAY_URL(uid)}
                    controls={true}
                    playing={isPlaying} // Передача состояния воспроизведения в компонент ReactPlayer
                    width="100%"
                    height="100%"
                />
            )}
        </Modal>
    );
};

export default VideoModal;
