import { UserSSO_Struct } from "@/data_structure"
import { List , Map } from 'immutable';
import {create} from 'zustand';

export type AccountZusStore = {
    user: UserSSO_Struct,
    set_user: (user: UserSSO_Struct) => void,
    is_valid: () => boolean,
}

export const useAccountStore = create<AccountZusStore>(
    (set, get) => ({

        user: {
            sub : "",
            name: "",
            given_name: "",
            family_name: "",
            picture: "",
            email: ""
        },

        set_user: (user: UserSSO_Struct) => {
            set( () => {
                return ({user:  user }) 
            });
        },

        is_valid: () => get().user != undefined && get().user.sub != ""
}));