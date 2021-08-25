const ProjectCreator = artifacts.require("ProjectCreator");

module.exports = async function (deployer) {
	await deployer.deploy(ProjectCreator);
};
