export const clearLocalStorage = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
}