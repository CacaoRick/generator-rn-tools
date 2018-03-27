const mkdirp = require("mkdirp")
const chalk = require("chalk")
const Generator = require("yeoman-generator")

module.exports = class extends Generator {
	constructor(args, options) {
		super(args, options)

		this.packageJson = this.fs.readJSON(this.destinationPath("package.json"))
		this.appJson = this.fs.readJSON(this.destinationPath("app.json"))

		if (!this.packageJson || !(this.packageJson.dependencies && this.packageJson.dependencies["react-native"])) {
			console.log(chalk.red("There is not a react-native project, please use create-react-native-app or react-native init to create one."))
			console.log(chalk.blue("https://facebook.github.io/react-native/docs/getting-started.html"))
			process.exit()
		}

		this.argument("appName", { type: String, required: false, default: this.determineAppname() })
		this.argument("routerV3", { type: Boolean, required: false, default: true })

		this.options.yarn = this.fs.exists(this.destinationPath("yarn.lock"))
		this.options.expo = this.packageJson.dependencies["expo"]
	}

	prompting() {
		const prompts = []
		if (!this.options.expo) {
			prompts.push({
				type: "input",
				name: "appName",
				message: "Project name:",
				default: this.determineAppname(),
			})
		}
		
		prompts.push({
			type: "list",
			name: "routerV3",
			message: "react-native-router-flux version:",
			choices: [
				"v3",
				"v4 (beta), based on React Navigation"
			],
			default: 0,
		})

		return this.prompt(prompts)
			.then((answers) => {
				this.options.appName = answers.appName
				this.options.routerV3 = answers.routerV3 === "v3"
			})
	}

	configuring() {
		// 複製 eslint config
		this.fs.copy(
			this.templatePath(".eslintrc"),
			this.destinationPath(".eslintrc")
		)
	}

	writing() {
		this._constructFileStruct()
		this._copyEnterPoint()
		this._writeAppJson()
	}

	install() {
		this._installDependencies()
	}

	end() {
		const pkg = this.options.yarn ? "yarn" : "npm"
		console.log("")
		console.log("Success!")
		console.log("")
		console.log(chalk.cyan("  Start packager server"))
		console.log(`    ${pkg} start`)
		if (!this.options.expo) {
			console.log(chalk.cyan("  Run on iOS"))
			console.log("    react-native run-ios")
			console.log("    - or -")
			console.log("    Open ios/nativeProject.xcodeproj in Xcode")
			console.log("    Hit the Run button")
			console.log(chalk.cyan("  Run on Android"))
			console.log("    Have an Android emulator running, or a device connected")
			console.log("    react-native run-android")
		}
	}

	_installDependencies() {
		const dependencies = [
			"immutable",
			"prop-types",
			this.options.routerV3 ? "react-native-router-flux@3" : "react-native-router-flux",
			"react-redux",
			"redux",
			"redux-immutable",
			"redux-thunk"
		]

		if (this.options.yarn) {
			this.yarnInstall(dependencies)
		} else {
			this.npmInstall(dependencies, { "save": true })
		}
	}

	_writeAppJson() {
		if (this.options.expo && this.appJson) {
			// 加入預設的 androidStatusBar 避免 status bar 蓋在 APP 內容上
			this.appJson.expo["androidStatusBar"] = {
				"barStyle": "light-content",
				"color": "#000000",
			}

			// 寫回 app.json
			this.fs.writeJSON(this.destinationPath("app.json"), this.appJson)
		}
	}

	_copyEnterPoint() {
		this.fs.copyTpl(
			this.templatePath("App.js"),
			this.destinationPath("App.js"),
			{}
		)
		if (!this.options.expo) {
			this.fs.copyTpl(
				this.templatePath("index.js"),
				this.destinationPath("index.js"),
				{
					appName: this.options.appName,
				}
			)
		}
	}

	_constructFileStruct() {
		// 複製 src 資料夾
		this.fs.copy(
			this.templatePath("src"),
			this.destinationPath("src")
		)

		// 建立空資料夾
		mkdirp("src/components")
		mkdirp("src/images")
		mkdirp("src/lib")
	}
}
