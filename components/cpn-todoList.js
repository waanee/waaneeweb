export default{
    template:`
    <div id="modal" uk-modal>
        <div class="uk-modal-dialog">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <div class="uk-modal-header">
                <h2 class="uk-modal-title">오늘할일</h2>
            </div>
            <div class="uk-modal-body">

                <div v-for="(todoItem, index) in todoItems" class="itemlist">
                    - {{todoItem}}
                    <span class="rightBtn" v-on:click="deleteItem(todoItem, index)">삭제</span>
                </div>
            </div>
            <div class="uk-modal-footer uk-text-right">
                <input type="text" v-model="newtodoItem" class="uk-input" v-on:keyup.enter="addItem">
            </div>
            <div class="uk-modal-footer uk-text-right"> 
                <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button> 
                <button class="uk-button uk-button-primary" v-on:click="addItem">Ok</button> 
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            newtodoItem : '',
            todoItems : []
        }
    },
    methods: {
        // item add
        addItem(){
            if(this.newtodoItem !== ''){
                localStorage.setItem(this.newtodoItem, this.newtodoItem);
                this.todoItems.push(this.newtodoItem);

                this.newtodoItem = '';
            }
        },
        // item delete
        deleteItem(todoItem, index){
            localStorage.removeItem(todoItem);
            this.todoItems.splice(index, 1);
        }

    },
    created() {
        if(localStorage.length > 0){
            for(var i=0; i<localStorage.length; i++){
                if(localStorage.key(i) !== 'favorite_tables'){
                    this.todoItems.push(localStorage.getItem(localStorage.key(i)));
                }
            }
        }
    },
}