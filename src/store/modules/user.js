export default {
    state:{
        isLogin:false,
        userInfo:{},
        menu:[]
    },
    getters:{
        userMenu(state){
            return state.menu
        }
    },
    mutations:{
        changeIsLogin(state,isLogin){
            state.isLogin = isLogin
        },
        changeUserInfo(state,userInfo){
            state.userInfo = userInfo
        },
        setMenu(state,menu){
            state.menu = menu 
        }
    },
    actions:{},
}