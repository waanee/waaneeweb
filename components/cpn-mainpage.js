const MainSlider = () => import('./cpn-main-slider.js')
const MainContent1 = () => import('./cpn-mainContent1.js')

export default{
    template: `
    <div>..
        <main-slider></main-slider>
        <div class="section_type02">
            <div class="container">
                <main-content1></main-content1>
            </div>
        </div>
    </div>
    `,
    components:{
        MainSlider,
        MainContent1
    }
}