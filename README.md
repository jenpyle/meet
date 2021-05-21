# meet
Serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming event
## App features, User stories, and Scenarios
### __FEATURE 1: FILTER EVENTS BY CITY__
As a user,\
I should be able to filter events by city\
So that I can see the list of events that take place in that city

__SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.__\
__Given__ user hasn’t searched for any city\
__When__ the user opens the app\
__Then__ the user should see a list of all upcoming events\
__SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.__\
__Given__ the main page is open\
__When__ user starts typing in the city textbox\
__Then__ the user should see a list of cities (suggestions) that match what they’ve typed\
__SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.__\
__Given__ the user was typing “Berlin” in the city textbox. And the list of suggested cities is showing\
__When__ the user selects a city (e.g., “Berlin, Germany”) from the list\
__Then__ their city should be changed to that city (i.e., “Berlin, Germany”). And the user should receive a list of upcoming events in that city

### __FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS__
As a user,\
I should be able to show or hide an event’s details\
So that I can easily browse through events and choose when to view more detailed information\

__Scenario 1: An event element is collapsed by default__\
__Given__ the list of events has been loaded\
__When__ the event page is showing and the “Show details” button is not yet selected on an event\
__Then__ the event will remain collapsed \
__Scenario 2: User can expand an event to see its details__\
__Given__ the list of events has been loaded\
__When__ user clicks on “Show details” button for an event\
__Then__ the event element will be expanded to show the event details\
__Scenario 3: User can collapse an event to hide its details__\
__Given__ the detailed view of an event has been loaded\
__When__ user clicks on “Hide details” button for an event\
__Then__ the event element will be collapsed to hide the event details

### __FEATURE 3: SPECIFY NUMBER OF EVENTS__
As a user,\
I should be able to specify the number of events\
So that I can choose how many events I want to browse through\

__Scenario 1: When user hasn’t specified a number, 32 is the default number__\
__Given__ the main view has been loaded\
__When__ the number of events is not specified\
__Then__ a maximum of 32 events will appear \
__Scenario 2: User can change the number of events they want to see__\
__Given__ the main view has been loaded\
__When__ the number of events is set to a specific range\
__Then__ a maximum of the specified number of events will appear

### __FEATURE 4: USE THE APP WHEN OFFLINE__
As a user,\
I should be able to use the app when offline\
So that I can use the app even when internet is not available\

__Scenario 1: Show cached data when there’s no internet connection__\
__Given__ the main view of a city has previously been loaded\
__When__ the user is accessing a previously viewed city and does not have internet access\
__Then__ the cached data of the previously viewed city will be loaded\
__Scenario 2: Show error when user changes the settings (city, time range)__\
__Given__ the user did not have internet access\
__When__ the user attempts to change the settings\
__Then__ an error message will appear\

### __FEATURE 5: DATA VISUALIZATION__
As a user,\
I should be able to visualize the available event data\
So that I can easily compare how eventful each city is\
__Scenario 1: Show a chart with the number of upcoming events in each city__\
__Given__ the user has opened the main view\
__When__ the user has clicked on the event chart button\
__Then__ a graphic with a chart that shows the number of upcoming events in each city will appear\
