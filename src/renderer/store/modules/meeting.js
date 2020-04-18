import _ from 'lodash'

const meeting = {
    namespaced: true,

    state: {
        meeting: null,
        msg: {
            type: "",
            content: "",
            count: 0
        }
    },
    mutations: {
        setMeeting(state, data){
            state.meeting = data;
        },
        setMessage(state, data){
            state.msg.type = data.type;
            state.msg.content = data.content;
            state.msg.count = state.msg.count +1;
        },
        logout(state){
            state.meeting = null;
        }
    },
    actions: {
        logout({commit}){
            commit('logout');
        }
    }
};

export default meeting;
