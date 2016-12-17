import Vue from 'vue'
import Ajax from 'vue-resource'

Vue.use(Ajax)
console.log(Vue)

export const fetchMeInfo = function () {
  this.$http.get(config.meApi).then((response) => {
    let remoteData
    if (typeof response.body === 'object') remoteData = response.body
    else remoteData = JSON.parse(response.body)
    this.userInfo = remoteData
    this.$store.dispatch('fetchMeInfo', remoteData)
  })

}