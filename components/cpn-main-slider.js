const SliderText = () => import('./cpn-slideText.js')

export default{
    template:`
    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="autoplay: true; animation: fade; max-height:500" >

        <ul class="uk-slideshow-items">
            <li>
                <img src="https://getuikit.com/docs/images/photo.jpg" alt="" uk-cover>
                <slider-text>
                    <span slot="title">세상은 생각보다 화려합니다.</span>
                    <span slot="subTitle">불타는 듯한 노을과 단풍은 상상만이 아닙니다.</span>
                </slider-text>
            </li>
            <li>
                <img src="https://getuikit.com/docs/images/dark.jpg" alt="" uk-cover>
                <slider-text>
                    <span slot="title">세상은 생각보다 화려합니다.</span>
                    <span slot="subTitle">불타는 듯한 노을과 단풍은 상상만이 아닙니다.</span>
                </slider-text>
            </li>
            <li>
                <img src="https://getuikit.com/docs/images/light.jpg" alt="" uk-cover>
                <slider-text>
                    <span slot="title">세상은 생각보다 화려합니다.</span>
                    <span slot="subTitle">불타는 듯한 노을과 단풍은 상상만이 아닙니다.</span>
                </slider-text>
            </li>
        </ul>

        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>

        <ul class="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin"></ul>

    </div>
    `,
    components:{
        SliderText
    }
}