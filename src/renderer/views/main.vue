<style lang="less">
    .main {
        position: absolute;
        width: 100%;
        height: 100%;

        .layout-ceiling {
            background: rgba(255, 255, 255, 1);
            display: flex;
            justify-content: space-between;
            /* overflow: hidden; */
            -webkit-box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0470588235294118);
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0470588235294118);
            height: 60px;
            .menu{
                
            }
            .bar {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 30px;
                font-size: 15px;
                width: 300px;

                i {
                    cursor: pointer;
                }
            }
        }

        .single-page {}
    }
</style>

<template>
    <div class="main">
        <!-- <div class="layout-ceiling">
            <div class="menu">
                <Menu mode="horizontal" :theme="theme" active-name="1">
                    <MenuItem name="1">
                    <Icon type="ios-paper" />
                    内容管理
                    </MenuItem>
                    <MenuItem name="2">
                    <Icon type="ios-people" />
                    用户管理
                    </MenuItem>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-stats" />
                            统计分析
                        </template>
                        <MenuGroup title="使用">
                            <MenuItem name="3-1">新增和启动</MenuItem>
                            <MenuItem name="3-2">活跃分析</MenuItem>
                            <MenuItem name="3-3">时段分析</MenuItem>
                        </MenuGroup>
                        <MenuGroup title="留存">
                            <MenuItem name="3-4">用户留存</MenuItem>
                            <MenuItem name="3-5">流失用户</MenuItem>
                        </MenuGroup>
                    </Submenu>
                    <MenuItem name="4">
                    <Icon type="ios-construct" />
                    综合设置
                    </MenuItem>
                </Menu>
            </div>
            <div class="bar">
                Hi.
                <Icon type="md-exit" size="60" title="退出系统" @click="exited" />
            </div>
        </div> -->
        <div class="single-page">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions, } from "vuex";
    export default {
        components: {},
        data() {
            return {
                theme: 'light'
            };
        },
        computed: {
            ...mapState("app", ['meeting']),
        },
        methods: {
            ...mapActions(
                "app", ['logout']
            ),
            exited() {
                this.logout();
                this.$router.push({ name: 'login' });
            }
        },
        mounted() {

        },
        created() {

        }
    };
</script>