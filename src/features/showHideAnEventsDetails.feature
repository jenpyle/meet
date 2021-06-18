Feature: Show/Hide an event's details

Scenario: An event element is collapsed by default
Given the list of events has been loaded
When the event page is showing and the “Show details” button is not yet selected on an event
Then the event will remain collapsed 

Scenario: User can expand an event to see its details
Given the list of events has been loaded
When user clicks on “Show details” button for an event
Then the event element will be expanded to show the event details

Scenario: User can collapse an event to hide its details
Given the detailed view of an event has been loaded
When user clicks on “Hide details” button for an event
Then the event element will be collapsed to hide the event details
