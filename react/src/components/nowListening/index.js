import React, { Component } from "react"
import "./style.scss"

const apikey = process.env.REACT_APP_LASTFM_API_KEY
const apibase = "https://ws.audioscrobbler.com/2.0/"
const user = "theblindlookout"

class NowListening extends Component {
    constructor() {
        super()
        this.state = {
            playing: null,
            songName: null,
            songUrl: null,
            artistName: null,
            artistUrl: null,
            notScrobbling: "nothing, but recently played",
            userProfile: "https://www.last.fm/user/" + user,
            setInterval: false
        }
    }

    nowPlaying() {
        let json = this.props.recentTracks
        if (json) {
            let songName = json.recenttracks.track[0].name
            let artistName = json.recenttracks.track[0].artist["#text"]
            let playing
            if (typeof json.recenttracks.track[0]["@attr"] === "undefined") {
                playing = false
            } else {
                playing = true
            }
            if (songName.length >= 50) {
                if (songName.toLowerCase().includes("(f")) {
                    songName = songName.substr(0, songName.indexOf(" (f"))
                } else {
                    songName = songName.substr(0, 50) + "..."
                }
            }
            if (playing) {
                this.setState({
                    playing: playing,
                    songName: songName,
                    artistName: artistName,
                    songUrl: json.recenttracks.track[0].url,
                    artistUrl: "https://www.last.fm/music/" + artistName
                })
            } else {
                this.setState({
                    playing: false,
                    songName: null,
                    artistName: null,
                    songUrl: null,
                    artistUrl: null
                })
            }
        }
    }

    componentDidMount() {
        this.nowPlaying()
        let recentInterval = setInterval(() => {
            this.nowPlaying()
        }, 80)
        this.setState({
            setInterval: recentInterval
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.setInterval)
    }

    render() {
        return (
            <div className="corner" id="song">
                <span>
                    {" "}
                    listening to:&nbsp;
                </span>

                {this.state.playing ? (
                    <span>
                        <a id="songName" href={this.state.songUrl}>
                            {" "}
                            {this.state.songName}{" "}
                        </a>
                        <span id="filler"> by </span>
                        <a id="artistName" href={this.state.artistUrl}>
                            {" "}
                            {this.state.artistName}
                        </a>
                    </span>
                ) : (
                    <span>
                        <span id="notScrobbling" to="/music/">
                            {this.state.notScrobbling}
                        </span>
                    </span>
                )}
            </div>
        )
    }
}

export default NowListening
