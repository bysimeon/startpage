/* eslint-disable prettier/prettier */
"use strict"
// VARIABLES
let selectedSearch = ""
let selectedSearchLength = 0
let selectedBookmark = ""

// LISTS
var searchEngines = {
    "s:": [
        "soundcloud",
        "https://soundcloud.com/search?q=",
        "(to right, #fe8c00, #f83600)",
        "#fe8c00"
    ],
    "l:": [
        "lyrics @ genius",
        "https://genius.com/search?q=",
        "(to right, #FAD961 , #F7F21C)",
        "#FAD961"
    ],
    "::": [
        "localhost",
        "http://localhost:",
        "(135deg, #8BC6EC 0%, #9599E2 100%)",
        "#8BC6EC "
    ],
    "y:": [
        "youtube",
        "https://www.youtube.com/results?search_query=",
        "(to right, #e52d27, #b31217)",
        "#e52d27"
    ],
    "a:": [
        "myanimelist",
        "https://myanimelist.net/search/all?q=",
        "(to right, #1488cc, #2e51a2)",
        "#1488cc"
    ],
    "r:": [
        "reddit",
        "https://www.reddit.com/search?q=",
        "(to right, #5f99cf, #cee3f8)",
        "#5f99cf",
        "#1488cc"
    ],
    "r/": [
        "subreddit",
        "https://www.reddit.com/r/",
        "(to right, #5f99cf, #cee3f8)",
        "#5f99cf"
    ],
    "d:": [
        "google drive",
        "https://drive.google.com/drive/u/0/search?q=",
        "(to right, #4285f4, #fbbc05)",
        "#4285f4"
    ],
    "g:": [
        "github",
        "https://github.com/search?utf8=%E2%9C%93&q=",
        "(to right, #767676, #999)",
        "#767676"
    ],
    "u:": [
        "unsplash",
        "https://unsplash.com/search/photos/",
        "(to right, #485563, #29323c)",
        "#485563"
    ],
    "n:": [
        "netflix",
        "https://www.netflix.com/search?q=",
        "(to right, #e50914, #e50914)",
        "#e50914"
    ],
    "t:": [
        "translate",
        "https://translate.google.com/#auto/fr/",
        "(to right, #2c3e50, #4ca1af)",
        "#2c3e50"
    ],
    "e:": [
        "ebay",
        "https://www.ebay.com/sch/",
        "(to right, #799f0c, #acbb78)",
        "#799f0c"
    ],
    "p:": [
        "usps tracking",
        "https://tools.usps.com/go/TrackConfirmAction?tLabels=",
        "(to right, #E71921, #333366)",
        "#E71921"
    ]
}
var bookmarks = {
    sc: ["soundcloud", "https://www.soundcloud.com/"],
    yt: ["youtube", "https://www.youtube.com/"],
    clndr: ["calendar", "https://calendar.google.com"],
    phts: ["google photos", "http://photos.google.com"],
    txt: ["messages", "https://messages.android.com"],
    ebay: ["ebay", "https://www.ebay.com"],
    drive: ["google drive", "https://www.drive.google.com/drive/"],
    docs: ["google docs", "https://www.docs.google.com/"],
    netflix: ["netflix", "https://www.netflix.com/"],
    git: ["github", "https://www.github.com"],
    keep: ["google keep", "https://keep.google.com"],
    mail: ["gmail", "https://gmail.com"],
    amzn: ["amazon", "https://smile.amazon.com/"],
    rddt: ["reddit", "https://reddit.com"],
    mal: ["myanimelist", "https://myanimelist.net"],
    bs64: ["base64", "https://www.base64decode.org/"]
}

// clear everything except text
function clear() {
    selectedSearch = ""
    selectedSearchLength = 0
    selectedBookmark = ""
    document.getElementById("search-field").style.background =
        "var(--text-color)"
    document.getElementById("search-mode").style.color = "var(--text-color)"
    document.getElementById("search-mode").innerHTML = "google"
    document.getElementById("search-field").style.color =
        "var(--background-color)"
}

