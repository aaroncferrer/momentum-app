const imgArr = ['bg1.png', 'bg2.png', 'bg3.png', 'bg4.png']

// Math.floor() -> Rounds down and returns the largest integer less than or equal to a given number
// Math.random() -> Returns a number equal to 0 or less than 1. 
// Math.random() used with Math.floor() can be used to return random integers. (c) w3schools

function displayBackground() {
    const img = imgArr[Math.floor(Math.random() * imgArr.length)]

    const background = document.createElement('img')
    background.src = `./assets/${img}`

    document.body.append(background)
}
displayBackground()
setInterval(displayBackground, 1000*60)

