const mkdirp = require("mkdirp");
const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options)

    this.argument("appname", { type: String, required: false, default: this.determineAppname() })
    this.argument("yarn", { type: Boolean, required: false, default: false })
    this.argument("expo", { type: Boolean, required: false, default: false })
    this.argument("typescript", { type: Boolean, required: false, default: false })
  }

  prompting() {
    const prompts = []
    prompts.push({
      type: "input",
      name: "appname",
      message: "Project name",
      default: this.determineAppname(),
    })

    const YARN = "yarn, use yarn add instead npm install?"
    const EXPO = "expo, this project is create by create-react-native-app?"
    const TYPESCRIPT = "typescript, use typescript"

    prompts.push({
      type: "checkbox",
      name: "options",
      message: "Select options for your project",
      choices: [ YARN, EXPO, TYPESCRIPT ],
    })
    return this.prompt(prompts)
      .then((answers) => {
        this.options.appname = answers.appname
        answers.options.forEach((option) => {
          if (option === YARN) {
            this.options.yarn = true
          }
          if (option === EXPO) {
            this.options.expo = true
          }
          if (option === TYPESCRIPT) {
            this.options.typescript = true
          }
        });
      })
  }

  configuring() {
    this.config.set("typescript", this.options.typescript)
    this.config.save()
  }

  writing() {
    if (this.options.typescript) {
      this._installDependencies()
      this._constructFileStruct()
    } else {
      this._installTypescriptDependencies()
      this._constructTypescriptFileStruct()
    }
    this._copyEnterPoint()
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
      this.npmInstall(dependencies, {"save": true})
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
      this.npmInstall(dependencies, {"save": true})
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

    // 複製 eslint confit
    this.fs.copy(
      this.templatePath("babel/.eslintrc"),
      this.destinationPath(".eslintrc")
    )

    // 建立空資料夾
    mkdirp("src/components")
    mkdirp("src/images")
    mkdirp("src/lib")
    mkdirp("src/models")
  }

  _constructTypescriptFileStruct() {
    // 複製 src 資料夾
    this.fs.copy(
      this.templatePath("typescript/src"),
      this.destinationPath("src")
    )
  }
}
