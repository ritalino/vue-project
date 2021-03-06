import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../api/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    posts: []
  },
  actions: {
    loadPostsList: function ({ commit }) {
      Api().get('/posts')
        .then((response) => {
          commit('SET_POSTS_LIST', { list: response.data }, (err) => {
            console.log(err)
          })
        })
    },
    async createPost ({ state, dispatch, commit }, newPostInfo) {
      await Api().post('posts', { user: newPostInfo.user, title: 'title', content: newPostInfo.content })
    },
    async deletePost ({ state, dispatch, commit }, post) {
      await Api().delete(`posts/${post._id}`)
      return dispatch('loadPostList', { commit })
    }
  },
  mutations: {
    SET_POSTS_LIST: (state, { list }) => {
      state.posts = list.data
    }
  },
  getters: {
    getPostsList: state => state.posts
  }
})

export default store
