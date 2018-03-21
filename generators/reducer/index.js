const Generator = require("yeoman-generator")
const chalk = require("chalk")
const fs = require("fs")

module.exports = class extends Generator {
	constructor(args, options) {
		super(args, options)

		this.argument("reducerName", { type: String, required: false })
	}

	prompting() {
		const prompts = []
		if (!this.options.reducerName) {
			prompts.push({
				type: "input",
				name: "reducerName",
				message: "Reducer name:",
			})
		}

		return this.prompt(prompts)
			.then((answers) => {
				if (answers.reducerName) {
					this.options.reducerName = answers.reducerName
				}
			})
	}

	writing() {
		let reducerName = this.options.reducerName;

		this.fs.copyTpl(
			this.templatePath("actions.js"),
			this.destinationPath(`src/redux/${reducerName}/actions.js`),
			{}
		)
		this.fs.copyTpl(
			this.templatePath("reducer.js"),
			this.destinationPath(`src/redux/${reducerName}/reducer.js`),
			{}
		)

		fs.appendFileSync(`src/redux/actions.js`, `export * from "./${this.options.reducerName}/actions"\n`)
	}

	end() {
		console.log("")
		console.log(chalk.cyan(`  TODO: Add ${this.options.reducerName} reducer to src/redux/reducers.js`))
		console.log(`\timport ${this.options.reducerName} from "./${this.options.reducerName}/reducer"`)
	}
}
