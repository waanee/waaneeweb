//import { Community } from './cpn-community';
let Community = () => import('./cpn-community.js');

export default{
    template: `
    <div id="modal" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
            <h4 class="uk-modal-title">글쓰기</h4><br><br>
            <form action="/" enctype="multipart/form-data" >
            <fieldset class="uk-fieldset">
            <div class="uk-margin">
                <input class="uk-input" type="text" placeholder="subject" v-model="po_subject">
            </div>    
            <div class="uk-margin">
                <textarea class="uk-textarea" rows="5" placeholder="contents" v-model="po_contents"></textarea>
            </div>
            </fieldset>
            </form>
            
            <div>
            이미지 업로드
            <input class="uk-input" type="file" name="userfile" id="userfile">
            <button class="uk-button uk-button-primary" type="button" @click="uploadFile">업로드</button>
            </div>

            <div id="uploadImgThumb" v-for="(item, index) in pg_files_path" v-bind:key="pg_files_path.id">
                <img v-bind:src="item" style="width:100px;">
            </div>

            <p class="uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                <button class="uk-button uk-button-primary uk-modal-close" type="button" @click="addWrite">Save</button>
            </p>
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
            po_subject : '',
            po_contents : '',
            po_files : '',
            po_vod : '',
            pg_files_path : []
        }
    },
    methods: {
        addWrite(){
            
            let form = new FormData() 
            form.append('mb_token', store.getters.isAuthenticated) 
            form.append('po_subject',this.po_subject)
            form.append('po_contents',this.po_contents)
            form.append('po_vod',this.po_vod)
            form.append('po_files',this.po_files)

            http.post('/updatePost/community', form)
            .then((data) => {
                console.log(data);
                if(data.data.status == 1) alert('글 등록이 완료 되었습니다.');
                router.push({ name: 'CommunityDetail', params: { id: data.data.data.idxno }});

                //this.$router.go('/');
                
                //EventBus.$on('loadMore');
                //Community.loadMore();
            })
            .catch((error) => {
                console.log(error);
            });
        },
        uploadFile(){
            let userfile = document.getElementById("userfile")
            
            if(userfile.files[0]){            
                let form = new FormData() 
                form.append('userfile',userfile.files[0])
                
                http.post('/uploadFile', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((data) => {
                    console.log(data);
                    if(data.data.status == 1){ 
                        //alert('이미지가 업로드 되었습니다.');
                        this.po_files = data.data.data.files_no;
                        
                        // 업로드한 파일경로 가져옴.
                        let filePath = data.data.data.files_path;
                        let pg_files_path = 'https://waaneetest1.cafe24.com/' + filePath;

                        this.pg_files_path.push(pg_files_path);
                    }
                    
                })
                .catch((error) => {
                    console.log(error);
                });

            }else{
                alert('업로드 할 파일이 없습니다.');
            }

        }
    },
}
