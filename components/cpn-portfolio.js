export default{
    template:`
    <div class="container" style="clear:both; padding:10px">
        
        <div class="uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2" uk-grid style="padding:10px 0px;"
                v-infinite-scroll="loadMore" 
                infinite-scroll-disabled="busy" infinity-scroll-distance="limit"
                uk-grid="masonry: true"
                 > 

            <div v-for="(item, index) in posts" v-bind:key="item.id" >                
                <div class="uk-card uk-card-default">
                
                    <div class="uk-card-media-top uk-cover-container" v-if="item.thumbnail">
                        <img v-bind:src="item.thumbnail" class="border-round" alt="">
                        
                    </div>
                    
                    <div>
                        <div class="uk-card-footer">
                        <router-link v-bind:to="item.url">
                            {{ item.title }}
                            <p>제작기간 : {{ item.contents.date }}</p>
                        </router>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        
    </div>
    `,
    data(){
        return{
            posts:[]
        }
    },
    created() {
        axios.get('./portfolioList.json')
            .then((response) => {
                this.posts = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
}