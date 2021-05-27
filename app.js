let HeaderComponent = () => import('./components/cpn-header.js?ver=1');
let FooterComponent = () => import('./components/cpn-footer.js');
let WriteComponent = () => import('./components/cpn-writePost.js');
let LoginComponent = () => import('./components/cpn-login.js');
//let ModalComponent = () => import('./components/cpn-modal.js');
//let vueScrollBehavior = () => import('./vue-scroll-behavior.js');

/* Vue.use(vueScrollBehavior, {
    router: router,
    // maxLength: 3,
    // ignore: [/\/b/, /\/m/],
    // delay: 0
}) */

var EventBus = new Vue();

var app = new Vue({
    el: '#app',
    data() {
        return{
            
        }
    },
    components: {
        HeaderComponent,
        FooterComponent,
        WriteComponent,
        LoginComponent,
        //ModalComponent
    },
    router,
    store
});	