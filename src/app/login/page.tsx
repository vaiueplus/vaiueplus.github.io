'use client'

import { UserSSO_Struct } from "@/data_structure";
import { useEffect } from "react";

function decodeJwtResponseFromGoogleAPI(token: string) : UserSSO_Struct {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = 
   decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + 
   c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
}

export default function LoginPage() {
    
    useEffect(() => {    
        google.accounts.id.initialize({
            client_id: "821082472770-ikb2h6i39dvlu9m527o469a7qbucvmbl.apps.googleusercontent.com",
            callback: (data) => on_google_sso_login(data),
            auto_select: false

        });

        google.accounts.id.prompt((notification) => {
            console.log(notification);

            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                console.log("prompt is skip");
                document.cookie =  `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                google.accounts.id.prompt();
            }
          });
    }, []);
    
    function on_google_sso_login(google: google.accounts.id.CredentialResponse) {
        let decode_data = decodeJwtResponseFromGoogleAPI(google.credential);

        console.log(google);
        console.log(decode_data);
    }

    return (
        <div>
            Hell oworld
        </div>
    )
}

