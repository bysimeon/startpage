import React, { Component } from "react"
import "./style.scss"

import Time from "./time"
import Search from "./search"
import Weather from "./weather"

class Start extends Component {
    render() {
        return (
            <div className="container container--start">
                <Time />
                <Weather />
                <Search />
            </div>
        )
    }
}

export default Start
