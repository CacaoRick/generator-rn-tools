const mkdirp = require("mkdirp")
const chalk = require("chalk")
const Generator = require("yeoman-generator")

module.exports = class extends Generator {
	constructor(args, options) {
		super(args, options)

		this.packageJson = this.fs.readJSON(this.destinationPath("package.json"))
		if (!this.packageJson || !(this.packageJson.dependencies && this.packageJson.dependencies["react-native"])) {
			console.log(chalk.red("There is not a react-native project, please use create-react-native-app or react-native init to create one."))
			console.log(chalk.blue("https://facebook.github.io/react-native/docs/getting-started.html"))
			process.exit()
		}

		this.argument("appname", { type: String, required: false, default: this.determineAppname() })
		this.argument("yarn", { type: Boolean, required: false, default: this.fs.exists(this.destinationPath("yarn.lock")) })
		this.argument("expo", { type: Boolean, required: false, default: (this.packageJson.dependencies && this.packageJson.dependencies["expo"]) ? true : false })
		this.argument("typescript", { type: Boolean, required: false, default: false })
	}

	prompting() {
		const prompts = []
		prompts.push({
			type: "input",
			name: "appname",
			message: "Project name:",
			default: this.determineAppname(),
		})

		const YARN = "yarn, use yarn add instead npm install?"
		const EXPO = "expo, this project is create by create-react-native-app?"
		const TYPESCRIPT = "typescript, use typescript"

		prompts.push({
			type: "confirm",
			name: "typescript",
			message: "Use typescript?",
		})
		return this.prompt(prompts)
			.then((answers) => {
				this.options.appname = answers.appname
				this.options.typescript = answers.typescript
			})
	}

	configuring() {
		if (this.options.typescript) {
			// 刪除 typescript 不需要的 .flowconfig 
			this.fs.delete(this.destinationPath(".flowconfig"))

			// 加入 tsc clean build watch scripts 到 packaga.json
			this.packageJson.scripts.tsc = "tsc --pretty"
			this.packageJson.scripts.clean = "rimraf build"
			this.packageJson.scripts.build = "npm run clean && yarn run tsc --"
			this.packageJson.scripts.watch = "npm run build -- -w"
			this.fs.writeJSON(this.destinationPath("package.json"), this.packageJson)

			// 複製 tsconfig.json
			this.fs.copy(
				this.templatePath("tsconfig.json"),
				this.destinationPath("tsconfig.json")
			)

			// 複製 tslint.json
			this.fs.copy(
				this.templatePath("tslint.json"),
				this.destinationPath("tslint.json")
			)
		} else {
			// 複製 eslint config
			this.fs.copy(
				this.templatePath(".eslintrc"),
				this.destinationPath(".eslintrc")
			)
		}
	}

	writing() {
		if (this.options.typescript) {
			this._constructTypescriptFileStruct()
		} else {
			this._constructFileStruct()
		}
		this._copyEnterPoint()
	}

	install() {
		if (this.options.typescript) {
			this._installTypescriptDependencies()
		} else {
			this._installDependencies()
		}
	}

	end() {
		const pkg = this.options.yarn ? "yarn" : "npm"
		console.log("")
		console.log("Success!")
		console.log("")
		if (this.options.typescript) {
			console.log(chalk.cyan(`  ${pkg} run build`))
			console.log("    Clean build folder and Build your project.")
			console.log("")
			console.log(chalk.cyan(`  ${pkg} run watch`))
			console.log("    Watch your project, if file change rebuild.")
			console.log("")
		}
		console.log(chalk.cyan(`  ${pkg} start`))
		console.log("    Start dev server.")
	}

	_installDependencies() {
		const dependencies = [
			"immutable",
			"prop-types",
			"react-native-router-flux",
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

	_installTypescriptDependencies() {
		const dependencies = [
			"immutable",
			"react-native-router-flux",
			"react-redux",
			"redux",
			"redux-immutable",
			"redux-saga",
			"typescript-fsa"
		]
		const devDependencies = [
			"@types/immutable",
			"@types/react",
			"@types/react-native",
			"@types/react-redux",
			"@types/redux-saga",
			"@types/redux",
			"@types/redux-immutable",
			"rimraf",
			"tslint",
			"tslint-react",
			"typescript",
		]

		if (this.options.yarn) {
			this.yarnInstall(dependencies)
			this.yarnInstall(devDependencies, { "dev": true })
		} else {
			this.npmInstall(dependencies, { "save": true })
			this.npmInstall(devDependencies, { "save-dev": true })
		}
	}

	_copyEnterPoint() {
		if (this.options.expo) {
			this.fs.copyTpl(
				this.templatePath("App.js"),
				this.destinationPath("App.js"),
				{ path: this.options.typescript ? "build" : "src" }
			)
		} else {
			this.fs.copyTpl(
				this.templatePath("index.android.js"),
				this.destinationPath("index.android.js"),
				{
					appname: this.options.appname,
					path: this.options.typescript ? "build" : "src",
				}
			)
			this.fs.copyTpl(
				this.templatePath("index.ios.js"),
				this.destinationPath("index.ios.js"),
				{
					appname: this.options.appname,
					path: this.options.typescript ? "build" : "src",
				}
			)
		}
	}

	_constructFileStruct() {
		// 複製 src 資料夾
		this.fs.copy(
			this.templatePath("babel/src"),
			this.destinationPath("src")
		)

		// 建立空資料夾
		mkdirp("src/components")
		mkdirp("src/images")
		mkdirp("src/lib")
	}

	_constructTypescriptFileStruct() {
		// 複製 src 資料夾
		this.fs.copy(
			this.templatePath("typescript/src"),
			this.destinationPath("src")
		)

		// 建立空資料夾
		mkdirp("images")
		mkdirp("src/components")
	}
}
