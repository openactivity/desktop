<template>
    <div class="dashboard">
        <CameraPreview v-if="cameraPreviewVisible" name="cameraPreview" ref="cameraPreview"
            @refreshCameraPhoto="refreshCameraPhoto"></CameraPreview>
        <Card class="sign-form">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                签到
            </p>
            <Form ref="formInline" :model="formItem" :rules="ruleInline">
                <FormItem>
                    <Select v-model="selectedPrinter" placeholder="请选择打印机" size="large">
                        <Option v-for="item in printers" :value="item.name" :key="item.name">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="" prop="name">
                    <Input v-model="formItem.name" clearable size="large" placeholder="请输入需签到人员姓名"></Input>
                </FormItem>
                <FormItem label="" prop="idcard">
                    <Input v-model="formItem.idcard" clearable size="large" placeholder="请输入需签到人员 身份证/手机号"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" long @click="checkin('formInline')">开始签到</Button>
                    <Button size="large" long @click="cameraPreviewOpen()">拍照</Button>
                </FormItem>
            </Form>
        </Card>
        <Modal v-model="preview" title="打印预览">
            <webview ref="printWebview" src="../../../static/print.html" nodeintegration></webview>
        </Modal>
    </div>
</template>

<script>
    import { ipcRenderer } from 'electron'
    import { mapState, mapMutations, mapActions } from "vuex";
    import CameraPreview from "./camera-preview.vue"

    export default {
        name: "dashboard-page",
        components: {
            CameraPreview
        },
        data() {
            return {
                formItem: {
                    name: "陈聪",
                    idcard: "13281896013"
                },
                preview: false,
                printers: [],
                selectedPrinter: "",
                ruleInline: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    idcard: [
                        { required: true, message: '请输入身份证/手机号', trigger: 'blur' },
                    ]
                },
                cameraPreviewVisible: false,
                picValueZero: ''
            };
        },
        computed: {
            ...mapState("app", ['meeting']),
        },
        methods: {
            checkin(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.formItem["token"] = this.meeting.token;
                        this.formItem["face"] = 0;
                        this.formItem["input"] = "manual";
                        this.formItem["pivot"] = "";
                        this.$store.dispatchPromise('checkin/checkin', this.formItem).then((rsp) => {
                            if (rsp.data.existed) {
                                this.$Message.error("该学员已重复签到");
                            } else {
                                this.$Message.info("签到成功");
                            }
                            this.print(rsp.data);
                        }).catch((e) => {
                            this.$Message.error(e.response.data.status + " " + e.response.data.msg);
                        })
                    }
                })
            },
            print(data){
                this.preview = true;
                const webview = this.$refs.printWebview;
                webview.send('webview-print-render', data)
                this.preview = false;
            },
            priters() {
                ipcRenderer.send('getPrinterList')
            },
            shutting() {

            },
            cameraPreviewOpen(cameraType) {
                this.cameraPreviewVisible = true
                this.$nextTick(() => {
                    this.$refs.cameraPreview.init()
                });
            },
            refreshCameraPhoto(cameraPhoto) {
                // let httpZp;
                // this.$http.post('/uploadImage', {
                //     params: {
                //         imageFile: cameraPhoto
                //     }
                // }).then(({ data: res }) => {
                //     if (res.code !== 0) {
                //         return this.$message.error(res.msg)
                //     }
                //     httpZp = res.data.src;
                //     this.picValueZero = cameraPhoto;
                // }).catch(() => { })
                this.picValueZero = cameraPhoto;
            }
        },
        created() {
            ipcRenderer.send('getPrinterList')
            ipcRenderer.once('getPrinterList', (event, data) => {
                this.printers = data;
                for (var index in data) {
                    if (data[index]["isDefault"]) {
                        this.selectedPrinter = data[index]["name"]
                    }
                }
            })
        },
        mounted() {
            //当vue节点渲染完成后，获取<webview>节点
            const webview = this.$refs.printWebview;

            //监听<webview>里面的消息，也就是监听print.html里面的ipcRenderer.sendToHost发送的事件，当该事件发送成功后就会进入下面的回调事件中执行打印操作。
            webview.addEventListener('ipc-message', (event) => {
                if (event.channel === 'webview-print-do') {
                    //如果收到<webview>传过来的事件，名为"webview-print-do"，就执行 webview.print打印方法，打印<webview>里面的内容。
                    webview.print(
                        {
                            //是否是静默打印
                            silent: true,
                            printBackground: true,
                            //打印机的名称，就是本文一开始获得的打印机列表其中一个
                            deviceName: this.selectedPrinter,
                        },
                        (data) => {
                            //这个回调是打印后的回调事件，data为true就是打印成功，为false就打印失败
                            console.log('webview success', data);
                        },
                    );
                }
            });
        }
    };
</script>
<style lang="less">
    html,
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #f8f8f9;
    }

    .dashboard {
        .sign-form {
            width: 40%;
            position: absolute;
            top: 20%;
            left: 30%;
        }
    }
</style>