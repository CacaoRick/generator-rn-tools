const mkdirp = require("mkdirp");
const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options)

    this.argument("appname", { type: String, required: false })
    this.argument("expo", { type: Boolean, required: false, default: false })
    this.argument("typescript", { type: Boolean, required: false, default: false })
  }

  prompting() {
    const EXPO = "Expo (create-react-native-app)"
    const STANDARD = "Standard (react-native-cli)"

    const prompts = []
    if (!this.options.appname) {
      prompts.push({
        type: "input",
        name: "appname",
        message: "Project name",
      })
    }

    prompts.push({
      type: "checkbox",
      name: "options",
      message: "Select options for your project",
      choices: ["expo", "typescript"],
    })
    return this.prompt(prompts)
      .then((answers) => {
        this.options.appname = answers.appname
        answers.options.forEach((option) => {
          if (option === "expo") {
            this.options.expo = true
          }
          if (option === "typescript") {
            this.options.typescript = true
          }
        });
        console.log(this.options)
      })
  }

  configuring() {
    this.config.set(typescript, this.options.typescript)
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
  }

  _installDependencies() {
    this.yarnInstall([
      "immutable",
      "prop-types",
      "react-native-router-flux",
      "react-redux",
      "redux",
      "redux-immutable",
      "redux-thunk"
    ])
  }

  _installTypescriptDependencies() {

  }

  _constructFileStruct() {
    // 複製 enterpoint
    if (this.options.expo) {
      this.fs.copy(
        this.templatePath("babel/App.js"),
        this.destinationPath("App.js")
      )
    } else {
      this.fs.copy(
        this.templatePath("babel/index.android.js"),
        this.destinationPath("index.android.js"),
        { appname: this.options.appname }
      )
      this.fs.copy(
        this.templatePath("babel/index.ios.js"),
        this.destinationPath("index.ios.js"),
        { appname: this.options.appname }
      )
    }

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
    if (this.options.expo) {
      this.fs.copy(
        this.templatePath("typescript/App.js"),
        this.destinationPath("App.js")
      )
    } else {
      this.fs.copy(
        this.templatePath("typescript/index.android.js"),
        this.destinationPath("index.android.js"),
        { appname: this.options.appname }
      )
      this.fs.copy(
        this.templatePath("typescript/index.ios.js"),
        this.destinationPath("index.ios.js"),
        { appname: this.options.appname }
      )
    }

    // 複製 src 資料夾
    this.fs.copy(
      this.templatePath("typescript/src"),
      this.destinationPath("src")
    )
  }
}
