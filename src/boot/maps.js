let promise = null

//           <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbUzP0wuTGUR02IHBzYaq0ikUumJVWt7U"></script>
//       <script src="https://cdn.jsdelivr.net/gh/googlemaps/v3-utility-library@markermanager/1.2/markermanager_packed.js"></script>
//             <script src="https://cdn.jsdelivr.net/gh/googlemaps/v3-utility-library@markermanager/1.2/markermanager.js"></script>
// <script src="https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js"></script>

export default ({ app, router, Vue }) => {

  let id = 'google-cdn'
  let apiKey = 'AIzaSyCfncM4X8Nv0rBOfMs3tWJiH2F8g_HGht0'
  let url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`

  Vue.prototype.$google = function () {
    if (!promise) {
      promise = new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          console.error(`Error loading ${url} async: ${id} is not unique`)
          return
        }
        let script = document.createElement('script')
        script.src = url
        script.async = true
        script.id = id
        script.onload = () => {
          resolve()
        }
        script.onerror = (err) => {
          reject(err)
        }
        document.body.appendChild(script)
      })
    }
    return promise
  }
}
