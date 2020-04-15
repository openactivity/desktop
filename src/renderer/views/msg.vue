<style lang="less">
</style>

<template>
    <div id="msg-dependencies" v-if="msg == 0"></div>
</template>

<script>
export default {
    name: "msg",
    components: {},
    props: {
    },
    computed: {
        msg(){
            var msg = this.$store.state.app.msg;
            console.log(msg);
            if(msg!=null && msg.content != ""){
                this.$Message[msg.type](msg.content);
            }
            return this.$store.state.app.msg.count;
        }
	},
    data() {
        return {
          
        };
    },
    methods: {
        
    },
    mounted() {}
};
</script>
