import React, { Component } from "react"
import bookmarks from "../../data/bookmarks.json"
import searchEngines from "../../data/searchEngines.json"

class Commands extends Component {
    constructor() {
        super()
        }
    
    render() {
        console.log(Object.entries(bookmarks))

        const commandList = []

        
        return (
        <div id="command-list">

        </div>
    )
        }
}

export default Commands