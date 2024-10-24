let user=document.querySelector(".login__input--user")
let pin=document.querySelector(".login__input--pin")
let balance=document.querySelector(".balance__value")
let greet=document.querySelector(".welcome")
let login=document.querySelector(".login__btn")
let app=document.querySelector(".app")
let loan=document.querySelector(".form__input--loan-amount")
let loanbtn=document.querySelector(".form__btn--loan")
let loanlbl=document.querySelector(".form__label--loan")
let transferto=document.querySelector(".form__input--to")
let transferamt=document.querySelector(".form__input--amount")
let transferbtn=document.querySelector(".form__btn--transfer")
let movements= document.querySelector(".movements")
let close=document.querySelector(".operation--close")
let cls_input=document.querySelector(".form__input--user")
let cls_pin=document.querySelector(".form__input--pin")
let close_btn=document.querySelector(".form__btn--close")
let timerElement = document.querySelector(".timer");


let account_1= {
    username: "vini",
    password: 1111,
}
let account_2={
    username: "vinisha",
    password: 5555,
}
let account_3={
    username: "vinishaj",
    password: 2222,
}
let accounts=[account_1, account_2, account_3]
// user login
login.addEventListener("click", function() {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].username === user.value && accounts[i].password == pin.value) {
            app.style.opacity = 1;
            if (user.value === "vini") {
                balance.innerHTML = "1500$"; 
                greet.innerHTML = "Welcome Vini";
            } else if (user.value === "vinisha") {
                balance.innerHTML = "1800$";
                greet.innerHTML = "Welcome Vinisha";
            } else {
                balance.innerHTML = "2000$";
                greet.innerHTML = "Welcome Vinisha J";
            }
            break; // Exit the loop once credentials are matched
        }
    }
})
// loan amount
loanbtn.addEventListener("click", function() {
    let i=0;
   while(i<accounts.length){
        if (accounts[i].username == user.value) {
            let amount = parseFloat(loan.value);
            let currentBalance = parseFloat(balance.textContent);
            let totalAmount = amount + currentBalance;
            balance.innerHTML = totalAmount + "$";
            if (accounts[i].username == user.value) {
                let div_row=document.createElement("div")
                let div_type=document.createElement("div")
                let div_date=document.createElement("div")
                let div_value=document.createElement("div")
    
                div_type.innerHTML="Deposit"
                div_date.innerHTML=new Date().toLocaleDateString()
                div_value.innerHTML= amount
                
                div_row.classList.add("movements__row")
                div_type.classList.add("movements__type")
                div_type.classList.add("movements__type--deposit")
                div_date.classList.add("movements__date")
                div_value.classList.add("movements__value")
    
                div_row.appendChild(div_type)
                div_row.appendChild(div_date)
                div_row.appendChild(div_value)
                movements.appendChild(div_row)
            }
        }
        i++
    }
})
// transer amount
transferbtn.addEventListener("click",function () {
    let i=0;
    while (i<accounts.length) {
        if (accounts[i].username == transferto.value) {
            let trans_amt = parseFloat(transferamt.value);
            let currentBalance = parseFloat(balance.textContent);
            let totalAmount= currentBalance - trans_amt;
            balance.innerHTML = totalAmount + "$";
            
                let div_row=document.createElement("div")
                let div_type=document.createElement("div")
                let div_date=document.createElement("div")
                let div_value=document.createElement("div")
    
                div_type.innerHTML="withdrawal"
                div_date.innerHTML=new Date().toLocaleDateString()
                div_value.innerHTML=trans_amt
                
                div_row.classList.add("movements__row")
                div_type.classList.add("movements__type")
                div_type.classList.add("movements__type--withdrawal")
                div_date.classList.add("movements__date")
                div_value.classList.add("movements__value")
    
                div_row.appendChild(div_type)
                div_row.appendChild(div_date)
                div_row.appendChild(div_value)
                movements.appendChild(div_row)
            }
        i++
    }
})

// Account closing
// close_btn.addEventListener("click", function () {
//     while (accounts[i].length) {
//         if (accounts[i].username==cls_input.value) {
//             let cls_pin=parseInt(cls_pin.valueOf);
//             app.style.opacity=0;
            
//         }
        
//     }
    
// // })
// close_btn.addEventListener("click",function () {
//     let i=0;
//     while (i<accounts[i].length) {
//     console.log("error");

//         if (accounts[i].username==cls_input.value&& accounts[i].password==cls_pin.value) {
//             delete accounts[accounts[i]]
//             app.style.opacity=0
//             console.log("error1");
//         }
//         i++
//     }
    
// })
//Account Closing
// close_btn.addEventListener("click", function(){
//     for (let i = 0; i <accounts.length; i++) {
//         if (accounts[i].username===user.value&&accounts[i].password===pin.value) {
//             app.style.opacity=0;
//         }
        
//     }
// })
close_btn.addEventListener("click", function() {
    let usernameToRemove = cls_input.value;
    let pinToRemove = parseFloat(cls_pin.value);

    let index = 0;

    // Use a while loop to find and remove the account
    while (index < accounts.length) {
        if (accounts[index].username === usernameToRemove && accounts[index].password === pinToRemove) {
            // Remove the account from the array
            accounts.splice(index, 1);

            // Hide the app UI and clear the balance
            app.style.opacity = 0;
            balance.innerHTML = "0000€";
            greet.innerHTML = "Account closed";

            // Optionally, you might want to clear the form fields
            cls_input.value = '';
            cls_pin.value = '';

            // Optionally, log the updated accounts array for debugging
            console.log("Updated accounts:", accounts);
            
            break; // Exit the loop once the account is found and removed
        }
        index++;
    }
});


let logoutTimer; // To store the interval ID
let timeLeft = 5 * 60; // 5 minutes in seconds
// Function to start the countdown timer
function startTimer() {
    // Clear any existing timer
    clearInterval(logoutTimer);
    
    // Update the timer display immediately
    updateTimerDisplay();
  
    // Set up the countdown timer
    logoutTimer = setInterval(function() {
      timeLeft--;
  
      // Update the timer display
      updateTimerDisplay();
  
      // Check if time is up
      if (timeLeft <= 0) {
        clearInterval(logoutTimer);
        handleLogout();
      }
    }, 1000); // Update every second
  }
  
  // Function to update the timer display
  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${formatNumber(minutes)}:${formatNumber(seconds)}`;
  }
  
  // Helper function to format numbers with leading zeros
  function formatNumber(num) {
    return num.toString().padStart(2, '0');
  }
  
  // Function to handle user logout
  function handleLogout() {
    // Hide the app UI
    app.style.opacity = 0;
    
    // Reset the balance and greeting
    balance.innerHTML = "0000€";
    greet.innerHTML = "You have been logged out";
  
    // Clear the input fields
    user.value = '';
    pin.value = '';
  
    // Optionally, reset timer and remove user session details here
    timeLeft = 5 * 60; // Reset timer to 5 minutes
    updateTimerDisplay(); // Update display immediately
  }
  
  // Start the timer when the page loads
  startTimer();


  