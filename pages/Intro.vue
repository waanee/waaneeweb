<template>
    <div class="container">
        intro

        <div id="test">TEST</div>
        <button type="button" @click="ajaxTest">jquery TEST</button>
    </div>
</template>

<script>
module.exports = {
    methods: {
        jqueryTest(){
            $('#test').hide();
            // jquery 사용 가능 확인!! 
        },

        ajaxTest(){
            
            // jquery ajax 사용가능 확인!!
            $.ajax({
                type: "POST",
                async: false,
                url: httpAjax+"/listPost/community",
                data: '',
                dataType: 'json',
                success: function (data) {
                    console.log(data);

                },
                error: function (e) {
                    console.log("ERROR : ", e);
                }
            });
            
        }
    },
}
</script>