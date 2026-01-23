import api from '@/utils/api'

export async function listFindings(params = {}) {
  // params could be serialized into query string if needed
  // for now use simple endpoint
  const res = await api.apiGet('/findings/list')
  return res.data
}

export async function createFinding(payload) {
    const res = await api.apiPost('/findings', payload)
    return res.data
}

export default {
  listFindings,
  createFinding
}
