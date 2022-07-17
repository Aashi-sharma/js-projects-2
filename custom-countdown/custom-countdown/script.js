const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle ='';
let countdownDate ='';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


//Set date input min. with today's date
const today  = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

//populate countdown
function updateDOM() {
    countdownActive = setInterval(() => { const now = new Date().getTime();
        const distance = countdownValue - now;
      
    
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
       
      
        //Hide input
        inputContainer.hidden = true;

        //If the countdown hass ended show complete
        if ( distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} Finished on ${countdownDate}`;
            completeEl.hidden = false;


        } else {
            //Else show the countdown in progress
            countdownElTitle.textContent = `${countdownElTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden =  false;

        
        }
    
       
        
    }, second);


    
}

//Take values from form input
function updateCountdown (e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title : countdownTitle,
        date : countdownDate
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    
    // Check for valid date
    if(countdownDate === ''){
        alert('Please select a date for the countdown.');
    }else{
        // Get the number version of current date, update DOM
        countdownValue = new Date(countdownDate).getTime();
       
        updateDOM();
    }
}
//Reset All values
function reset(){
    //Hide countdowns and shoe input
    countdownEl.hidden = true;
    inputContainer.hidden =false;
    completeEl.hidden = true;
    //Stop the countdown
    clearInterval(countdownActive);
    //Reset values
    countdownTitle = '';
    countdownDate ='';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    //Get countdown from local storage if available
    if (localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        saveCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = saveCountdown.title;
        countdownDate = saveCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }

}


//Event listeners
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);

//On load check localstorage
restorePreviousCountdown();