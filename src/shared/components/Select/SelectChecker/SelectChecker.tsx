import { Radio, RadioChangeEvent } from 'antd';
import { FC } from 'react';

import './styles.css';
import { useTheme } from '../../../../modules/theme/ThemeProvider';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

interface SelectCheckerProps {
    options: { label: string; value: any }[];
    value: any;
    onChange: (value: any) => void;
    size?: SizeType;
    className?: string;
    label?: string;
}

const SelectChecker: FC<SelectCheckerProps> = ({
    options,
    value,
    onChange,
    size = 'middle',
    className,
    label,
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
        <>
            {label && <label className="select-checker-label title small">{label}</label>}
            <Radio.Group
                value={value}
                onChange={onChange}
                className={`select-checker ${themeClass} ${className || ''}`}
                options={options}
                optionType="button"
                buttonStyle="solid"
                size={size}
            />
        </>
    );
};

export default SelectChecker;
