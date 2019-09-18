import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    // 得到cookies值
    return Cookies.get(TokenKey)
}

export function setToken(token) {
     // 设置cookies值
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
     // 删除cookies值
    return Cookies.remove(TokenKey)
}
