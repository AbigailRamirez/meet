import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { WarningAlert } from "./Alert";
import './nprogress.css';



class App extends Component {
  state = {
    events: [],
    eventData: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    warningText: "",
    showWelcomeScreen: undefined
  }

  updateEvents = (location, eventCount) => {
    if (!eventCount) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const shownEvents = locationEvents.slice(0, this.state.eventCount);
        this.setState({
          events: shownEvents,
          selectedCity: location,
        });
      });
    } else if (eventCount && !location) {
      getEvents().then((events) => {
        const locationEvents = events.filter((event) =>
          this.state.locations.includes(event.location)
        );
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    } else if (this.state.selectedCity === "all") {
      getEvents().then((events) => {
        const locationEvents = events;
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          this.state.locations === "all"
            ? events
            : events.filter(
                (event) => this.state.selectedCity === event.location
              );
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    }

    if (!navigator.onLine) {
      this.setState({
        warningText: 'You seem to be offline; events were pulled from cache.'
      });
    }
    else {
      this.setState({
        warningText: ''
      });
    }
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        warningText: 'You seem to be offline; events were pulled from cache.'
      });
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  /*promptOfflineWarning = () => {
    if (!navigator.onLine) {
      this.setState({
        warningText: 'You are offline, so events may not be up to date'
      })
    }
  }*/



  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    
    return (
      <div className="App">
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
        <WarningAlert text={this.state.warningText} />
        <br></br>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}  />
        <br></br>
        <br></br>
        <NumberOfEvents numberOfEvent={this.state.NumberOfEvents} updateEvents={this.updateEvents}/>
        <br></br>
        <EventList events={this.state.events} />
        
      </div>
    );
  }
}


export default App;