import { defineStore } from 'pinia'
import * as findingService from '@/services/findingService'

export const useFindingStore = defineStore('finding', {
  state: () => ({
    items: [],
    loadingList: false,
    loadingAdd: false,
    error: null
  }),
  actions: {
    async fetchFindings() {
      this.loadingList = true
      this.error = null
      try {
        // adapt to API shape
        this.items = await findingService.listFindings()
      } catch (err) {
        this.error = err.message || 'Failed to fetch findings.'
      } finally {
        this.loadingList = false
      }
    },

    async addFinding(payload) {
      this.loadingAdd = true
      this.error = null
      try {
        const res = await findingService.createFinding(payload)
        this.items.unshift(res)
        return res
        // const res = await findingService.createFinding(payload)
        // // if API returns created item, prepend it; otherwise assume payload
        // const created = res && (res.data || res.item || res) ? (res.data || res.item || res) : payload
        // // unshift to add to start of list
        // this.items.unshift(created)
        // return created
      } catch (err) {
        this.error = err.message || 'Failed to add finding.'
        throw err
      } finally {
        this.loadingAdd = false
      }
    }
  }
})
