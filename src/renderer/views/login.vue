<template>
  <div>
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
      <div class="login-form">
          <Card>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                签到登录
            </p>
            <Form ref="formInline" :model="formLogin" :rules="ruleInline">
                <FormItem prop="name">
                    <Input type="text" v-model="formLogin.name" placeholder="姓名" size="large">
                    </Input>
                </FormItem>
                <FormItem prop="mobile">
                    <Input type="text" v-model="formLogin.mobile" placeholder="手机号" size="large">
                    </Input>
                </FormItem>
                <FormItem prop="code">
                    <Input type="password" v-model="formLogin.code" placeholder="授权码" size="large">
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" long @click="handleSubmit('formInline')" size="large">登录</Button>
                </FormItem>
            </Form>
          </Card>
      </div>
  </div>

</template>

<script>
  const electron = require('electron');
  const remote = electron.remote;

  import { mapState, mapActions } from "vuex";
  export default {
    name: 'login-page',
    components: {
    },
    data () {
            return {
                windowsButton: true,
                formLogin: {
                    name: '陈聪',
                    mobile: '13281896013',
                    code: '2HlL'
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入授权码', trigger: 'blur' },
                    ]
                },
                login_loading: false,
                isMaximized: false
            }
    },
    computed: {
	},
    methods: {
        ...mapActions(
            "app", ['meeting']
        ),
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
        },
        handleSubmit(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$store.dispatchPromise('app/login', this.formLogin).then((rsp) =>{
                        this.$router.push({name: "dashboard"})
                    }).catch((e)=>{
                        console.log(e);
                        this.$Message.error(e.response.data);
                    })
                }
            })
        }
    }
  }
</script>

<style lang="less">
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
  .login-form{
      height: 400px;
      width: 400px;
      margin: 0 auto;
      position: relative;
      transform: translateY(40%);
  }
</style>
