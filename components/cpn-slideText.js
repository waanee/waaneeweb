export default{
    name:'SliderText',
    template:`
    <div>
        <div class="uk-position-cover" uk-slideshow-parallax="opacity: 0,0,0.2; backgroundColor: #000,#000"></div>
        <div class="uk-position-center uk-position-medium uk-text-center">
            <h2 uk-slideshow-parallax="y: 100,-100" style="transform: translate3d(0px, 0px, 0px);" class="">
            <slot name="title"></slot>
            </h2>
            <p uk-slideshow-parallax="y: 200,-200" style="transform: translate3d(0px, 0px, 0px);" class="">
            <slot name="subTitle"></slot>
            </p>
        </div>
    </div>
    `
}