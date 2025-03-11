import React, { FC, ReactNode } from 'react';
import { ReactComponent as CloseIcon } from 'utils/app/assets/icons/Close.svg';
import './styles.css';

interface TagProps {
    state?: 'default' | 'error' | 'processing' | 'success' | 'warning' | 'add_new';
    // | 'superadmin'
    // | 'admin'
    // | 'operator';
    border?: boolean;
    icon?: ReactNode;
    closeable?: boolean;
    onClose?: () => void;
    addNew?: boolean;
    children: ReactNode;
}

const Tag: FC<TagProps> = ({
    state = 'default',
    icon,
    closeable,
    onClose,
    addNew,
    children,
    border,
}) => {
    const tagClass = `tag-base tag-state-${state} ${icon ? 'tag-with-icon' : ''} ${border ? 'border' : ''}`;

    return (
        <div className={tagClass}>
            {icon}
            {children}
            {closeable && <CloseIcon onClick={onClose} />}
        </div>
    );
};

export default Tag;
