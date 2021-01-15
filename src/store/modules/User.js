import UserService from '@/services/UserService';

export const namespaced = true;
export const state = {
  current: {
    profile: {
      info: undefined
    }
  }
}
export const mutations = {
  SET_CURRENT_PROFILE: (state, profile) => {
    state.current.profile.info = profile;
  }
}
export const actions = {
  setCurrentProfile: ({ commit, state }, id) => {
    if (state.current.profile.info != undefined && state.current.profile.info.id == id) {
      return state.current.profile.info;
    }else {
      return UserService.getById(id)
        .then(user=> {
          commit('SET_CURRENT_PROFILE', user.data.data)
          return user.data.data;
        }).catch(err=> {throw err});
    }
  }
}
export const getters = {

}