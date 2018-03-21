const Generator = require("yeoman-generator")
const chalk = require("chalk")

module.exports = class extends Generator {
	constructor(args, options) {
		super(args, options)

		this.argument("containerName", { type: String, required: false })
	}

	prompting() {
		const prompts = []
		if (!this.options.containerName) {
			prompts.push({
				type: "input",
				name: "containerName",
				message: "Component name:",
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

		this.fs.copyTpl(
			this.templatePath("index.js"),
			this.destinationPath("src/containers/" + containerName + "/index.js"),
			{ containerName: containerName }
		)
	}

	end() {
		console.log("")
		console.log(chalk.cyan("  TODO: Add Scene to src/containers/AppRouter/index.js"))
		console.log(`\timport ${this.options.containerName} from "../${this.options.containerName}"`)
		console.log("\t...")
		console.log(`\t<Scene key="${this.options.containerName}" component={${this.options.containerName}} />`)
	}
}
