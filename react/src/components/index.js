import React, { Component } from "react"
import "./style.scss"

import Time from "./time"
import Search from "./search"
import Weather from "./weather"
import Commands from "./commands"

class Start extends Component {
    constructor() {
        super()
        this.state = {
            searchMode: "",
            searchModeColor: ""
        }
    }

    changeBackground = (mode, color) => {
        this.setState({
            searchMode: mode,
            searchModeColor: color
        })
    }

    render() {
        let backgroundTextRepeat = (this.state.searchMode + " ").repeat(100)

        return (
            <div className="container container--start">
                <div className="modeBackground">{backgroundTextRepeat}</div>
                <Time />
                <Weather />
                <Search changeBackground={this.changeBackground} />
            </div>
        )
    }
}

export default Start
