<style lang="less">
    .main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        .nav {
            width: 60px;
            .ivu-menu{
                height: 1000px;
                padding-top: 60px;
            }
            .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
                padding: 12px 14px;
            }
            .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu){
                color: whitesmoke;
            }
            .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover{
                background: #2d8cf0;
            }
            .label{
            }
            .footer-button{
                position: absolute;
                z-index:99999;
                bottom: 12px;
                left: 13px;
            }
        }
        .windows-button {
            position: absolute;
            z-index:99999;
            top: 12px;
            left: 6px;
            cursor: default;
            .iconfont {
                font-size: 13px;
                margin-left: 1px;
            }
            .close {
                color: #ed4014;
            }
            .min {
                color: #ff9900;
            }
            .max {
                color: #19be6b;
            }
        }
        
        .single-page {
            width: 1140px;
        }
    }
</style>

<template>
    <div class="main">
        <div
			class="windows-button"
			v-if="windowsButton"
			@mouseenter="mouse(false)"
			@mouseleave="mouse(true)"
		>
			<i class="iconfont close">&#xe650;</i>
			<i class="iconfont min">&#xe650;</i>
			<i class="iconfont max">&#xe650;</i>
		</div>
		<div
			class="windows-button"
			v-if="!windowsButton"
			@mouseenter="mouse(false)"
			@mouseleave="mouse(true)"
		>
			<i class="iconfont close" @click="winControl('close')">&#xe610;</i>
			<i class="iconfont min" @click="winControl('minimize')">&#xe63e;</i>
			<i class="iconfont max" @click="winControl('maximize')">&#xe641;</i>
		</div>
        <div class="nav">
            <Menu theme="dark" active-name="1" width="80" mode="vertical">
                <MenuItem name="1" to="/checkin/index">
                    <Tooltip content="签到" placement="right">
                        <Icon type="md-checkmark-circle" size="28"/>
                        <span class="label">签到</span>
                    </Tooltip>
                </MenuItem>
                <MenuItem name="2" to="/workspace/index">
                    <Tooltip content="工作台" placement="right">
                        <Icon type="md-apps" size="28" />
                        <span class="label">工作</span>
                    </Tooltip>
                </MenuItem>
            </Menu>
            <Button title="退出系统" class="footer-button" icon="md-exit" type="primary" shape="circle" @click="exited"></Button>
        </div>
        <div class="single-page">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    const electron = require('electron');
    const remote = electron.remote;

    import {  mapActions } from "vuex";
    export default {
        components: {},
        data() {
            return {
                windowsButton: true
            };
        },
        computed: {
        },
        methods: {
            ...mapActions(
                "meeting", ['logout']
            ),
            exited() {
                this.logout();
                this.$router.push({ name: 'login' });
            },
            mouse(type) {
                this.windowsButton = type;
            },
            winControl(action) {
                const browserWindow = remote.getCurrentWindow();
                switch (action) {
                    case "minimize":
                        browserWindow.minimize();
                        break;
                    case "maximize":
                        // if (this.isMaximized) {
                        if (browserWindow.isMaximized()) {
                            browserWindow.unmaximize();
                        } else {
                            if (this.isMaximized) {
                                browserWindow.unmaximize();
                            } else {
                                browserWindow.maximize();
                            }
                        }
                        // this.isMaximized = browserWindow.isMaximized()
                        this.isMaximized = !this.isMaximized;

                        break;
                    case "close":
                        browserWindow.close();
                        break;
                    default:
                        break;
                }
            }
        },
        mounted() {

        },
        created() {

        }
    };
</script>