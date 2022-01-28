export const getCookieValue = (cookie: any, cookieHeader: string) => {
    return cookie
            .split('; ')
            .find((row:string) => row.startsWith(cookieHeader))
            ?.split('=')[1];
}

export const getDefaultOrTransferDark = (query: any) => {
    return query.darkMode === undefined ? false : query.darkMode === "true";
}

export const setCookie = (darkModeStatus: boolean) => {
    const noOfDays = 30;
    const currentTime = Date.now();
    const cookieDateFormat = new Date(currentTime + 24 * noOfDays * 60 * 60 * 1000).toUTCString();
    return `theme=${darkModeStatus ? "dark" : "light"}; expires=${cookieDateFormat}; domain=.realdevsquad.com; path=/`;
}

export const checkThemeHistory = (cookie: any, routeQuery: any): string => {
    if (routeQuery.darkMode !== undefined)
        return routeQuery.darkMode === "true" ? "dark" : "light";
    else if(getCookieValue(cookie, "theme") !== undefined)
        return getCookieValue(cookie, "theme"); // dark if true else light
    else
        return "light";
 }