// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 < 0.9.0;

import "./Project.sol";

contract ProjectCreator {
    
    event ProjectCreated(address _from, uint _projectIndex);
    
    Project [] public deployedProjects;
    uint projectsCount = 0;
    
    function deployProject(
        string memory _projectTitle, 
        string memory _projectDesc, 
        uint256 _minContributionAmount, 
        string memory _imgUrl, 
        string memory _folderUrl,
        bool _isMap,
        string memory _postalAddress,
        string memory _latitude,
        string memory _longitude,
        string memory _placeName    
    ) public {
        
        Project newProject = new Project(
            _projectTitle, 
            _projectDesc, 
            _minContributionAmount, 
            _imgUrl, 
            _folderUrl, 
            _isMap, 
            _postalAddress, 
            _latitude,
            _longitude,
            _placeName,
            msg.sender
        );
        
        deployedProjects.push(newProject);
        projectsCount++;
        
        emit ProjectCreated(msg.sender, projectsCount-1);
    }
    
    function getDeployedProjects()public view returns(Project[] memory){
        return deployedProjects;
    }
}