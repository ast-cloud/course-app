import { atom } from "recoil";

interface Info{
    open: boolean;
    text: string;
    severity: 'success' | 'info' | 'warning' | 'error';
};

const defaultSnackInfo: Info = {
    open: false,
    text: '',
    severity: 'info',
};

export const snackInfo = atom({
    key:'snackInfo',
    default: defaultSnackInfo
});