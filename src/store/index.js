import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: '',
    resultUrl: '',
    isLoading: false,
    error: null
  },
  mutations: {
    SET_RESULT_URL(state, payload) {
      state.resultUrl = payload
      state.error = null
      state.isLoading = false
    },
    SET_ERROR_PROCESS(state, payload) {
      if (payload.status == 400) {
        state.error = 'Url is invalid' 
      } else {
        state.error = payload.data.error
      }
      state.resultUrl = ''
      state.isLoading = false
    },
    SET_IS_LOADING(state) {
      state.isLoading = true
    }
  },
  actions: {
    generateUrl({commit}, payload) {
      commit('SET_IS_LOADING')
      return new Promise((resolve, reject) => {
        if (payload.includes('https://')) {
          payload = payload.replace('https://', '')
        } else if (payload.includes('http://')) {
          payload = payload.replace('http://', '')
        }
        payload = 'https://'+payload        
        let data = JSON.stringify({
          url: payload
        })
        axios.post('https://url-shortener-service.p.rapidapi.com/shorten', data, {
          "headers":{
            "content-type":"application/json",
            "x-rapidapi-host":"url-shortener-service.p.rapidapi.com",
            "x-rapidapi-key":"c9527ba4aamsh962f604ae95ed62p1ee976jsnf15599114326"
          }
        })
        .then((res)=>{          
          commit('SET_RESULT_URL', res.data.result_url)
          resolve(res.data)
        })
        .catch((err)=>{          
          commit('SET_ERROR_PROCESS', err.response)
          reject(err)
        })
      })            
    }
  },
  modules: {
  }
})
