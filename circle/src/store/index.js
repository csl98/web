import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      curCity: { p: '', c: '', a: '' }
  },
  mutations: {
      set_curCity(store, val) {
          Vue.set(store.curCity, 'p', val.p);
          Vue.set(store.curCity, 'c', val.c);
          Vue.set(store.curCity, 'a', val.a);
      }
  },
  actions: {
  },
  modules: {
  }
})
