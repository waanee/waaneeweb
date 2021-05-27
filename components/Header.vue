<template>
    <header uk-sticky="">
    <!--<header uk-sticky="show-on-up: true; animation: uk-animation-slide-top">-->
    <nav class="uk-navbar-container header container" uk-navbar>
        <div class="uk-navbar-left">
            <router-link to="/">
                <!-- <img src="./assets/images/logo.png?v=0.1" class="logo"> -->
                LOGO
            </router-link>
        </div>
        <div class="uk-navbar-center mobile-hide">
            <ul class="uk-navbar-nav">
                <li><router-link to="/">MAIN</router-link></li>
                <li><router-link to="/rolling">MENU1</router-link></li>
                <li><router-link to="/portfolio">MENU2</router-link></li>
                <li><router-link to="/about">MENU3</router-link></li>
                <li><router-link to="/portfolio">MENU4</router-link></li>
            </ul>
        </div>
        <div class="uk-navbar-right">

            <!-- 메시지 -->
            <span uk-icon="icon: comments" v-if="isAuthenticated2" class="header-right-icon mobile-hide" ></span>
            <!-- 좋아요 한 글 -->
            <span uk-icon="icon: heart" v-if="isAuthenticated2" class="header-right-icon mobile-hide" ></span>
            <!--<span uk-icon="icon: pencil" v-if="isAuthenticated2" uk-toggle="target: #modal" class="header-right-icon" ></span>-->

            <!-- 로그인 비로그인시 -->
            <span v-if="isAuthenticated2">
                <span uk-icon="icon: sign-out" class="header-right-icon" @click.prevent="onClickLogout"></span>
            </span>
            <span v-else>
                <span uk-icon="icon: user" uk-toggle="target: #login" class="header-right-icon" ></span>
            </span>


        </div>
    </nav>
    </header>
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
        onClickLogout(){
            // 로그아웃 변이 실행후 리다이렉트
            store.dispatch('LOGOUT').then(() => this.$router.push('/'))
        }
    },
}
</script>

<style>
</style>

