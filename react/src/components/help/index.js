import React, { Component } from "react"
import "./style.scss"

import bookmarks from "../../data/bookmarks.json"
import searchEngines from "../../data/searchEngines.json"


class Help extends Component {
    render() {
        let marks = Object.entries(bookmarks)
        let engings = Object.entries(searchEngines)
        return (
            <div id="command" className="fade">
                <div id="close1" />
                <div id="command-list">
                    press
                    <span> space </span> to focus the searchbox,
                    <span> google </span> is used by default. enter a
                    <span> url </span> to open that webpage. search specific
                    sites by using one of the following shortcuts before your
                    query:
                    <div className="grid">
                        {marks}
                    </div>
                    press
                    <span> esc </span> to clear the searchbox and close this
                    help page.
                    <br />
                    <br /> p.s. the song displayed at the bottom right is my
                    most recent track from
                    <a href="https://www.last.fm/user/theblindlookout">
                        last.fm
                    </a>
                </div>
            </div>
        )
    }
}

export default Help
