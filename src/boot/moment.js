// import something here
import moment from 'moment'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files

// import moment from 'moment'

export default async (context) => {
  context.Vue.prototype.$moment = moment
}
