/**
 * THE MAIN SITE LOADER
 */

 class TextImplosion {

    constructor(text = 'GuillaumeLeDevin.co.uk', location = 'main', speed = 2, delay = 0, fontSize = 4) {

        //set the class properties
        this.delay = delay;
        this.fontSize = fontSize

        //convert all the characters into elements
        const characterArray = [];

        for(let i = 0; i < text.length; i++) {
            characterArray.push(text[i]);
        }

        //create the text container
        this.container = document.createElement('div');
        this.container.classList.add('implosion-cont');
        this.container.style.display   = 'inline-block';
        this.container.style.position  = 'absolute';
        this.container.style.left      = '50%';
        this.container.style.top       = 'calc(50% - 3vw)';
        this.container.style.transform = 'translate(-50%, -50%)';

        //create element array for each character
        this.elementArray = [];

        for(let i = 0; i < characterArray.length; i++) {
            const element = document.createElement('span');
            element.classList.add('char');
            element.classList.add('char-' + i);
            element.style.display    = 'inline-block';
            element.style.fontSize   = this.fontSize + 'vw';
            element.style.color      = 'teal';
            element.style.textAlign  = 'center';
            element.style.position   = 'relative';
            element.style.left       = '0px';
            element.style.top        = '0px';
            element.style.transform  = 'rotate(0deg)';
            element.style.transition = 'left ' + speed + 's ease-out, top ' + speed + 's ease-out';
            element.style.textShadow = '0px 0px 15px rgba(0,0,0,1)';
            element.style.opacity    = 0;
            element.innerHTML        = characterArray[i];
            this.elementArray.push(element);
        }

        //get the page dimensions
        this.pageWidth  = window.innerWidth;
        this.pageHeight = window.innerHeight;

        //resize event to reset these variables
        window.addEventListener('resize', this.setWindowSize);

        //add the elements to the page
        this.elementArray.forEach(el => {
            this.container.appendChild(el);
        });
        document.querySelector(location).appendChild(this.container);

        //calculate and set the final position
        this.finalPositionArray = [];
        this.setRandomPosition();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setWindowSize() {
        this.pageWidth  = window.innerWidth;
        this.pageHeight = window.innerHeight;
    }

    setRandomPosition() {

        this.elementArray.forEach(el => {

            //set the random vertical position
            const randomOne   = Math.round(Math.random() * 1000);
            const randomTwo   = Math.round(Math.random() * 1000);
            const randomThree = Math.round(Math.random() * 360);

            let posY = 0;
            let posX = 0;
            let rot  = 0;
            let font = 0;

            if(randomOne <= 500) {
                posY = 0 - (randomOne + this.pageHeight);
            } else {
                posY = this.pageHeight + randomOne;
            }

            if(randomTwo <= 500) {
                posX = 0 - (randomTwo + this.pageWidth);
            } else {
                posX = this.pageWidth + randomTwo;
            }

            if(randomThree <= (360/2)) {
                rot = 'rotate(-' + randomThree + 'deg)';
            } else {
                rot = 'rotate(' + randomThree + 'deg)';
            }

            el.style.top       = posY + 'px';
            el.style.left      = posX + 'px';
            el.style.transform = rot;

            //turn opacity back on
            el.style.opacity = 1;
        });
    }

    setFinalPosition() {
        this.elementArray.forEach(el => {
            el.style.top = '0px';
            el.style.left = '0px';
            el.style.transform = 'rotate(0)';
            el.style.fontSize  = this.fontSize + 'vw';
        });
    }

    async startAnimation() {
        await this.sleep(this.delay);
        this.setFinalPosition();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('load', async (event) => {

    //start the text implosion on page load
    const implosion = new TextImplosion();
    implosion.startAnimation();

    //append the coming soon text
    const comingText = document.createElement('p');
    comingText.innerHTML = "COMING SOON!";
    comingText.style.fontSize   = '5vw';
    comingText.style.color      = 'rgba(0,0,0,0)';
    comingText.style.position   = 'absolute';
    comingText.style.left       = '50%';
    comingText.style.top        = 'calc(50% + 3vw)';
    comingText.style.transform  = 'translate(-50%, -50%)';
    comingText.style.transition = 'color 1s linear';
    comingText.style.margin     = '0px';
    document.querySelector('main').appendChild(comingText);

    await sleep(2000);

    comingText.style.color = 'rgba(80,80,80,1)';





});