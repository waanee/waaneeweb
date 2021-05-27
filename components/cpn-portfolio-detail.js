export default{
    name:'PortfolioDetail',
    template:`
    <div>

        <div class="container">
            <div class="portfolio-detail" v-for="item in postDetail" v-if="item.id == id" >
                
                <div class="left">
                    <h2>{{item.title}}</h2>
                    <div class="link" v-if="item.contents.link">
                        <span uk-icon="link"></span>
                        <a v-bind:href="item.contents.link" target="_blank">{{item.contents.link}}</a>
                    </div>
                    
                    <div class="makett">
                        제작기간: <span>{{item.contents.date}}</span>
                    </div>
                    <div class="makett">
                        제작인원: <span>{{item.contents.maker}}</span>
                    </div>
                    <div class="makett">
                        제작관여: <span>{{item.contents.makein}}</span>
                    </div>
                    <div class="makett">
                        제작CMS: <span>{{item.contents.makecms}}</span>
                    </div>
                </div>
                <div class="right">
                    <div v-for="img in item.contents.img">
                        <img v-bind:src="img.src">
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            postDetail:[],
            id:[]
        }
    },
    created() {
        let idNum = this.$route.query.id;
        this.id.push(idNum);

        axios({
            method:'GET',
            url:'/portfolioList.json',
        })
        .then((response) => {
            this.postDetail = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    }
}