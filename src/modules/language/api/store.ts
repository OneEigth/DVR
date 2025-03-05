import { create } from 'zustand';
import { LanguageModel } from '../types/LanguageModel';
import { LanguageConnector, LanguageTypes } from '../constants/LanguageTypes';
import { LanguageRu } from '../constants/LanguageRu';
import { persist } from 'zustand/middleware';

interface LanguageStoreProps {
    language: LanguageModel;
    type: LanguageTypes;
    changeLanguage: (lang: LanguageTypes) => void;
}

export const useLanguageStore = create<LanguageStoreProps>()(
    persist(
        (set, state) => ({
            language: LanguageRu,
            type: LanguageTypes.ru,
            changeLanguage: (lang) => {
                set({
                    type: lang,
                    language: LanguageConnector[lang],
                });
            },
        }),
        { name: 'LANGUAGE', version: 1 },
    ),
);
