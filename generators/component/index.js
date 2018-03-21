const Generator = require("yeoman-generator")
const chalk = require("chalk")

module.exports = class extends Generator {
	constructor(args, options) {
		super(args, options)

		this.argument("componentName", { type: String, required: false })
	}

	prompting() {
		const prompts = []
		if (!this.options.componentName) {
			prompts.push({
				type: "input",
				name: "componentName",
				message: "Component name:",
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
		let componentName = this.options.componentName
		this.fs.copyTpl(
			this.templatePath("index.js"),
			this.destinationPath("src/components/" + componentName + ".js"),
			{ componentName: componentName }
		)
	}

	end() {
		let componentName = this.options.componentName
		console.log("")
		console.log(chalk.cyan("  Use in Component"))
		console.log(`\timport ${componentName} from "./${componentName}"`)
		console.log("\t...")
		console.log(`\t<${componentName} />`)
		console.log("")
		console.log(chalk.cyan("  Use in Container"))
		console.log(`\timport ${componentName} from "../../components/${componentName}"`)
		console.log("\t...")
		console.log(`\t<${componentName} />`)
	}
}
