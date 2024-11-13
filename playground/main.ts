import { createRouter } from '../dist/index.es'

const createComponent = (name: string) => {
  const el = document.createElement('div')
  el.innerText = name
  el.title = name
  el.setAttribute('data-testid', name)
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
    {
      path: '/c',
      components: {
        default: createComponent('c'),
        c1: createComponent('c1'),
        c2: createComponent('c2'),
      },
    },
  ],
})

console.log(router)
