'use client'
import { UserSSO_Struct } from "@/data_structure";
import { get_cookie } from "@/utility/dynamic_utility";
import { decodeJwtResponseFromGoogleAPI } from "@/utility/static_utility";
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from "react";

function IsLoginRequirePathMatch(path: string) {
    return path.match("/platform/tools") != null;
}

export function ExecLoginComponent() {
    const pathname = usePathname();
    const [current_url, setURL] = useState("");

    useEffect(() => {

        let user_id = get_cookie("user_id", "");

        setURL(location.pathname);

        if (user_id == "" && IsLoginRequirePathMatch(location.pathname)) {
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
    
    function on_google_sso_login(google: google.accounts.id.CredentialResponse) {
        let decode_data = decodeJwtResponseFromGoogleAPI(google.credential);

        console.log(google);
        console.log(decode_data);
    }

    return (
        <div>
        </div>
    )
}

