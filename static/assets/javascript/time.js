const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
]

const dayNames = [
    "",
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "eleventh",
    "twelfth",
    "thirteenth",
    "fourteenth",
    "fiftheenth",
    "sixteenth",
    "seventeenth",
    "eighteenth",
    "nineteenth",
    "twentyith",
    "twentyfirst",
    "twenysecond",
    "twentythird",
    "twenyfourth",
    "twenyfifth",
    "twenysixth",
    "twenysevenph",
    "twenyayth",
    "twenyninth",
    " thirtyith",
    "thirtyfirst"
]

function getTime() {
    let date = new Date(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        hour = date.getHours()

    return (
        "" +
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (min < 10 ? "0" + min : min) +
        ":" +
        (sec < 10 ? "0" + sec : sec)
    )
}

function getDay() {
    let date = new Date(),
        day = dayNames[date.getDate()]
    month = monthNames[date.getMonth()]

    return "" + month + " " + day
}

window.onload = () => {
    document.getElementById("clock").innerHTML = getTime()
    document.getElementById("date").innerHTML = getDay()

    setInterval(() => {
        document.getElementById("clock").innerHTML = getTime()
        document.getElementById("date").innerHTML = getDay()
    }, 100)
}
