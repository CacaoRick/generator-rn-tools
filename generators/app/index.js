const mkdirp = require("mkdirp");
const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  prompting() {
    const EXPO = "Expo (create-react-native-app)"
    const STANDARD = "Standard (react-native-cli)"
    return this.prompt([{
      type: "list",
      name: "projectType",
      message: "React Native project type",
      choices: [EXPO, STANDARD],
    }]).then((answers) => {
      // 根據專案類型複製 entryPoint
      if (answers.projectType === EXPO) {
        this.fs.copy(
          this.templatePath("App.js"),
          this.destinationPath("App.js")
        )
      } else {
        this.fs.copy(
          this.templatePath("index.android.js"),
          this.destinationPath("index.android.js")
        )
        this.fs.copy(
          this.templatePath("index.ios.js"),
          this.destinationPath("index.ios.js")
        )
      }
    })
  }

  installDependencies() {
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

  constructFileStruct() {
    // 複製 src 資料夾
    this.fs.copy(
      this.templatePath("src"),
      this.destinationPath("src")
    )

    // 複製 eslint confit
    this.fs.copy(
      this.templatePath(".eslintrc"),
      this.destinationPath(".eslintrc")
    )

    // 建立空資料夾
    mkdirp("src/components")
    mkdirp("src/images")
    mkdirp("src/lib")
    mkdirp("src/models")
  }
}