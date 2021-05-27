
export default{
    template: `
    <div class="top-padding-space popup-modal">
        <div class="container backwithe border-line contents-box">
        
            <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid v-for="(item, index) in postDetail" v-bind:key="postDetail.id">
                <div class="contents-top">
                    <a href="javascript:history.back();" uk-icon="icon: arrow-left; ratio: 1.5"></a>
                    <span class="title">Daily Feed</span>
                    <span class="right">
                        <a href="#" uk-icon="icon: list; ratio: 1.3"></a>
                    </span>
                </div>
                <div class="uk-card-media-left uk-cover-container">
                   
                    <div uk-lightbox>
                        <a v-bind:href="item.img.files_url">
                        <img v-bind:src="item.img.files_url" class="contents-img" alt="">
                        
                        </a>
                    </div>

                </div>
                <div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">{{ item.po_subject }}</h3>
                        <p>
                        <a href="#" uk-icon="icon: heart; ratio: 0.8"> 좋아요 </a>
                        &nbsp;&nbsp;
                        <a href="#" uk-icon="icon: bookmark; ratio: 0.8"> 즐겨찾기 </a>
                        </p>
                        <p>{{ item.po_regdate }}</p>
                        <div v-if="isAuthenticated2">
                            <a href="" @click.prevent="deletePost">삭제</a>
                        </div>

                        <ul class="uk-subnav uk-subnav-pill contents-tabs" uk-switcher="animation: uk-animation-fade">
                            <li><a href="#">내용</a></li>
                            <li><a href="#">댓글</a></li>
                        </ul>
                        
                        <ul class="uk-switcher uk-margin">
                            <li>{{ item.po_contents }}</li>
                            <li class="">                        
                            <div style="clear:both">
                            <article class="uk-comment uk-comment-primary">
                                <ul class="uk-comment-list" v-for="(item, index) in postReply" v-bind:key="postReply.id" >
                                    <li>
                                        <article class="uk-comment uk-visible-toggle" tabindex="-1">
                                            <header class="uk-comment-header uk-position-relative">
                                                <div class="uk-grid-medium uk-flex-middle" uk-grid>
                                                    <div class="uk-width-auto">
                                                        <!--<img class="uk-comment-avatar" src="https://getuikit.com/docs/images/avatar.jpg" width="80" height="80" alt="">-->
                                                    </div>
                                                    <div class="uk-width-expand">
                                                        <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{item.mb_id}}</a></h4>
                                                        <p class="uk-comment-meta uk-margin-remove-top"><a class="uk-link-reset" href="#">{{item.po_rp_regdate}}</a></p>
                                                    </div>
                                                </div>
                                                <div class="uk-position-top-right uk-position-small uk-hidden-hover">
                                                    <span class="uk-link-muted" @click="onchangeSubmit(item.po_rp_no)">Reply</span> 
                                                    <span class="uk-link-muted" @click="delComment(item.po_rp_no)">Delete</span>
                                                </div>
                                            </header>
                                            <div class="uk-comment-body">
                                                <p>{{item.po_rp_contents}}</p>
                                            </div>
                                        </article>
                                        <ul v-for="(reply, index) in item.replys" >
                                            <li>
                                                <article class="uk-comment uk-comment-primary uk-visible-toggle" tabindex="-1">
                                                    <header class="uk-comment-header uk-position-relative">
                                                        <div class="uk-grid-medium uk-flex-middle" uk-grid>
                                                            <div class="uk-width-expand">
                                                                <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{reply.mb_id}}</a></h4>
                                                                <p class="uk-comment-meta uk-margin-remove-top"><a class="uk-link-reset" href="#">{{reply.po_rp_regdate}}</a></p>
                                                            </div>
                                                        </div>
                                                        <div class="uk-position-top-right uk-position-small uk-hidden-hover">
                                                            <span class="uk-link-muted" @click="delComment(reply.po_rp_no)">Delete</span>
                                                        </div>
                                                    </header>
                                                    <div class="uk-comment-body">
                                                        <p>{{reply.po_rp_contents}}</p>
                                                    </div>
                                                </article>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                            </article>

                            <input type="text" class="uk-input" v-model="po_rp_contents" placeholder="댓글달기.." ></input>
                            <div id="one" style="display:block">
                                <button class="uk-button uk-button-default uk-modal-close" type="button" @click="addComment">게시</button>
                            </div>
                            <div id="two" style="display:none;">
                                <button id="two-btn" class="uk-button uk-button-default uk-modal-close" type="button" @click="addComment(1)">대댓글작성</button>
                            </div>
                            </div>
                            </li>
                        </ul>


                    </div>
                </div>

                
                
            </div>

            
        </div>
    </div>
    `,
    computed: {
        isAuthenticated2(){
            if(store.getters.isAuthenticated != 'undefined')
            return store.getters.isAuthenticated
        }
    },
    data(){
        return{
            postDetail:[],
            po_id:'',
            po_rp_contents:'',
            po_rp_status:'Y',
            postReply:[]
        }
    },
    created() {

        let form = new FormData() 
        form.append('po_no', this.$route.params.id) 

        http.post('/getPost', form ,{
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                }
            })
            .then((response) => {
                this.postDetail = response.data;
            })
            .catch((error) => {
                console.log(error);
            });

            //setInterval(function(){
                this.comment();
                //var objDiv = document.getElementsByClassName('modal');
                //objDiv.scrollTo = objDiv.scrollHeight;
            //}.bind(this), 1000);
        
    },
    
    methods: {
        comment(){
            let form = new FormData() 
            form.append('po_no', this.$route.params.id)
            
            http.post('/listPostReply', form ,{
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                    }
                })
                .then((response) => {
                    this.postReply = response.data.data;
                    
                })
                .catch((error) => {
                    console.log(error);
                });
                console.log('comment!!');
        },
        // 포스트 삭제
        deletePost(){
            let form = new FormData() 
            form.append('po_no', this.$route.params.id) 
            form.append('mb_token', store.getters.isAuthenticated);

            http.post('/deletePost', form)
            .then((data) => {
                this.data = data.data;
                console.log(this.data);
                alert('글이 삭제되었습니다.');
                //router.push({ name: 'index'})
                this.$router.go('/');
            })
            .catch((error) => {
                console.log(error);
            });
        },
        // 댓글 정보 
        replyRe(){
            let form = new FormData() 
            form.append('po_no', this.$route.params.id) 
            http.post('/listPostReply', form ,{
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                }
            })
            .then((response) => {
                console.log(response.data);
                this.postReply = response.data.data;
                console.log(this.postReply);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        // 댓글 쓰기
        addComment(reply){
            let form = new FormData() 
            form.append('mb_token', store.getters.isAuthenticated);
            form.append('po_no', this.$route.params.id);
            form.append('po_id', this.po_id);
            form.append('po_rp_contents', this.po_rp_contents);
            form.append('po_rp_status', this.po_rp_status);

            if(reply){
                let getNo = document.getElementById('two-btn').getAttribute('data-id');
                //alert(getNo);
                form.append('po_rp2_no', getNo);
            } 

            if(!this.po_rp_contents) {
                alert('입력된 내용이 없습니다.'); 
                return;
            }

            
            http.post('/updatePostReply', form)
            .then((data) => {
                this.data = data.data;
                console.log(this.data);
                //alert('댓글이 등록 되었습니다.');
                this.replyRe();
                //router.push({ name: 'community'})
            })
            .catch((error) => {
                console.log(error);
            });
        },
        delComment(id){
            let form = new FormData() 
            form.append('po_rp_no', id);
            form.append('mb_token', store.getters.isAuthenticated);

            http.post('/delPostReply', form)
                .then((data) => {
                    this.data = data;
                    if(this.data.data.status == '1'){
                        alert('댓글이 삭제 되었습니다.');
                        this.replyRe();
                    }else{
                        alert(this.data.data.msg);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        onchangeSubmit(e){
            alert(e);
            document.getElementById('one').style.display = "none";
            document.getElementById('two').style.display = "block";
            document.getElementById('two-btn').setAttribute('data-id', e);
        },
    }
    
}