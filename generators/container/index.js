const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options)

    this.argument("containerName", { type: String, required: true })
  }

  writing() {
    let containerName = this.options.containerName;
    this.fs.copyTpl(
      this.templatePath("index.js"),
      this.destinationPath("containers/" + containerName + "/index.js"),
      { containerName: containerName }
    )
  }
}