// function that checks for bookmarks and searchengines, also searches on enter
function search(e) {
    let currentText = document.getElementById("search-field").value
    let key = currentText
        .trim()
        .substr(0, 2)
        .toLowerCase()

    // first check for bookmarks and searchengines
    if (
        key in searchEngines ||
        currentText.trim().toLowerCase() in searchEngines
    ) {
        if (!(key in searchEngines) && selectedSearchLength == 0) {
            selectedSearch = currentText.trim().toLowerCase()
            selectedSearchLength = currentText.trim().length
        } else if (key in searchEngines) {
            selectedSearch = key
            selectedSearchLength = key.length
        }
        document.getElementById("search-field").style.background =
            "-webkit-linear-gradient" + searchEngines[selectedSearch][2]
        document.getElementById("search-field").style.background =
            "linear-gradient" + searchEngines[selectedSearch][2]
        document.getElementById("search-field").style.color = "white"
        document.getElementById("search-mode").style.color =
            searchEngines[selectedSearch][3]
        document.getElementById("search-mode").style.color =
            searchEngines[selectedSearch][3]
        document.getElementById("search-mode").innerHTML =
            searchEngines[selectedSearch][0]
    } else if (currentText.trim().toLowerCase() in bookmarks) {
        selectedBookmark = currentText.trim().toLowerCase()
        document.getElementById("search-field").style.background = ""
        document.getElementById("search-mode").innerHTML = "bookmark"
        document.getElementById("search-mode").style.color = "#ee0979 "
        document.getElementById("search-field").style.color = "white"
        document.getElementById("search-field").style.background =
            "linear-gradient" + "(to right, #ee0979, #ff6a00)"
    } else if (!(key in searchEngines) && !(currentText.trim() in bookmarks)) {
        if (
            currentText.substr(0, selectedSearchLength) != selectedSearch ||
            selectedSearchLength == 0
        ) {
            clear()
        }
    }

    // then search on spacebar
    if (e.keyCode == 13) {
        if (selectedSearch != "") {
            window.open(
                searchEngines[selectedSearch][1] +
                    currentText
                        .trim()
                        .substr(selectedSearch.length)
                        .trim(),
                "_self"
            )
            document.getElementById("search-mode").innerHTML =
                searchEngines[selectedSearch][0] +
                "<span class='loading'></span>"
        } else if (selectedBookmark != "") {
            window.open(bookmarks[selectedBookmark][1], "_self")
        } else if (
            currentText.includes(".com") ||
            currentText.includes(".net") ||
            currentText.includes(".co") ||
            currentText.includes(".io") ||
            currentText.includes(".xyz") ||
            currentText.includes(".gov") ||
            currentText.includes(".org") ||
            currentText.includes(".se") ||
            currentText.includes(".fm") ||
            currentText.includes(".de") ||
            currentText.includes(".uk") ||
            currentText.includes(".gg") ||
            currentText.includes(".info") ||
            currentText.includes(".ai") ||
            currentText.includes(".ch") ||
            currentText.includes(".edu") ||
            currentText.includes(".gl") ||
            currentText.includes(".na") ||
            currentText.includes(".nz") ||
            currentText.includes(".so") ||
            currentText.includes(".ly")
        ) {
            if (currentText.trim().includes(" ")) {
            } else {
                document.getElementById("search-mode").innerHTML =
                    "url" + "<span class='loading'></span>"
                if (currentText.includes("http")) {
                    window.open(currentText.trim(), "_self")
                } else {
                    try {
                        window.open("http://" + currentText.trim(), "_self")
                    } catch (err) {
                        document.getElementById("search-mode").innerHTML =
                            "google" + "<span class='loading'></span>"
                        window.open(
                            "https://google.com/search?q=" + currentText.trim(),
                            "_self"
                        )
                    }
                }
            }
        } else {
            document.getElementById("search-mode").innerHTML =
                "google" + "<span class='loading'></span>"
            window.open(
                "https://google.com/search?q=" + currentText.trim(),
                "_self"
            )
        }
        document
            .getElementById("search-field")
            .setAttribute("class", "move-off-right")
        document
            .getElementById("search-mode")
            .setAttribute("class", "move-off-right")
    }
}

// shows the help box
function commands() {
    document.getElementById("command").style.visibility = "visible"
    document.getElementById("command").style.opacity = 1
    document.getElementById("command-list").focus()
}

// focus on the search box
function opensearchbox() {
    document.getElementById("search-field").focus()
}

// function to close
function closeall() {
    document.getElementById("search-field").value = ""
    document.getElementById("search-field").blur()
    document.getElementById("command").style.visibility = "hidden"
    document.getElementById("command").style.opacity = 0
    document.getElementById("command-list").blur()
    clear()
}

// event listener for space and esc
document.addEventListener("keydown", event => {
    if (event.keyCode == 32) {
        // space code to open search
        opensearchbox()
    } else if (event.keyCode == 27) {
        // esc code to close search
        closeall()
    }
})

window.onload = () => {
    // clear text and focus search
    document.getElementById("search").focus()
    document.getElementById("search-field").value = ""
    clear()
}
