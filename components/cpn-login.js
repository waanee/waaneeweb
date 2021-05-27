export default{
    template: `
    <div id="login" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
            <h2 class="uk-modal-title">LOGIN</h2>
            <form action="/" @submit.prevent="onSubmit(id, password, mb_type)">
            <fieldset class="uk-fieldset">
            <div class="uk-margin">
                <input class="uk-input" v-model="id" type="text" placeholder="USER ID">
            </div>
            <div class="uk-margin">
                <input class="uk-input" v-model="password" type="password" placeholder="PASSWORD">
            </div>
            <p class="uk-text-right">
            <input class="uk-button uk-button-primary" type="submit" value="Login">
            </p>
            </fieldset>
            </form>
        </div>
    </div>
    `,
    data(){
        return{
            id:'',
            password: '',
            mb_type:'APP',
            msg: ''
        }
    },
    methods: {
        onSubmit(id, password, mb_type) {
          this.$store.dispatch('LOGIN', {id, password, mb_type})
            .then(() => this.redirect())
            .catch(({message}) => this.msg = message);
  
            console.log(1);
        },
        redirect() {
          const {search} = window.location
          const tokens = search.replace(/^\?/, '').split('&')
          const {returnPath} = tokens.reduce((qs, tkn) => {
            const pair = tkn.split('=')
            qs[pair[0]] = decodeURIComponent(pair[1])
            return qs
          }, {})
          this.$router.push(returnPath)
        }
      }
}
