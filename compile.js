const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// libraries folder
const SafeMathSourceCode = fs.readFileSync(
	"./contracts/libraries/SafeMath.sol"
);

// core folder
const ProjectSourceCode = fs.readFileSync("./contracts/Project.sol");
const ProjectCreatorSourceCode = fs.readFileSync(
	"./contracts/ProjectCreator.sol"
);

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

function compileContract(Contract) {
	const contractPath = path.resolve(__dirname, ...Contract);

	const contractSourceCode = fs.readFileSync(contractPath, "utf8");

	fs.ensureDirSync(buildPath);

	var input = {
		language: "Solidity",
		sources: {
			Contract: {
				content: contractSourceCode,
			},
		},
		settings: {
			optimizer: {
				enabled: true,
			},
			outputSelection: {
				"*": {
					"*": ["*"],
				},
			},
		},
	};

	function findImports(path) {
		if (path === "libraries/SafeMath.sol")
			return { contents: `${SafeMathSourceCode}` };
		if (path === "Project.sol") return { contents: `${ProjectSourceCode}` };
		else return { error: "File not found" };
	}

	let output = JSON.parse(
		solc.compile(JSON.stringify(input), { import: findImports })
	);

	for (let contractName in output.contracts.Contract) {
		fs.outputJsonSync(
			path.resolve(buildPath, `${contractName}.json`),
			output.contracts.Contract[contractName]
		);
	}
}

compileContract(["./", "contracts", "Project.sol"]);
compileContract(["./", "contracts", "ProjectCreator.sol"]);
compileContract(["./", "contracts", "libraries", "SafeMath.sol"]);
