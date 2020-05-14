import React, { Component } from "react"
import "./style.scss"
import bookmarks from "../../data/bookmarks.json"
import searchEngines from "../../data/searchEngines.json"

const bookmarkKeys = Object.keys(bookmarks)
const searchEnginesKeys = Object.keys(searchEngines)
const isUrl = new RegExp(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
)

class Search extends Component {
    constructor() {
        super()
        this.state = {
            currentText: "",
            searchMod: false,
            searchEngine: "ecosia",
            bookmark: false,
            key: false,
            background: false,
            color: false,
            url: "https://www.ecosia.org/search?q=",
            searching: false,
            possibleKeys: [],
            helper: false
        }
    }

    inputChange = text => {
        let currentText = text.target.value.trim().toLowerCase()

        let key = text.target.value
            .trim()
            .substr(0, 2)
            .toLowerCase()

        this.setState({
            currentText: currentText,
            key: key
        })
        
        this.checkSearchEngines(currentText, key)
    }

    enterPressed = e => {
        if (e.keyCode === 13) {
            if (this.state.searchMod) {
                if (this.state.bookmark) {
                    this.search(this.state.url)
                } else {
                    this.search(
                        this.state.url +
                            this.state.currentText
                                .substr(this.state.key.length)
                                .trim()
                    )
                }
            } else if (isUrl.test(this.state.currentText)) {
                this.setState({
                    searchEngine: "url"
                })
                this.search(this.state.currentText)
            } else {
                this.search(this.state.url + this.state.currentText)
            }
            this.resetSearch()
        }
        if (e.keyCode === 32) {
            this.nameInput.focus()
        }
    }

    search(url) {
        if (!url.match(/^https?:\/\//i)) {
            url = "http://" + url
        }
        window.open(url, "_self")
        this.setState({
            searching: true
        })
    }

    checkSearchEngines(text, key) {
        this.possibleKeys(text)
        if (key in searchEngines) {
            this.setState({
                searchMod: "searchEngine",
                searchEngine: searchEngines[key][0],
                url: searchEngines[key][1],
                background: searchEngines[key][2],
                color: searchEngines[key][3],
                key: key
            })
        } else if (text.trim().toLowerCase() in searchEngines) {
            key = text.trim().toLowerCase()
            this.setState({
                searchMod: "searchEngine",
                searchEngine: searchEngines[key][0],
                url: searchEngines[key][1],
                background: searchEngines[key][2],
                color: searchEngines[key][3],
                key: key
            })
        } else {
            this.checkBookmarks(text)
        }
    }

    checkBookmarks(text) {
        text = text.trim().toLowerCase()
        if (text in bookmarks) {
            this.setState({
                searchMod: "bookmark",
                searchEngine: bookmarks[text][0],
                bookmark: bookmarks[text][0],
                url: bookmarks[text][1],
                background: bookmarks[text][2],
                color: bookmarks[text][3]
            })
        } else {
            this.setState({
                searchMod: false,
                searchEngine: "ecosia",
                background: false,
                bookmark: false,
                color: false,
                key: false,
                url: "https://www.ecosia.org/search?q="
            })
        }
    }

    possibleKeys(text) {
        text = text.trim().toLowerCase()
        const keyList = bookmarkKeys.concat(searchEnginesKeys)
        const charNumber = text.length
        if (charNumber >= 1) {
            const possibleKeysArray = keyList.filter(
                key => key.substr(0, charNumber) === text
            )
            let possibleKeys = []
            possibleKeysArray.map(key => {
                possibleKeys = [
                    ...possibleKeys,
                    searchEngines[key]
                        ? [key, ...searchEngines[key]]
                        : [key, ...bookmarks[key]]
                ]
            })
            if (possibleKeys.length === 1 && text === possibleKeys[0][0]) {
                this.setState({
                    possibleKeys: []
                })
            } else {
                this.setState({
                    possibleKeys: possibleKeys
                })
            }
        } else {
            this.setState({
                possibleKeys: []
            })
        }
    }

    resetSearch() {
        setTimeout(() => {
            window.location.reload()
        }, 15000);
    }

    componentDidMount() {
        this.nameInput.focus()
        document.addEventListener("keypress", this.enterPressed)
    }

    render() {
        let fieldStyle,
            modeStyle = {}
        if (this.state.background && this.state.color) {
            fieldStyle = {
                background: "linear-gradient" + this.state.background,
                color: "white"
            }
            modeStyle = {
                color: this.state.color
            }
        }
        let searchClass = ""
        if (this.state.searching) {
            searchClass = "move-off-right"
        }

        return (
            <div id="inline-search">
                <div id="search-mode" className={searchClass} style={modeStyle}>
                    {this.state.searchEngine} <span className="loading" />
                </div>
                <input
                    autoComplete="off"
                    className={searchClass}
                    id="search-field"
                    type="text"
                    name="search-field"
                    onChange={this.inputChange.bind(this)}
                    onKeyUp={this.enterPressed.bind(this)}
                    style={fieldStyle}
                    ref={input => {
                        this.nameInput = input
                    }}
                />
                {this.state.helper &&
                <div id="search-options" className={searchClass + " options"}>
                    {this.state.possibleKeys.map(key => (
                        <div className="options__option">
                            <span className="options__option__key">
                                {" "}
                                {key[0]}{" "}
                            </span>
                            <span className="options__option__title">
                                {" "}
                                {key[1]} {key[0].includes(":") ? "search" : ""}
                            </span>
                        </div>
                    ))}
                </div>
                }
            </div>
        )
    }
}

export default Search
