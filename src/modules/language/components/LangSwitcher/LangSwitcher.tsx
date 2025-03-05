import { Radio, RadioChangeEvent } from 'antd';
import { FC } from 'react';

import './style.css';
import { useLanguageStore } from '../../api/store';
import { LanguageTypes } from '../../constants/LanguageTypes';
import SelectChecker from '../../../../shared/components/Select/SelectChecker/SelectChecker';

interface LangSwitcherProps {
    className?: string;
}

const langOptions = [
    { label: 'RU', value: 1 },
    { label: 'KZ', value: 2 },
];

/**
 * Компонент LangSwitcher предоставляет переключатель языка с возможностью выбора между русским и казахским языками.
 *
 * @component
 * @param {LangSwitcherProps} props - Свойства компонента.
 * @param {string} [props.className] - Дополнительный класс для стилизации компонента.
 * @returns {ReactElement} - Возвращает компонент переключателя языка.
 */
const LangSwitcher: FC<LangSwitcherProps> = (props) => {
    const { changeLanguage, type } = useLanguageStore();

    const onChangeLang = ({ target: { value } }: RadioChangeEvent) => {
        // changeLanguage(type === LanguageTypes.ru ? LanguageTypes.kz : LanguageTypes.ru);
        changeLanguage(value);
    };

    return (
        <SelectChecker
            className={props.className}
            value={type}
            onChange={onChangeLang}
            options={langOptions}
            size={'middle'}
        />
    );
};

export default LangSwitcher;
