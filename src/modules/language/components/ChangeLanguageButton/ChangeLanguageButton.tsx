import React, { useState } from 'react';
import { Button, Radio, RadioChangeEvent } from 'antd';
import { useLanguageStore } from '../../api/store';
import { LanguageTypes } from '../../constants/LanguageTypes';

const ChangeLanguageButton = () => {
    const { changeLanguage, type } = useLanguageStore();

    return (
        <Button
            className={'body medium-bold button-base button-type-primary button-size-medium'}
            block
            onClick={() =>
                changeLanguage(type === LanguageTypes.ru ? LanguageTypes.kz : LanguageTypes.ru)
            }
        >
            Change Language
        </Button>
    );
};

export default ChangeLanguageButton;
