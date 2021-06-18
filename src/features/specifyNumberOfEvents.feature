Feature: Specify number if events

Scenario: When user hasn’t specified a number, 32 is the default number
Given the main view has been loaded
When the number of events is not specified
Then a maximum of 32 events will appear 

Scenario: User can change the number of events they want to see
Given the main view has been loaded
When the number of events is set to a specific range
Then a maximum of the specified number of events will appear
