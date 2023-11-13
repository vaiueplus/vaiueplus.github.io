  export function Combine_Path(path: string) {
    return process.env.NEXT_PUBLIC_ROOT_PATH + path;
  }

  export function Combine_API(path: string) {
    return process.env.NEXT_PUBLIC_API + path;
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


export function FormatString(string: string, params: any[]) {
  return string.replace(/{(\d+)}/g, (match, index) => {
    return typeof params[index] !== 'undefined' ? params[index] : match;
  });
}
