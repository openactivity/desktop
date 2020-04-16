<template>
    <div id="app">
        <div class="windows-button" v-if="windowsButton" @mouseenter="mouse(false)" @mouseleave="mouse(true)">
            <i class="iconfont close">&#xe650;</i>
            <i class="iconfont min">&#xe650;</i>
            <i class="iconfont max">&#xe650;</i>
        </div>
        <div class="windows-button" v-if="!windowsButton" @mouseenter="mouse(false)" @mouseleave="mouse(true)">
            <i class="iconfont close" @click="winControl('close')">&#xe610;</i>
            <i class="iconfont min" @click="winControl('minimize')">&#xe63e;</i>
            <i class="iconfont max" @click="winControl('maximize')">&#xe641;</i>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    const electron = require('electron');
    const remote = electron.remote;
    export default {
        name: 'app',
        data () {
            return {
                windowsButton: true,
            }
        },
         methods: {
            mouse(type){
                this.windowsButton = type;
            },
            winControl(action) {
                const browserWindow = remote.getCurrentWindow()
                switch (action) {
                    case 'minimize':
                            browserWindow.minimize()
                            break;
                    case 'maximize':
                            // if (this.isMaximized) {
                        if (browserWindow.isMaximized()) {
                            browserWindow.unmaximize()
                        } 
                        else {
                            if (this.isMaximized) {
                                    browserWindow.unmaximize()
                                } else {
                                    browserWindow.maximize()
                                }
                        }
                        // this.isMaximized = browserWindow.isMaximized()
                        this.isMaximized = !this.isMaximized

                        break;
                    case 'close':
                        browserWindow.close()
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    /*引入iconfont*/
    @font-face {
        font-family: 'iconfont';  /* project id 1758046 */
        src: url('//at.alicdn.com/t/font_1758046_bp5aj2s64pn.eot');
        src: url('//at.alicdn.com/t/font_1758046_bp5aj2s64pn.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_1758046_bp5aj2s64pn.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_1758046_bp5aj2s64pn.woff') format('woff'),
        url('//at.alicdn.com/t/font_1758046_bp5aj2s64pn.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_1758046_bp5aj2s64pn.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .windows-button{
        position: absolute;
        top: 15px;
        left: 15px;
        cursor: default;
        .iconfont{
            font-size: 14px;
            margin-left: 1px;
        }
        .close{
            color: #ed4014;
        }
        .min{
            color: #ff9900;
        }
        .max{
            color: #19be6b
        }
    }
    html {
        /* 禁用html的滚动条，因为用的无框架窗口，默认就会有一个滚动条，所以去掉 */
        overflow-y: hidden;
    }

    body {
        /* 允许拖动窗口 */
        -webkit-app-region: drag;
    }

    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
        width: 2px; /*滚动条宽度*/
        /*height: 2px;  !*滚动条高度*!*/
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
        /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
        /*border-radius: 10px;  !*滚动条的背景区域的圆角*!*/
        /*background-color: red;!*滚动条的背景颜色*!*/
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 99px; /*滚动条的圆角*/
        /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
        /*background-color: green;  !*滚动条的背景颜色*!*/
    }
</style>
