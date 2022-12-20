// [SOLUTION 1]
/* const imgArr = ['bg1.png', 'bg2.png', 'bg3.png', 'bg4.png', 'bg5.png']

function displayBackground() {
    const img = imgArr[Math.floor(Math.random() * imgArr.length)]

    const background = document.createElement('img')
    background.src = `./assets/${img}`

    document.body.append(background)
}
displayBackground()
setInterval(displayBackground, 1000*60) */

// [SOLUTION 2]
const background = document.querySelectorAll('.background')

let imgIndex = 0;

function changeBackground(){
    // Remove .showing class from current background
    background[imgIndex].classList.remove('showing');

    // Increment of imgIndex so it jumps to the next background
    imgIndex++;

    // If the counter reaches the last element/background, set it to 0 to start from the first background again.
    if(imgIndex >= background.length){
        imgIndex = 0;
    }

    // Add the .showing class to the next background
    background[imgIndex].classList.add('showing');
}

setInterval(changeBackground, 1000*60);

