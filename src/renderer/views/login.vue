<template>
	<div class="login">
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
		<div class="carousel">
			<Carousel
				:autoplay="setting.autoplay"
				:autoplay-speed="setting.autoplaySpeed"
				:dots="setting.dots"
				:radius-dot="setting.radiusDot"
				:trigger="setting.trigger"
				:arrow="setting.arrow"
			>
				<CarouselItem>
					<div class="demo-carousel">
						<div class="title">
							<p>全新的活动形式</p>
						</div>
						<div class="description">
							<p>整合活动报名、快捷签到、人脸识别、考勤统计等功能</p>
							<p>人脸识别、考勤统计等功能，打造高效活动方式</p>
						</div>
					</div>
				</CarouselItem>
				<CarouselItem>
					<div class="demo-carousel">
						<div class="title">
							<p>快捷可靠安全</p>
						</div>
						<div class="description">
							<p>整合活动报名、快捷签到、</p>
							<p>人脸识别、考勤统计等功能，打造高效活动方式</p>
						</div>
					</div>
				</CarouselItem>
			</Carousel>
		</div>

		<div class="login-form">
			<div class="card">
				<div class="title">
					<p>登录OpenActivity</p>
				</div>
				<div class="description">
					<p>
						登录即代表你已阅读并同意
						<a>服务协议</a>和
						<a>隐私政策</a>
					</p>
				</div>
				<Form class="form" ref="formInline" :model="formLogin" :rules="ruleInline">
					<FormItem prop="name">
						<Input type="text" v-model="formLogin.name" placeholder="姓名" size="large"></Input>
					</FormItem>
					<FormItem prop="mobile">
						<Input type="text" v-model="formLogin.mobile" placeholder="手机号" size="large"></Input>
					</FormItem>
					<FormItem prop="code">
						<Input type="password" v-model="formLogin.code" placeholder="授权码" size="large"></Input>
					</FormItem>
					<FormItem>
						<Button type="primary" long @click="handleSubmit('formInline')" size="large">登录</Button>
					</FormItem>
				</Form>
			</div>
		</div>
	</div>
</template>

<script>
const electron = require('electron');
const remote = electron.remote;

import { mapState, mapActions } from "vuex";
export default {
	name: "login-page",
	components: {},
	data() {
		return {
			windowsButton: true,
			setting: {
				autoplay: true,
				autoplaySpeed: 4000,
				dots: "inside",
				radiusDot: true,
				trigger: "click",
				arrow: "never"
			},
			formLogin: {
				name: "陈聪",
				mobile: "13281896013",
				code: "2HlL"
			},
			ruleInline: {
				name: [
					{ required: true, message: "请输入姓名", trigger: "blur" }
				],
				mobile: [
					{ required: true, message: "请输入手机号", trigger: "blur" }
				],
				code: [
					{ required: true, message: "请输入授权码", trigger: "blur" }
				]
			},
			login_loading: false,
			isMaximized: false
		};
	},
	computed: {},
	methods: {
		...mapActions("app", ["meeting"]),
		handleSubmit(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					this.$http
						.login(this.formLogin)
						.then(rsp => {
							this.$router.push({ name: "checkin" });
						})
						.catch(e => {
							console.log(e);
							this.$Message.error(e.response.data);
						});
				}
			});
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
	}
};
</script>

<style lang="less">
.login {
	.carousel {
		position: absolute;
		width: 500px;
		height: 300px;
		top: 33%;
		left: 6%;
	}
	.login-form {
		height: 550px;
		width: 365px;
		top: 10%;
		right: 15%;
		position: absolute;
		.card {
			height: 100%;
			border: 1px solid #dcdee2;
			border-radius: 5px;
			padding: 0 25px;
			.title {
				padding-top: 45px;
				font-size: 20px;
				font-weight: 800;
				color: #31343a;
			}
			.description {
				margin-top: 5px;
				font-size: 12px;
			}
			.form {
				margin-top: 55px;
			}
		}
	}
	.demo-carousel {
		height: 300px;
		text-align: center;
		font-size: 20px;
		.title {
			font-size: 26px;
			font-weight: 800;
			color: #31343a;
		}
		.description {
			margin-top: 20px;
			font-size: 15px;
		}
	}
	.windows-button {
		position: absolute;
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
}
</style>
