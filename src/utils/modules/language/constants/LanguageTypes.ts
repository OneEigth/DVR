import {LanguageModel} from "../types/LanguageModel";
import {LanguageRu} from "./LanguageRu";
import {LanguageKz} from "./LanguageKz";

export enum LanguageTypes {
    ru = 1,
    kz = 2,
}

export const LanguageConnector: { [key: number]: LanguageModel } = {
    [LanguageTypes.ru]: LanguageRu,
    [LanguageTypes.kz]: LanguageKz,
}