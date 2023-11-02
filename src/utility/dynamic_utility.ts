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

  export function Is_Email(email : string) {
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    let result = regex.test(email);

    console.log(email);
    console.log(result);

    return result;
  }

  export function DoDelayAction(time : number, callback: () => void) : Promise<void> {
    return new Promise(function (resolve, reject) {
        let flag = false;
        (
            function waitForFoo(){
                if (flag) {

                  if (callback != null) callback();
                  return resolve();
                }

                flag = true;
                setTimeout(waitForFoo, time);
        })();
    });
}