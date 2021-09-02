import { setToken, getToken } from '@/utils/auth'
const user = {
    namespaced: true,
    state:{
        token: getToken() || '',
        id: 0,
        uuid: 0,
        mobile: '',
        nickname: '',
        avatar: '',
    },

    mutations: {
        SET_TOKEN: (state, token)=>{
            state.token = token
            setToken(token)
        },
        SET_USER: (state, user) => {
            state.id = user.id
            state.uuid = user.uuid
            state.mobile = user.mobile
            state.nickname = user.nickname
            state.avatar = user.avatar
        }
    },

    actions: {
        setToken: ({commit}, token) => {
            setToken(token)
            commit('SET_TOKEN', token)
        },
        setUser: ({commit}, user) => {
            commit('SET_USER', user)
        }
    }
}
export default user
