// Select

let countspan = document.querySelector('.quiz-info .count span')
let allpullets = document.querySelector('.bullets')
let bullets = document.querySelector('.bullets .spans')
let quizarea = document.querySelector('.quiz-area')
let answersArea = document.querySelector('.answers-area')
let submitButton = document.querySelector('.submit-button')
let results = document.querySelector('.results')
let countdownElement = document.querySelector('.countdown')


let currIndex = 0
let rightAnswers = 0
let countdowninteval

function getrequest() {
    let myrequest = new XMLHttpRequest()

    myrequest.onreadystatechange = function() {

        if (this.readyState === 4 && this.status === 200){
            // Get js pobject
            let questionobj = JSON.parse(this.responseText)

            console.log(questionobj[currIndex])

            // Get questioncount length
            let qcount = questionobj.length

            // add 
            createbullets(qcount)

            
            addquestiones(questionobj[currIndex], qcount)

            countdown(120, qcount)


            submitButton.onclick = () => {

                let theRighitAnswer = questionobj[currIndex].right_answer

                currIndex++

                checkAnswer(theRighitAnswer, qcount)

                quizarea.innerHTML = ''
                answersArea.innerHTML = ''

                addquestiones(questionobj[currIndex], qcount)

                handleBullets()

                showResult(qcount)

                clearInterval(countdowninteval)
                countdown(120, qcount)

                

            }
            
            
        }

    }
    myrequest.open('GET', 'html_questions.json', true)
    myrequest.send()
}

getrequest()

function createbullets(num) {

    countspan.innerHTML = num


    // create spans
    for(let i = 0 ; i < num; i++){

        // create spans
        let span = document.createElement('span')

        bullets.appendChild(span)

        if( i === 0){
            span.className = 'on'
        }

    }


}


function addquestiones(obj, count){


    if(currIndex < count){
            // create h2 
    let qtitle = document.createElement('h2')

    let qtext = document.createTextNode(obj['title'])

    qtitle.appendChild(qtext)

    // append h2 to quiz area
    quizarea.appendChild(qtitle)

    for (let i = 1; i <= 4; i++){
        
              // Create Main Answer Div
        let mainDiv = document.createElement("div");

      // Add Class To Main Div
        mainDiv.className = "answer";

      // Create Radio Input
        let radioInput = document.createElement("input");
        radioInput.style.cursor = 'pointer'

      // Add Type + Name + Id + Data-Attribute
        radioInput.name = "question";
        radioInput.type = "radio";
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`];

      // Make First Option Selected
        if (i === 1) {
        radioInput.checked = true;
        }

      // Create Label
        let theLabel = document.createElement("label");

      // Add For Attribute
            theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
            let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
            theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
        
        answersArea.appendChild(mainDiv);
        

    }
    }
    
    
}

function checkAnswer(ranswer, count){
    let answers = document.getElementsByName('question')

    let choosenAnswer; 

    for (let i = 0; i < answers.length; i++ ){
        if (answers[i].checked){

            choosenAnswer = answers[i].dataset.answer
        }

    }
    


    if (ranswer === choosenAnswer){

        rightAnswers++
        
        console.log('Good Answer')
    }

}

function handleBullets(){

    let bulletsSpan = document.querySelectorAll('.bullets .spans span')
    let arraysofSpan = Array.from(bulletsSpan)

    arraysofSpan.forEach((span, index) => {

        if(currIndex === index){

            span.className = 'on'

        }

    })

}


function showResult(count){

    let theResults 

    if (currIndex === count){
        quizarea.remove()
        answersArea.remove()
        submitButton.remove()
        allpullets.remove()

    
        if (rightAnswers > (count / 2) &&  rightAnswers < count){
            theResults = `<sapn class ='good'> Good </span>, ${rightAnswers} From ${count} is Good answers `
        }else if(rightAnswers === count){
            theResults = `<sapn class ='perfect'> Perfect </span>, Perfect Answers`
        }else{
            theResults = `<sapn class ='bad'> bad </span>, ${rightAnswers} From ${count} is Bad answers `
    
        }
        results.innerHTML = theResults
        results.style.padding = '10px'
        results.style.marginTop = '10px'
        results.style.backgroundColor = 'white'
        
    }


}

function countdown(duration, count){


    if(currIndex < count){

        let minutes, seconds
        countdowninteval = setInterval(function()  {

            minutes = parseInt( duration / 60 ) 
            seconds = parseInt( duration % 60 )

            minutes = minutes < 10 ? `0${minutes}`: minutes
            seconds = seconds < 10 ? `0${seconds}`: seconds

            countdownElement.innerHTML = `${minutes}:${seconds}`

            if(--duration < 0){
                clearInterval(countdowninteval)
                console.log('finished')
                submitButton.click()



                
            }

        }, 1000)




    }

}

