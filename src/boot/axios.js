import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000/' })
const spotifyApi = axios.create({ baseURL: 'https://api.spotify.com/' })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api


  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file


  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { axios, api, spotifyApi }
