const Project = artifacts.require("Project");
const ProjectCreator = artifacts.require("ProjectCreator");

contract(ProjectCreator, async (accounts) => {
	let project;
	let projectCreator;

	beforeEach(async () => {
		projectCreator = await ProjectCreator.new();

		await projectCreator.deployProject(
			"Test Title",
			"Test Description",
			500,
			"Test ImageUrl",
			"Test FolderUrl",
			true,
			"Test PostalAddress",
			"Test Latitude",
			"Test Longitude",
			"Test PlaceName",
			{ from: accounts[0] }
		);

		const addressList = await projectCreator.getDeployedProjects();
		const projectAddress = addressList[0];

		project = await Project.at(projectAddress);
	});

	describe("Project", () => {
		it("Deployed Successfully", () => {
			assert.ok(projectCreator.address);
			assert.ok(project.address);
		});
	});
});
