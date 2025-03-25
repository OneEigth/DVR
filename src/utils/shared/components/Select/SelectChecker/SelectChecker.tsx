import { Radio, RadioChangeEvent } from 'antd';
import { FC } from 'react';

import './styles.css';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { useTheme } from '../../../../modules/theme/ThemeProvider';

interface SelectCheckerProps {
    options: { label: string; value: any }[];
    value: any;
    onChange: (value: any) => void;
    size?: SizeType;
    className?: string;
    label?: string;
    labelClassName?: string;
    overlayClassName?: string;
}

const SelectChecker: FC<SelectCheckerProps> = ({
    options,
    value,
    onChange,
    size = 'middle',
    className = '',
    label,
    labelClassName = '',
    overlayClassName = '',
}) => {
    // const onChangeHandler = (event: RadioChangeEvent) => {
    //     const { target } = event;
    //     if (target) {
    //         onChange(target.value);
    //     }
    // };
    const { theme } = useTheme();

    const themeClass = theme === 'dark' ? 'select-checker-dark' : 'select-checker-light';

    return (
        <div className={overlayClassName}>
            {label && (
                <label
                    className={`select-checker-label ${labelClassName ? labelClassName : 'title small'}`}
                >
                    {label}
                </label>
            )}
            <Radio.Group
                value={value}
                onChange={onChange}
                className={`select-checker ${themeClass} ${className || ''}`}
                options={options}
                optionType="button"
                buttonStyle="solid"
                size={size}
            />
        </div>
    );
};

export default SelectChecker;
