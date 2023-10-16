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
  return p_default
  }

  export function Combine_Path(path: string) {
    return process.env.NEXT_PUBLIC_ROOT_PATH + path;
  }