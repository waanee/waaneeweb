<template>
    <div class="container">
        intro

        <div id="test">TEST</div>
        <button type="button" @click="jqueryTest">jquery TEST</button>
    </div>
</template>

<script>
module.exports = {
    methods: {
        jqueryTest(){
            $('#test').hide();
            // jquery 사용 가능 확인!! 
        }
    },
}
</script>