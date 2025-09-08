# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-09-08
### Breaking Changes
- **JIRA API v3 support**  
  - Adapted to the new JIRA API v3.  
  - Requires a new environment variable: `JIRA_USERNAME` (see: [.env.example](./.env.example)).
### Added
- **Worklog summary feature**  
  - At the end of script execution, the total worklog time of all affected issues is summarized and displayed.
- **Improved error handling**  
  - Added more robust error catching and logging to make failures easier to debug.

## [0.0.1] - 2022-06-12
### Initial Release
- Basic integration with JIRA API.  
- Update worklogs for given issues. 