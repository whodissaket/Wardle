// lol local storage pe har bar naya device id generate ho rha as expected (my bad) so it's cookie time
export function setCookie(name: string, val: string) {
    const value = val;
    // Set it
    document.cookie = name+"="+value+"; expires="+2147483647+"; path=/";
}

export function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    
    if (parts.length == 2) {
        // @ts-ignore
        return parts.pop().split(";").shift();
    }
}

export function deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}
