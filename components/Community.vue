<template>
    <div class="container" style="clear:both; padding:10px">

    <div uk-grid>            
        <div class="uk-width-expand@m">
        
            <div class="uk-child-width-1-2@l uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1" uk-grid style="padding:10px 0px;"
                    v-infinite-scroll="loadMore" 
                    infinite-scroll-disabled="busy" infinity-scroll-distance="limit"
                    uk-grid="masonry: true"
                    > 

                <div id="itemRoading" style="width:100%; display:none; text-align:center;"><img src="../assets/images/ajax-loader.gif"></div>    

                <div v-for="(item, index) in posts" v-bind:key="item.id" >                
                    <div class="uk-card uk-card-default round-box">
                    
                        <div class="uk-card-media-top uk-cover-container" v-if="item.po_files">
                            <img v-bind:src="item.img.files_url" class="border-round" alt="" @click="goPage(item.po_no)">
                            
                        </div>
                        
                        <div>
                            <div class="uk-card-footer">
                                <router-link :to="{name:'CommunityDetail', params:{id: item.po_no}}" class="uk-button uk-button-text">{{ item.po_subject }}</router-link>
                                <div style="padding-top:10px;">
                                    <i uk-icon="icon: heart; ratio: 0.8" ></i> 15 
                                    <i uk-icon="icon: commenting; ratio: 0.8" ></i> 15 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


            </div>


            <div id="sidemenu" class="uk-width-1-3@m" style="position:relative">
                <div style="position:fixed; top:100px; background:#ffffff; width:300px; height:500px;">
                    side menu
                    <div>
                        profile img area
                    </div>

                    <div id="tags">
                        <span class="uk-badge">웃긴이미지</span>
                        <span class="uk-badge">웃긴움짤</span>
                        <span class="uk-badge">데일리</span>
                        <span class="uk-badge">내가그린그림</span>
                        <span class="uk-badge">유튜브</span>
                        <span class="uk-badge">100</span>
                        <span class="uk-badge">데일리</span>
                        <span class="uk-badge">내가그린그림</span>
                        <span class="uk-badge">유튜브</span>
                        <span class="uk-badge">100</span>
                        <span class="uk-badge">데일리</span>
                        <span class="uk-badge">내가그린그림</span>
                        <span class="uk-badge">유튜브</span>
                        <span class="uk-badge">100</span>
                    </div>

                    <div>
                        소개 / 사용방법 / 개인정보처리방침
                    </div>

                    <div>
                        Copyright &copy; WAANEE All Right Reserved.
                    </div>
                </div>
            </div>

        </div>
        
    </div>
</template>

<script>
module.exports = {
    data(){
        return{
            posts:[],
            postDetail:[],
            page:0,
            busy: false,
            itemNum: '',
            limit: 12
        }
    },
    methods: {
        loadMore(){

            //document.getElementById('itemRoading').style.display = 'block';

            http.post('/listPost/community', '{page: 1}')
            .then((response) => {
                this.itemNum = response.data.meta.pages;
            });

            var pagenum = this.page;
            if(this.page > this.itemNum){
                this.busy = false;
                return;
            }else{
                this.busy = true;
                pagenum = this.page + 1;
            }

            this.page = pagenum;
            
            let form = new FormData() 
            form.append('page', pagenum);
            form.append('limit', this.limit);

            http.post('/listPost/community', form)
            .then((response) => {

                //document.getElementById('itemRoading').style.display = 'none';

                const listData = response.data.data;
                this.posts = this.posts.concat(listData);
                this.busy = false;
                this.itemNum = response.data.meta.pages;

            })
            .catch((error) => {
                console.log(error);
            });

            

        },

        onClick(id){
            let form = new FormData() 
            form.append('po_no', id) 

            http.post('/getPost', form ,{
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',}
            })
            .then((res) => {
                this.postDetail = res.data;
            })
            .catch((error) => {
                console.log(error);
            });
        },

        goPage(id){
            this.$router.push('/post/'+id);
        }
    },
}
</script>