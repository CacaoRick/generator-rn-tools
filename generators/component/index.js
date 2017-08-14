const Generator = require("yeoman-generator")

module.exports = class extends Generator {
	constructor(args, options) {
		super(args, options)

		this.argument("componentName", { type: String, required: false })
		this.argument("typescript", { type: Boolean, required: false, default: this.fs.exists(this.destinationPath("tsconfig.json")) })
	}

	prompting() {
		const prompts = []
		if (!this.options.componentName) {
			prompts.push({
				type: "input",
				name: "componentName",
				message: "What's your component name:",
			})
		}

		return this.prompt(prompts)
			.then((answers) => {
				if (answers.componentName) {
					this.options.componentName = answers.componentName
				}
			})
	}

	writing() {
		let componentName = this.options.componentName;

		if (this.options.typescript) {
			this.fs.copyTpl(
				this.templatePath("index.tsx"),
				this.destinationPath("src/components/" + componentName + ".tsx"),
				{ componentName: componentName }
			)
		} else {
			this.fs.copyTpl(
				this.templatePath("index.js"),
				this.destinationPath("src/components/" + componentName + ".js"),
				{ componentName: componentName }
			)
		}
	}
}
