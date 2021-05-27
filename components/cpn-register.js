export default{
    template: `
    <div class="container">
    회원 가입 페이지
    <form action="/">
    <fieldset class="uk-fieldset">
    <div class="uk-margin">
        <input class="uk-input" type="text" placeholder="아이디" v-model="mb_id">
    </div>
    <div class="uk-margin">
        <input class="uk-input" type="text" placeholder="비밀번호" v-model="mb_password">
    </div>
    <div class="uk-margin">
        <input class="uk-input" type="text" placeholder="회원 이름" v-model="mb_name">
    </div>
    <div class="uk-margin">
        <input class="uk-input" type="text" placeholder="회원 닉네임" v-model="mb_nick">
    </div>
    <div class="uk-margin">
        <textarea class="uk-textarea" rows="5" placeholder="메모" v-model="mb_memo"></textarea>
    </div>
    </fieldset>
    </form>
    <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">취소</button>
        <button class="uk-button uk-button-primary uk-modal-close" type="button" @click="register">회원가입</button>
    </p>
    </div>
    `,
    data(){
        return{
            mb_type : 'WEB',
            mb_id : '',
            mb_password : '',
            mb_name : '',
            mb_nick : '',
            mb_memo : ''
        }
    },
    methods: {
        register(){

            let form = new FormData() 
            form.append('mb_type', this.mb_type) 
            form.append('mb_id',this.mb_id)
            form.append('mb_password',this.mb_password)
            form.append('mb_name',this.mb_name)
            form.append('mb_nick',this.mb_nick)
            form.append('mb_memo',this.mb_memo)

            if(!this.mb_id) { 
                alert('아이디를 입력하지 않았습니다.'); return;
            }
            if(!this.mb_password) { 
                alert('비밀번호를 입력하지 않았습니다.'); return;
            }
            if(!this.mb_name) { 
                alert('이름을 입력하지 않았습니다.'); return;
            }
            if(!this.mb_nick) { 
                alert('닉네임을 입력하지 않았습니다.'); return;
            }

            if(this.mb_id && this.mb_password && this.mb_name && this.mb_nick){
                http.post('http://waaneetest1.cafe24.com/api/register', form)
                .then((response) => {
                    //console.log(response);   
                    this.$router.push('regSuccess')
                })
                .catch((error) => {
                    console.log(error);
                });
            }

        }
    },
}
