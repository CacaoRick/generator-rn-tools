const Generator = require("yeoman-generator")

module.exports = class extends Generator {
	constructor(args, options) {
		super(args, options)

		this.argument("containerName", { type: String, required: false })
		this.argument("typescript", { type: Boolean, required: false, default: this.fs.exists(this.destinationPath("tsconfig.json")) })
	}

	prompting() {
		const prompts = []
		if (!this.options.componentName) {
			prompts.push({
				type: "input",
				name: "containerName",
				message: "What's your component name:",
			})
		}

		return this.prompt(prompts)
			.then((answers) => {
				if (answers.containerName) {
					this.options.containerName = answers.containerName
				}
			})
	}

	writing() {
		let containerName = this.options.containerName;

		if (this.options.typescript) {
			this.fs.copyTpl(
				this.templatePath("index.tsx"),
				this.destinationPath("src/containers/" + containerName + "/index.tsx"),
				{ containerName: containerName }
			)
		} else {
			this.fs.copyTpl(
				this.templatePath("index.js"),
				this.destinationPath("src/containers/" + containerName + "/index.js"),
				{ containerName: containerName }
			)
		}
	}
}
