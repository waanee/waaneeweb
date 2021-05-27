export default{
    template: `
    <div id="offcanvas-overlay" uk-offcanvas="overlay: true;">
    <div class="uk-offcanvas-bar uk-flex uk-flex-column">

        <ul class="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
            <li><router-link to="/" onclick="UIkit.offcanvas.hide([force = false]);">메인</router-link></li>
            <li><router-link to="/community" onclick="UIkit.offcanvas.hide([force = false]);">커뮤니티</router-link></li>
            <li><router-link to="/about" onclick="UIkit.offcanvas.hide([force = false]);">소개</router-link></li>
            <li><router-link to="/portfolio" onclick="UIkit.offcanvas.hide([force = false]);">포트폴리오</router-link></li>
            <li><router-link to="/register" onclick="UIkit.offcanvas.hide([force = false]);">회원가입</router-link></li>
        </ul>

    </div>
    </div>
    `,
    created() {

    },
}