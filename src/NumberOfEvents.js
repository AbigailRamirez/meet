import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
    constructor() {
        super();
        this.state = {
          query: 32,
          errorText: "",
        };
    }

    handleNumberChange = (event) => {
        const value = event.target.value;
        if (value >= 1 || value <= 32) {
            this.setState({
            query: value,
            errorText: "",
            });
            this.props.updateEvents(this.props.selectedCity, value);
        }
        if (value < 1 || value > 32) {
            this.setState({
            query: value,
            errorText: "Please enter a valid number",
            });
        }
    };

    render() {
        return (
            <div className="NumberOfEvents">
                <h3>number of events:</h3>
                <input
                    type="number"
                    className="numberOfEvents"
                    value={this.state.query} 
                    onChange={this.handleNumberChange}  
                    min={1}
                    max={32}
                />
                <ErrorAlert className='errorMessage' text={this.state.errorText} />
            </div>
        );
    }
}

export default NumberOfEvents;