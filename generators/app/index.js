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
    this._copyEnterPoint()
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

  _copyEnterPoint() {
    if (this.options.expo) {
      this.fs.copy(
        this.templatePath("App.js"),
        this.destinationPath("App.js"),
        { path: this.options.typescript ? "build" : "src" }
      )
    } else {
      this.fs.copy(
        this.templatePath("index.android.js"),
        this.destinationPath("index.android.js"),
        {
          appname: this.options.appname,
          path: this.options.typescript ? "build" : "src",
        }
      )
      this.fs.copy(
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
