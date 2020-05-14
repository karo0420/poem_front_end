import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress';
import Store from '@/store';
import Ax from '@/services/Ax';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: ()=> import('@/views/Home'),
    meta: {
      nonStop: true
    },
    beforeEnter: (to, from, next) => {
      //console.log('beforeEnter')
      NProgress.start();
      Store.dispatch('post/getAll')
        .then(posts=> {
          to.params.posts = posts;
          NProgress.done();
          next();
        })
        .catch(err=> {
          NProgress.done();
          console.log('From route: ', err.message);
          next(); // Lead to retry
        });
    }
  },
  {
    path: '/posts/:id',
    name: 'Detail',
    props: true,
    meta: {
      dependUrls: []
    },
    component: ()=> import('@/views/posts/Detail'),
    beforeEnter: (to, from, next) => {
      to.meta.dependUrls = [
        '/comments/'+ to.params.id,
        '/voices/'+ to.params.id
      ];
      NProgress.start();
      Store.dispatch('post/setCurrent', to.params.id)
        .then(post=> {
          if (post) {
            to.params.post = post;
            NProgress.done();
            next();
          }else { // Load post
            Store.dispatch('post/getById', to.params.id)
              .then(post=> {
                to.params.post = post;
                NProgress.done();
                next();
              })
              .catch(err=> {
                NProgress.done();
                console.log('2 From route: ', err.message);
                next() // Lead to retry
              })
          }
        })
        .catch(err=> {
          NProgress.done();
          console.log('From route: ', err.message);
          next() // Lead to retry
        });
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.afterEach((to, from) => {
  if (from.path != '/') {
    console.log('Check')
    if (from.meta.nonStop == undefined) {
      Ax.cancel([
        from.fullPath,
        ...from.meta.dependUrls
      ]);
    }
  }
})

export default router
