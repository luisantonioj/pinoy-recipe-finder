import axios from 'axios'

// For real APIs, set baseURL to your backend.
// For local JSON (if moved to /public), you'd do: axios.get('/data/recipes.json')
const instance = axios.create({
  baseURL: '/',
  timeout: 10000,
})

instance.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
)

export default instance
