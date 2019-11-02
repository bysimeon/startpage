import React, { Component } from "react"
import "./style.scss"

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

// window.onload = () => {
//     document.getElementById("clock").innerHTML = getTime()
//     document.getElementById("date").innerHTML = getDay()

//     setInterval(() => {
//         document.getElementById("clock").innerHTML = getTime()
//         document.getElementById("date").innerHTML = getDay()
//     }, 100)
// }

class Time extends Component {
    constructor() {
        super()
        this.state = {
            date: null,
            time: null
        }
    }
    getTime() {
        let date = new Date(),
            min = date.getMinutes(),
            sec = date.getSeconds(),
            hour = date.getHours()

        this.setState({
            time:
                "" +
                (hour < 10 ? "0" + hour : hour) +
                ":" +
                (min < 10 ? "0" + min : min) +
                ":" +
                (sec < 10 ? "0" + sec : sec)
        })
    }

    getDate() {
        let date = new Date(),
            day = dayNames[date.getDate()],
            month = monthNames[date.getMonth()]
        this.setState({
            date: month + " " + day
        })
    }

    componentDidMount() {
        this.getTime()
        this.getDate()
        setInterval(() => {
            this.getTime()
            this.getDate()
        }, 100)
    }
    render() {
        return (
            <div>
                <div className="clock"> {this.state.time} </div>
                <div className="date"> {this.state.date} </div>
            </div>
        )
    }
}

export default Time
