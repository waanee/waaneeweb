
const enhanceAccessToeken = () => {
    const {mb_token} = localStorage
    if (!mb_token) return
    axios.defaults.headers.common['Authorization'] = `Bearer ${mb_token}`;
  }
  enhanceAccessToeken();

var store = new Vuex.Store({
    state: {
        mb_token: null
    },
    getters: {
        isAuthenticated (state) {
          state.mb_token = state.mb_token || localStorage.mb_token
          return state.mb_token
        }
      },
      mutations: {
        LOGIN (state, {mb_token}) {
          state.mb_token = mb_token
          localStorage.mb_token = mb_token
          alert('로그인 되었습니다!');
          //UIkit.modal.dialog('<p class="uk-modal-body">회원로그인 되었습니다!</p>');
        },
        LOGOUT (state) {
          state.mb_token = null
          delete localStorage.mb_token
          //UIkit.modal.dialog('<p class="uk-modal-body">로그아웃 되었습니다!</p>');
        }
      },
      actions: {
        LOGIN ({commit}, {id, password, mb_type}) {
        //console.log(mb_type);
          let form = new FormData() 
          form.append('mb_id', id) 
          form.append('mb_password',password)
          //form.append('mb_type',mb_type)

          return http.post(`/login`, form)
            .then(({data}) => {
              //console.log(data)
              
              if(data.status == -2){
                alert('회원 정보가 바르지 않습니다. 다시 로그인 해주세요!');
                //UIkit.modal.dialog('<p class="uk-modal-body">회원 정보가 바르지 않습니다. 다시 로그인 해주세요!</p>');
                return;
              }else if(data.status == 0){
                alert(data.msg);
                return;
              }else{ 
                alert('회원 로그인 되었습니다.');
                //UIkit.modal('#login').hide();
              }

              commit('LOGIN', data.data)
              axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.mb_token}`
              
            })
        },
        LOGOUT ({commit}) {
          axios.defaults.headers.common['Authorization'] = undefined
          commit('LOGOUT')
        },
      }
});