export default{
    template: `
    <div id="contentsView" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
            <h2 class="uk-modal-title">contentsView</h2>
            모달 컨텐츠 
        </div>
    </div>
    `,
    data(){
        return{
            showModal: this.$router.meta.showModal,
        }
    },
    created(){
        
        console.log(this.showModal);
        UIkit.modal('#contentsView').show();
    },
    methods: {
        
    }
}
