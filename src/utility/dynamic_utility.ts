'use client'
import {v4 as uuidv4} from 'uuid';

export function set_cookie(cname : string, cvalue: string, expire_days: number) {
    try {
      const d = new Date();
      d.setTime(d.getTime() + (expire_days*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      window.document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    } catch {
  
    }
  }
  
  export function get_cookie(cname : string, p_default: string = "") {

    try {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(window.document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
    } catch {
  
    }

    return p_default;
}

export function get_unique_id() {
    let key = "uuid";

    var unique_id = window.localStorage.getItem(key);

    if (unique_id == null) {
        var uuid = uuidv4();
        localStorage.setItem(key, uuid);
        unique_id = uuid;
    }

    return unique_id;
}