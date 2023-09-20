import { atom } from "recoil";

export const isAdminLoggedInState = atom({
    key:'isLoggedIn',
    default: false
});