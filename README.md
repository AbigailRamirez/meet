# meet

## Overview
MeetApp is a serverless, progressive web application built with React using a test-driven development technique. The application uses the Google Calendar API to fetch upcoming events.

## Key Features Include:
- Filtering events by city
- Show/hide event details
- Specify number of events
- Use the app when offline
- Add an app shortcut tot he home screen
-  View a chart showing number of events in a specified city

## Feature 1: Filter Events by City
### User Story:
As a user I should be able to "filter events by city" so that I can see a list of events that take place in a chosen city.

### Scenario 1: When user hasn't searched for a city, show upcoming events from all cities.
**Given** User hasn't searched for any city
**When** the user opens the app
**Then** the user should see a list of all upcoming events

### Scenario 2: User should see a list of suggestions when they search for a city.
**Given** the main page is open
**When** the user starts typing in the city textbox
**Then** the user should see a list of cities (suggestions) that match what they've typed

### Scenario 3: User can select a city from the suggested list
**Given** the user was typing "Montreal" in the city textbox And the list of suggested cities is showing
**When** the user sselects a city (e.g., "Montreal, Canada") from the list
**Then** their city should be changed to that city (i.e., "Montreal, Canada) And the user should receive a list of upcoming events in that city

## Feature 2: Show/Hide an Event's Details
### User Story:
As a user I should be able to show and hide event details so that I can view more details of an event I'm interested in.

### Scenario 1: An event element is collapsed by default
**Given** the user loaded the app
**When** the user receives the list of events within a city
**Then** all event components should be collapsed by default
### Scenario 2: User can expand an event to see its details
**Given** the list of events is loaded
**When** the user clicks on the 'show details' button on an event component
**Then** the event component expands to show details
### Scenario 3: User can collapse an event to hide it details
**Given** An event was expanded to show details
**When** the user clicks on the 'hide details' button
**Then** the details of the event collapse

## Feature 3: Specify Number of Events
### User Story:
As a user I should be able to select how many events are displayed so I have control over how many events I want to see.

### Scenario 1: When user hasn't specified a number, 32 is the default number.
**Given** the user has loaded the app
**When** the user has not selected how many events they want to see
**Then** 32 events are shown to the user by default

### Scenario 2: User can change the number of events they want to see.
**Given** a list of events has been shown to the user
**When** the user selects the numbers of events they want to see
**Then** a list with the specified amounts of events is shown to the user

## Feature 4: Use the App when Offline
### User Story:
As a user I should be able to use that app when offline so that I can access event details when I do not have access to the internet.

### Scenario 1: Show cached data when there's no internet connection.
**Given** there is a lack of network connection
**When** the user loads the app
**Then** the user can see cached data of previously shown events

### Scenario 2: Show error when user changes the settings (city, time range).
**Given** there is a lack of network connection
**When** the user attempts to change their settings
**Then** the app returns an error to the user

## Feature 5: Data Visualization
### User Story:
As a user I should be able to view a dashboard with data about events across cities so that I can quickly compare events of different cities.

### Scenario 1: Show a chart with the number of upcoming events in each city.
**Given** the user loads the app
**When** the user selects a city
**Then** a chart with the amount of events in the specified city is shown to the user





