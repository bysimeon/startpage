let apikey = ""
let apibase = "https://ws.audioscrobbler.com/2.0/"
let user = ""
let paused = true

function recenttrack() {
    let xhr2 = new XMLHttpRequest()
    xhr2.open(
        "GET",
        apibase +
            "?method=user.getrecenttracks&user=" +
            user +
            "&api_key=" +
            apikey +
            "&format=json"
    )
    xhr2.onload = () => {
        if (xhr2.readyState === 4) {
            if (xhr2.status === 200) {
                let json2 = JSON.parse(xhr2.responseText)
                song_name = json2.recenttracks.track[0].name
                artist_name = json2.recenttracks.track[0].artist["#text"]
                noscrobble = "nothing, but recently heard"
                if (
                    typeof json2.recenttracks.track[0]["@attr"] === "undefined"
                ) {
                    playing = false
                } else {
                    playing = json2.recenttracks.track[0]["@attr"].nowplaying
                }
                if (song_name.length >= 50) {
                    if (song_name.includes("(f")) {
                        song_name = song_name.substr(
                            0,
                            song_name.indexOf(" (f")
                        )
                    } else {
                        song_name = song_name.substr(0, 50) + "..."
                    }
                }
                if (playing) {
                    paused = false
                    document.getElementById("song_name").innerHTML = song_name
                    document
                        .getElementById("song_name")
                        .setAttribute("href", json2.recenttracks.track[0].url)
                    sessionStorage.setItem("song_name", song_name)
                    sessionStorage.setItem(
                        "songurl",
                        json2.recenttracks.track[0].url
                    )

                    document.getElementById(
                        "artist_name"
                    ).innerHTML = artist_name
                    document
                        .getElementById("artist_name")
                        .setAttribute(
                            "href",
                            "https://www.last.fm/music/" + artist_name
                        )
                    sessionStorage.setItem("artist_name", artist_name)
                    sessionStorage.setItem(
                        "artist_url",
                        "https://www.last.fm/music/" + artist_name
                    )

                    document.getElementById("filler").innerHTML = "by"
                } else {
                    if (!paused) {
                        document.getElementById(
                            "song_name"
                        ).innerHTML = noscrobble
                        document.getElementById("artist_name").innerHTML = ""
                    }
                    paused = true
                    document.getElementById("filler").innerHTML = ""
                    document
                        .getElementById("song_name")
                        .setAttribute(
                            "href",
                            "https://www.last.fm/user/theblindlookout"
                        )
                    sessionStorage.setItem("song_name", noscrobble)
                    sessionStorage.setItem("artist_name", "")
                    sessionStorage.setItem(
                        "song_url",
                        "https://www.last.fm/user/theblindlookout"
                    )
                }
            } else {
            }
        }
    }
    xhr2.send()
}

window.onload = () => {
    if (apikey !== "") {
        if (sessionStorage.getItem("song_name") === null) {
            document.getElementById("song_name").innerHTML = noscrobble
        } else {
            document.getElementById(
                "song_name"
            ).innerHTML = sessionStorage.getItem("song_name")
        }

        document
            .getElementById("song_name")
            .setAttribute("href", sessionStorage.getItem("song_url"))
        document.getElementById(
            "artist_name"
        ).innerHTML = sessionStorage.getItem("artist_name")
        document
            .getElementById("artist_name")
            .setAttribute("href", sessionStorage.getItem("artist_url"))
        setInterval(recenttrack, 500)
    }
}
