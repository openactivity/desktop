import Vue from 'vue'
import Router from 'vue-router'
import { routers, appRouter } from './router';

import Util from '../util/util';

Vue.use(Router)

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

const router =  new Router(RouterConfig);

router.beforeEach((to, from, next) => {
    Util.title(to.meta.title);
    Util.toDefaultPage([...routers], to.name, router, next);
})


router.afterEach((to) => {
    window.scrollTo(0, 0);
});

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router