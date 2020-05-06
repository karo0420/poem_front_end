import PostService from '@/services/PostService';

export const namespaced = true;
export const state = {
  posts: [],
  current: {
    post: {},
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
    state.current.comments.page = comments.meta.current_page
  },
  REMOVE_CURRENT_COMMENTS: (state) => {
    state.current.comments = {data: [], pages: {}, page: 0};
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
        commit('REMOVE_CURRENT_COMMENTS');
      commit('FILL_CURRENT_POST', post);
      return post;
    }
  },
  removeCurrentComments: ({ commit }) => {
    commit('REMOVE_CURRENT_COMMENTS');
  },
  getComments: ({ commit, state }, {postId, page}) => {
    const nextPage = page? page: state.current.comments.page + 1;
    const lastPage = state.current.comments.pages.last_page;
    if (lastPage == undefined || (nextPage <= lastPage)) {
      return PostService.getComments(postId, nextPage)
        .then(comments=> {
          commit('FILL_CURRENT_COMMENTS', comments.data)
          return comments.data.data;
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