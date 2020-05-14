import PostService from '@/services/PostService';

export const namespaced = true;
export const state = {
  posts: [],
  current: {
    post: {},
    voices: {
      data: [],
      pages: {},
      page: 0
    },
    comments: {
      data: [],
      pages: {},
      page: 0
    }
  }
}

export const mutations = {
  FILL_POSTS: (state, posts) => {
    state.posts = posts;
  },
  FILL_CURRENT_POST: (state, post) => {
    state.current.post = post;
  },
  FILL_CURRENT_COMMENTS: (state, comments) => {
    state.current.comments.data.push(...comments.data);
    state.current.comments.pages = comments.meta;
    state.current.comments.page = comments.meta.current_page;
  },
  REMOVE_CURRENTS: (state) => {
    state.current.comments = {data: [], pages: {}, page: 0};
    state.current.voices   = {data: [], pages: {}, page: 0};
  },
  FILL_CURRENT_VOICES: (state, voices)=> {
    state.current.voices.data.push(...voices.data);
    state.current.voices.pages = voices.meta;
    state.current.voices.page = voices.meta.current_page;
  }
}

export const actions = {
  getAll: ({ commit, state }) => {
    if (state.posts.length)
      return state.posts;
    else {
      return PostService.getAll()
        .then(posts=> {
          commit('FILL_POSTS', posts.data.data);
          return posts.data.data;
        }).catch(err=> {throw err});
    }
  },
  getById: ({ commit, state }, id) => {
    return PostService.getById(id)
      .then(post=> {
        commit('FILL_CURRENT_POST', post.data.data);
        return post.data.data;
      }).catch(err=> {throw err});
  },
  setCurrent: ({ commit, getters, state }, id) => {
    const post = getters.getById(id);
    if (post) {
      if (state.current.post.id != id)
        commit('REMOVE_CURRENTS');
      commit('FILL_CURRENT_POST', post);
      return post;
    }
  },
  /*
  removeCurrentComments: ({ commit }) => {
    commit('REMOVE_CURRENT_COMMENTS');
  },
  */
  getComments: ({ commit, state }, {postId, page}) => {
    const nextPage = page? page: state.current.comments.page + 1;
    const lastPage = state.current.comments.pages.last_page;
    if (lastPage == undefined || (nextPage <= lastPage)) {
      return PostService.getComments(postId, nextPage)
        .then(comments=> {
          commit('FILL_CURRENT_COMMENTS', comments.data);
          return comments.data.data;
        }).catch(err=> {throw err});
    }
  },
  getVoices: ({ commit }, { postId, page }) => {
    const nextPage = page? page: state.current.voices.page + 1;
    const lastPage = state.current.voices.pages.last_page;
    if (lastPage == undefined || (nextPage <= lastPage)) {
      return PostService.getVoices(postId, nextPage)
        .then(voices=> {
          commit('FILL_CURRENT_VOICES', voices.data);
          return voices.data.data;
        }).catch(err=> {throw err});
    }
  }
}

export const getters = {
  getById: state=> id=> {
    return state.posts.find(e=> e.id === id);
  },
  loadPosts: state => {
    return state.posts;
  }
}