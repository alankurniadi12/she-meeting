const BASE_URL = import.meta.env.VITE_API_URL

let _authToken = null

export function setAuthToken(token) {
  _authToken = token
}

function buildHeaders(headers = {}) {
  const h = { ...headers }
  if (_authToken) h['Authorization'] = `Bearer ${_authToken}`
  if (!h['Content-Type']) h['Content-Type'] = 'application/json'
  return h
}

async function request(path, options = {}) {
  // ensure single slash between base and path
  const base = (BASE_URL || '').replace(/\/$/, '')
  const p = (path || '').replace(/^\//, '')
  const url = `${base}/${p}`
  console.log('Check BASE_URL = API Request:', url)
  const opts = { ...options }
  opts.headers = buildHeaders(opts.headers || {})

  try {
    const res = await fetch(url, opts)
    if (!res.ok) {
      const text = await res.text()
      const err = new Error(text || res.statusText)
      err.status = res.status
      throw err
    }

    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) return res.json()
    return res.text()
  } catch (e) {
    // Network-level error: server down, DNS failure, CORS issue, etc.
    if (e.message === 'Failed to fetch') {
      throw new Error('Tidak dapat terhubung ke server API')
    }
    // Re-throw application errors (from !res.ok block)
    throw e
  }
}

export const apiGet = (path) => request(path, { method: 'GET' })
export const apiPost = (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) })
export const apiPut = (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) })
export const apiDelete = (path) => request(path, { method: 'DELETE' })

export default {
  setAuthToken,
  apiGet,
  apiPost,
  apiPut,
  apiDelete
}
