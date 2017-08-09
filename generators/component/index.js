const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options)

    this.argument("componentName", { type: String, required: true })
  }

  writing() {
    let componentName = this.options.componentName;
    this.fs.copyTpl(
      this.templatePath("index.js"),
      this.destinationPath("components/" + componentName + ".js"),
      { componentName: componentName }
    )
  }
}