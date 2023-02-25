export const KEY_ACCESS_TOKEN = process.env.REACT_APP_KEY_ACCESS_TOKEN;
export const getItem = (key) => {
    return localStorage.getItem(key);
}
export const setItem = (key, value) => {
    localStorage.setItem(key, value);
}

export const removeItem = (key) => {
    localStorage.removeItem(key);
}
