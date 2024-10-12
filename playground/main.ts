import { createRouter } from '../dist/index.es'

const createComponent = (name: string) => {
  const el = document.createElement('div')
  el.innerText = name
  return el
}

const router = createRouter({
  routes: [
    {
      path: '/',
      component: createComponent('home'),
    },
    {
      path: '/a',
      component: createComponent('a'),
    },
    {
      path: '/b',
      component: createComponent('b'),
    },
  ],
})

console.log(router)
