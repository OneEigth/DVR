import { notification } from 'antd';
import React, { ReactNode } from 'react';
import { ReactComponent as SuccessIcon } from 'app/assets/icons/ServerStatuses/success.svg';
import { ReactComponent as ErrorIcon } from 'app/assets/icons/ServerStatuses/error.svg';
import alert from 'app/assets/sounds/status_change.mp3';

import './notification.css';
import { useLanguageStore } from '../language/api/store';

interface NotificationProps {
    title: string;
    description: string;
    buttons?: ReactNode;
}

interface SendNotificationProps extends NotificationProps {
    icon: ReactNode;
    placement?: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
    duration?: number;
}

export class LocalNotification {
    public static success(props: NotificationProps) {
        LocalNotification.send(
            {
                ...props,
                // icon: <SuccessIcon />,
                icon: undefined,
            },
            'success',
        );
    }

    public static error(props: NotificationProps) {
        LocalNotification.send(
            {
                ...props,
                // icon: <ErrorIcon />,
                icon: undefined,
                // description: props.description ?? 'Ошибка ошибка',
                description: props.description ?? useLanguageStore.getState().language.serverError,
            },
            'error',
        );
    }

    private static send(props: SendNotificationProps, type: 'error' | 'success') {
        const audio = new Audio(alert);
        audio.play().catch((error) => {
            if (error.name === 'NotAllowedError') {
                audio.pause();
            }
        });

        notification.config({
            maxCount: 4,
        });
        notification.open({
            className: type == 'success' ? 'notification' : 'notification error',
            message: props.title,
            description: props.description,
            icon: props.icon,
            placement: props.placement,
            duration: null,
            btn: props.buttons,
        });
    }
}
