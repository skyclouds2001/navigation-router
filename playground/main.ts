import { createRouter } from '../dist/index.es'

const home = document.createElement('div')
home.innerText = 'home'
const a = document.createElement('div')
a.innerText = 'a'
const b = document.createElement('div')
b.innerText = 'b'

const router = createRouter({
  routes: [
    {
      path: '/',
      component: home,
    },
    {
      path: '/a',
      component: a,
    },
    {
      path: '/b',
      component: b,
    },
  ],
})

console.log(router)
