'use client'
import { UserSSO_Struct } from "@/data_structure";
import { AccountZusStore, useAccountStore } from "@/model/account_zustand";
import { LocalStorageTable } from "@/static_data";
import { get_cookie } from "@/utility/dynamic_utility";
import { decodeJwtResponseFromGoogleAPI } from "@/utility/static_utility";
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from "react";

function IsLoginRequirePathMatch(path: string) {
    return path.match("/platform/tools") != null;
}

function LoginIfPossible(accountStore: AccountZusStore) {
    if (typeof localStorage == "undefined") return;

    const raw_account = localStorage.getItem(LocalStorageTable.Account);

    if (raw_account == null || accountStore.is_valid()) return;
    
    let user_struct = JSON.parse(raw_account);

    accountStore.set_user(user_struct);
}


export function ExecLoginComponent() {
    const accountStore = useAccountStore();
    LoginIfPossible(accountStore);

    const pathname = usePathname();
    const [current_url, setURL] = useState("");

    useEffect(() => {    
        if (google == undefined) return;

        let user_id = get_cookie("user_id", "");

        setURL(location.pathname);

        if (!accountStore.is_valid() && IsLoginRequirePathMatch(location.pathname)) {
            google.accounts.id.cancel();
            google.accounts.id.initialize({
                client_id: "821082472770-ikb2h6i39dvlu9m527o469a7qbucvmbl.apps.googleusercontent.com",
                callback: (data) => on_google_sso_login(data),
                auto_select: false
            });

            google.accounts.id.prompt((notification) => {
            console.log(location.pathname, current_url);

            if (!IsLoginRequirePathMatch(current_url)) return;

            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                console.log("prompt is skip");
                document.cookie =  `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                google.accounts.id.prompt();
            }
          });
        }

    }, [pathname]);
    
    // useEffect(() => {
    //     LoginIfPossible(accountStore);
    // }, []);

    function on_google_sso_login(google: google.accounts.id.CredentialResponse) {
        let decode_data = decodeJwtResponseFromGoogleAPI(google.credential);

        accountStore.set_user(decode_data);

        localStorage.setItem(LocalStorageTable.Account, JSON.stringify(decode_data));
    }

    return (
        <div>
        </div>
    )
}

