var colors = [["#EEEEEE", "#212121"], ["#fff", "#000"], ["#000", "#fff"]]

var curr = 0
var curr = localStorage.getItem("curr")

function darkMode() {
    document.documentElement.style.setProperty(
        "--text-color",
        colors[curr % colors.length][0]
    )
    document.documentElement.style.setProperty(
        "--background-color",
        colors[curr % colors.length][1]
    )
    localStorage.setItem("textColor", colors[curr % colors.length][0])
    localStorage.setItem("backgroundColor", colors[curr % colors.length][1])
    curr++
    localStorage.setItem("curr", curr)
}

window.onload = () => {
    document.documentElement.style.setProperty(
        "--text-color",
        localStorage.getItem("textColor")
    )
    document.documentElement.style.setProperty(
        "--background-color",
        localStorage.getItem("backgroundColor")
    )
}
