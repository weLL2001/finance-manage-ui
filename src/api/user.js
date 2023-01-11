import req from '@/utils/request'
import pretty from '@/utils/pretty'

export const login = (user) => pretty(req({
    // url:"/user/login2",  404
    url:"user/login",
    method:"post",
    data:user
}))