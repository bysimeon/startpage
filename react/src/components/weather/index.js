import React, { Component } from "react"
import "./style.scss"

class Weather extends Component {
    constructor() {
        super()
        this.state = {
            latitude: null,
            longitude: null,
            temperature: null,
            description: null
        }
    }

    getLocation() {
        if (this.state.latitude === null && this.state.longitude === null) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                }.bind(this)
            )
        }
    }

    getWeather() {
        if (
            this.state.temperature === null ||
            this.state.description === null
        ) {
            if (this.state.latitude && this.state.longitude) {
                let xhr = new XMLHttpRequest()
                xhr.open(
                    "GET",
                    "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
                        this.state.latitude +
                        "&lon=" +
                        this.state.longitude +
                        "&units=Imperial&appid=4119dfca25e96bf1f10f35a975835f6c"
                )
                xhr.onload = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            let json = JSON.parse(xhr.responseText)
                            this.setState({
                                temperature: json.main.temp.toFixed(0),
                                description: json.weather[0].description
                            })
                        }
                        if (xhr.status === 400) {
                        }
                    }
                }
                xhr.send()
            }
        }
    }

    componentDidMount() {
        this.getLocation()
        setInterval(() => {
            this.getWeather()
        }, 100)
    }

    render() {
        return (
            <div className="weather-container">
                <div className="row">
                    <div id="weather-description" className="inline">
                        {this.state.description}
                    </div>
                    <span className="inline">&nbsp; &mdash; &nbsp;</span>
                    <div id="temp" className="inline">
                        {this.state.temperature}{" "}
                        {this.state.temperature && <span>&#176;f</span>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Weather
