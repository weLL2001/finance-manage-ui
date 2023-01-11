import jwtDecode from "jwt-decode"
export const isLogin = () => {
    let token = window.sessionStorage.token
    if(token) return jwtDecode(token,'jindu520')
    return false 
}