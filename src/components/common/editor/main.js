import Vue from 'vue'
// import Editor from '../external/toast'
import Editor from './Editor.vue'

let instance

// function open () {
//   instance = instance || new Vue({
//     components: {
//       'editor': Editor
//     },
//     template: '<div class="post-container"><editor></editor></div>',
//     el: '.post-container',
//     data () {
//
//     }
//   })
//   instance.show = true
//   window.document.body.appendChild(instance.$el)
//   return Editor.open()
// }

function open (options) {
  let div = window.document.createElement('div')
  let Con = Vue.extend(Editor)
  instance = instance || new Con({
  })
  instance.$mount(div)
  if (typeof options === 'object') {
    Object.keys(options).forEach(e => {
      instance[e] = options[e]
      console.log(instance[e])
    })
  }
  window.document.body.appendChild(instance.$el)
  return instance.open()
}

function clearAllData () {
  instance.clearAllData()
}

function close () {
  instance.show = false
}

export default {
  open,
  close,
  clearAllData
}
