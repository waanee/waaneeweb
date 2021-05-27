<template>
    <div>
    <div class="topScroll" style="">
        <a href="#" class="top" uk-scroll uk-icon="icon: chevron-up; ratio: 1"></a>
        <br>
        <span class="top" v-if="isAuthenticated2" uk-icon="icon: pencil; ratio: 1" uk-toggle="target: #modal"></span>
        <!--<a href="#" class="reflash" @click="pageReflash()" uk-icon="icon: refresh; ratio: 1"></a>-->
    </div>
    <footer><div class="container">Copyright &copy; Noname All Right Reserved.</div></footer>
    
    <!-- <div id="footer_bottom">
        <ul>
            <li><router-link to="/"><span uk-icon="icon: home"></span><br>Dayily Feed</router-link></li>
            <li><router-link to="/portfolio"><span uk-icon="icon: sign-out"></span><br>portfolio</router-link></li>
            <li><router-link to="/portfolio"><span uk-icon="icon: sign-out"></span><br>guest</router-link></li>
            <li><router-link to="/about"><span uk-icon="icon: info"></span><br>about</router-link></li>
        </ul>
    </div> -->
    
    </div>
</template>

<script>
module.exports = {
    computed: {
        isAuthenticated2(){
            if(store.getters.isAuthenticated != 'undefined')
            return store.getters.isAuthenticated
        }
    },
    methods: {
        pageReflash(){ 
            this.$router.go('/community');
        }
    }
}
</script>