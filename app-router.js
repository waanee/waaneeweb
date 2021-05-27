let MainPage = () => import('./components/cpn-mainpage.js')
let Portfolio = () => import('./components/cpn-portfolio.js')
let Blog = () => import('./components/cpn-blog.js')

let AboutPage = () => import('./components/cpn-about.js')
let PortfolioDetail = () => import('./components/cpn-portfolio-detail.js')

let Community = () => import('./components/cpn-community.js')
let CommunityDetail = () => import('./components/cpn-post.js')

let RegisterPage = () => import('./components/cpn-register.js')
let RegisterSuccess = () => import('./components/cpn-registerSuccess.js')

let RollingPage = () => import('./components/cpn-rolling.js')

let NotFoundComponent = () => import('./components/notFound.js')

let ModalContents = () => import('./components/cpn-modal.js');

// router path components
var routes = [
    {path:'/', name: 'index', component: Community},
    {path:'/about', name: 'about', component: AboutPage},
    {path:'/portfolio', name: 'portfolio', component: Portfolio},
    {path:'/blogList', name: 'blog', component: Blog},
    {path:'/portfolio/detail', name: 'portfolioView', component: PortfolioDetail},
    /*{path:'/community/', name: 'Community', component: Community,
        children:[
            {
                path:'post/:id', name: 'CommunityDetail', component: CommunityDetail,
            }
        ],
    },*/
    {path:'/post/:id', name: 'CommunityDetail', component: CommunityDetail},
    {path:'/register', name: 'regiser', component: RegisterPage},
    {path:'/regSuccess', name: 'regSuccess', component: RegisterSuccess},
    {path:'/rolling', name: 'Rolling', component: RollingPage},
    {path: '*', component: NotFoundComponent }
];

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    } else {
      const position = {}
      // new navigation.
      // scroll to anchor by returning the selector
      if (to.hash) {
        position.selector = to.hash
  
        // specify offset of the element
        if (to.hash === '#anchor2') {
          position.offset = { y: 100 }
        }
      }
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // cords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0
        position.y = 0
      }
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return position
    }
  }

var router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
          // Keep scroll position when using browser buttons
          return savedPosition
        }
        else {
          return { x: 0, y: 0 }
        }
      }
});