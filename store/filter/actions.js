import dayjs from 'dayjs'
import localforage from 'localforage'

export default {
  handleSetFilterCategory ({ rootState, dispatch }, categoryId) {
    const filterCategoryId = rootState.filter.categoryId
    const filterCategory = rootState.categories.items[categoryId]

    if (filterCategoryId === categoryId) {
      if (filterCategory?.parentId !== 0) {
        dispatch('setFilterCategoryId', null)
        dispatch('setFilterCategoryId', filterCategory.parentId)
      }
      else {
        dispatch('setFilterCategoryId', null)
      }
    }
    else {
      dispatch('setFilterCategoryId', categoryId)
    }
  },

  setFilterCategoryId ({ state, commit }, categoryId) {
    state.categoryId === categoryId
      ? commit('setFilterCategoryId', null)
      : commit('setFilterCategoryId', categoryId)
    // TODO: save to composition api
  },

  setFilterWalletId ({ state, commit }, walletId) {
    state.walletId === walletId
      ? commit('setFilterWalletId', null)
      : commit('setFilterWalletId', walletId)
    // TODO: save to composition api
  },

  setPeriod ({ commit, dispatch }, period) {
    if (period.custom) {
      commit('setPeriod', period.name)
      commit('setDate', dayjs().startOf(period.value).valueOf())
      // TODO save to local
      return
    }

    commit('setPeriod', period)
    commit('setDate', dayjs().startOf(period).valueOf())
    localforage.setItem('finapp.filter.period', period)
    dispatch('ui/saveUiView', null, { root: true })
  },

  setDate ({ commit }, date) {
    commit('setDate', dayjs(date).valueOf())
  },

  setPeriodNext ({ state, commit, rootState, rootGetters }) {
    if (rootGetters['trns/hasTrns']) {
      const trns = rootState.trns.items
      const firstCreatedTrnIdFromSelectedTrns = rootGetters['trns/firstCreatedTrnIdFromSelectedTrns']
      const firstCreatedTrn = trns[firstCreatedTrnIdFromSelectedTrns]
      if (!firstCreatedTrn) return
      const firstCreatedTrnDate = dayjs(firstCreatedTrn.date).startOf(state.period).valueOf()
      const filterDate = state.date
      const nextDate = dayjs(filterDate).subtract(1, state.period).startOf(state.period).valueOf()
      if (nextDate >= firstCreatedTrnDate) commit('setPeriodNext', nextDate)
    }
  },

  setPeriodPrev ({ state, commit, rootGetters }) {
    if (rootGetters['trns/hasTrns']) {
      const filterDate = state.date
      const nextDate = dayjs(filterDate).add(1, state.period).startOf(state.period).valueOf()
      if (nextDate < dayjs().valueOf()) commit('setPeriodPrev', nextDate)
    }
  }
}
