import { createRouter } from '../dist/index.es'

const a = document.createElement('div')
a.innerText = 'a'
const b = document.createElement('div')
b.innerText = 'b'

const router = createRouter({
  routes: [
    {
      path: '/',
      component: a,
    },
    {
      path: '/docs',
      component: b,
    },
  ],
})

console.log(router)
