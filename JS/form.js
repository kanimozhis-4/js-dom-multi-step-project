document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
// Get references to the form elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const nameError = document.querySelector('.name-error');
const emailError = document.querySelector('.email-error');
const phoneError = document.querySelector('.phonenum-error');

// Regular expressions for validation
const nameRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email format
const phoneRegex = /^\d{10}$/;
// Monthly and Yearly Prices
const monthlyPrices = { arcade: "$9/mo", advanced: "$12/mo", pro: "$15/mo" };
const yearlyPrices = { arcade: "$90/yr", advanced: "$120/yr", pro: "$150/yr" };

let toggleClick=document.querySelector('.toggle-click');
let isMonthly = true;
toggleClick.addEventListener('click',toggleChange)
// toggle change 
function toggleChange(){ 
    let priceClass=document.querySelectorAll('.price');  
    let month=document.querySelector('.month');
    let year=document.querySelector('.year');
    const toggleCircle = document.querySelector(".toggle-circle");
    if(isMonthly){
        month.classList.add('text-black');
        month.classList.remove('text-gray-500');
        year.classList.add('text-gray-500');
        year.classList.remove('text-black');
        toggleCircle.classList.add("translate-x-4");
        toggleCircle.classList.remove("translate-x-0");
      
    } 
    else{
        month.classList.remove('text-black');
        month.classList.add('text-gray-500');
        year.classList.add('text-black');
        year.classList.remove('text-gray-500');
        toggleCircle.classList.add("translate-x-0");
        toggleCircle.classList.remove("translate-x-4");
      
    }
    priceClass.forEach((price)=>{
        let priceName = price.querySelector('h5').textContent.toLowerCase(); // Get the name (arcade, advanced, pro)
        let free=price.querySelector('span');
       
        
        // Change price text based on the current mode
        let priceText = !isMonthly ? monthlyPrices[priceName] : yearlyPrices[priceName];  
        if(isMonthly){
            free.classList.remove('hidden')
            free.classList.add('block');
        } 
        else{
            free.classList.remove('block');
            free.classList.add('hidden');
        }
        
        // Update the <p> tag with the new price
        price.querySelector('p').textContent = priceText; 
       
    })
    isMonthly = !isMonthly;
   
} 
// select itemprice
let priceItem=document.querySelector('.list');
priceItem.addEventListener('click',(event)=>{   
    console.log("111111111111111")
    let allItems = document.querySelectorAll('.price-item');
        allItems.forEach((item) => { 
            item.classList.remove('border-[hsl(213,96%,18%)]', 'bg-[hsl(217,100%,97%)]');
            item.classList.add('border-gray-300');
        })
    let checkedItem=event.target.closest('.price-item');
    checkedItem.classList.remove('border-gray-300');
    checkedItem.classList.add('border-[hsl(213,96%,18%)]', 'bg-[hsl(217,100%,97%)]');
   

}); 
// /// Select service items container



// / Select service items container
let serviceItem = document.querySelectorAll('.list-service');

// Add event listener to the service item container 
serviceItem.forEach((item)=>{ 
    item.addEventListener('click', (event) => {
        if(event.target.type ==='checkbox'){ 
            let checkedItem = event.target.closest('.price-item');
            if(checkedItem.classList.contains('border-gray-300')){
                checkedItem.classList.remove('border-gray-300','bg-white');
                checkedItem.classList.add('border-[hsl(213,96%,18%)]', 'bg-[hsl(217,100%,97%)]');
            } 
            else{
                checkedItem.classList.remove('border-[hsl(213,96%,18%)]', 'bg-[hsl(217,100%,97%)]');
                checkedItem.classList.add('border-gray-300','bg-white');
            } 
            // const sectionData = {
            //     name: checkedItem.querySelector('h5').innerText, // Assuming the plan name is in <h5>
            //     price: checkedItem.querySelector('p').innerText  // Assuming the price is in <p>
            // };
        }
        
    }); 
    // console.log()
    

})


// Function to validate name
function validateName() {
    if (nameRegex.test(nameInput.value)) {
        nameError.classList.add('hidden');
        nameInput.classList.remove('border-red-500');
        return true;
    } else {
        nameError.classList.remove('hidden');
        nameInput.classList.add('border-red-500');
        return false;
    }
}

// Function to validate email
function validateEmail() {
    if (emailRegex.test(emailInput.value)) {
        emailError.classList.add('hidden');
        emailInput.classList.remove('border-red-500');
        return true;
    } else {
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        return false;
    }
}

// Function to validate phone number
function validatePhone() {
    if (phoneRegex.test(phoneInput.value)) {
        phoneError.classList.add('hidden');
        phoneInput.classList.remove('border-red-500');
        return true;
    } else {
        phoneError.classList.remove('hidden');
        phoneInput.classList.add('border-red-500');
        return false;
    }
}

// Add event listeners for the input fields to validate on change
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);


const nextButton = document.querySelector('.nextButton');
const validateField = (input, regex, errorElement) => {
    if (!regex.test(input.value.trim())) {
        errorElement.classList.remove('hidden');
        input.classList.add('border-red-500');
        return false;
    } else {
        errorElement.classList.add('hidden');
        input.classList.remove('border-red-500');
        return true;
    }
}; 
function validateDetails(){
    const isNameValid = validateField(nameInput, nameRegex, nameError);
    const isEmailValid = validateField(emailInput, emailRegex, emailError);
    const isPhoneValid = validateField(phoneInput, phoneRegex, phoneError);

    if (isNameValid && isEmailValid && isPhoneValid) {
        return true
    }  
    return false
} 
function checkPlanSelect(){
   
    let planItems=document.querySelectorAll('.price-item')
    let spanDuration='month'; 
    let validity=document.querySelector('.toggle-circle');
    if(validity.classList.contains('translate-x-4')){
        spanDuration='year'
    }
    for(let item of planItems){
        if(item.classList.contains('bg-[hsl(217,100%,97%)]'))
        { 
            let planTitle = item.querySelector('h5').textContent; // Title (e.g., "arcade")
            let planPrice = item.querySelector('p').textContent; // Price (e.g., "$9/mo")
            
            // Store the selected plan in localStorage
            localStorage.setItem('selectedPlan', JSON.stringify({ title: planTitle, price: planPrice, plan:spanDuration}));
            console.log(`Selected Plan: ${planTitle} - ${planPrice},${spanDuration}`);
            return true; 
        }

    }
    return false;
}  
// select the selection is selected or not and store in local storage 
function checkSection(){  
    console.log("entered") 
    let sectionArray=[];
    let selectedPlanJSON = localStorage.getItem('selectedPlan');
    
    // Parse the JSON string into a JavaScript object
    let selectedPlan = JSON.parse(selectedPlanJSON);  
    let contents;
    if(selectedPlan["plan"]==='year'){
        contents=document.querySelectorAll('.price-year .price-item')
    } 
    else{
        contents=document.querySelectorAll('.price-month .price-item')
    }  
    contents.forEach((content)=>{ 
        let section={"service":"","cost":""}
        let input=content.querySelector('input') 
        let service=content.querySelector('h3').textContent
        let cost=content.querySelector('.cost').textContent
        if(input.checked){ 
            section["service"]=service;
            section["cost"]=cost; 
            sectionArray.push(section);
        }
    }) 
    if(sectionArray.length){ 
        localStorage.setItem('selectedSection', JSON.stringify(sectionArray)); 
        console.log(sectionArray,"section")
        return true
    }
    return false

}
// choose year or month in step 3 
function setPlan(){ 
    // console.log("inside setplan")
    let selectedPlanJSON = localStorage.getItem('selectedPlan');
    // console.log(selectedPlanJSON, "selectedPlannnn");
    
    // Parse the JSON string into a JavaScript object
    let selectedPlan = JSON.parse(selectedPlanJSON);
    let year =document.querySelector('.price-year');
    let month = document.querySelector('.price-month');
    // console.log(selectedPlan,"selectedPlannnn")
    if(selectedPlan["plan"]=='year'){
        year.classList.remove('hidden')
        month.classList.add('hidden');
    } 
    else{  
        console.log("in ",selectedPlan["plan"])
        month.classList.remove('hidden');
        year.classList.add('hidden')

    }
} 
// setp -4 set all the values stored in local storage display 
function setSection(){ 
    let totalCost=0;
    let summary=document.querySelector('.price-summary');
    let sectionSummary=document.querySelectorAll('.section-summary');
    // console.log(summary,"summary")
    
    let planTitle=document.querySelector('.summary-plan');
    let selectedPlanJSON=localStorage.getItem('selectedPlan')
    let selectedPlan= JSON.parse(selectedPlanJSON); 
    let planPrice=document.querySelector('.summary-cost');
   
    let selectedSectionJSON = localStorage.getItem('selectedSection');
    let selectedSection = JSON.parse(selectedSectionJSON); 
   
    planTitle.textContent=selectedPlan['title']
    planPrice.textContent=selectedPlan['price']
    let [number,period]=selectedPlan['price'].replace('+','').replace('$','').split('/')
    totalCost=parseInt(number);
    console.log("numberrr",number,period) 
    let sectionCost=0;
    sectionSummary.forEach((section,index)=>{
        let sectionTitle = section.querySelector('.title').textContent; 
        
        console.log(sectionTitle,selectedSection,"qqqqqqqqqqqqqq")
        let selectedServices = selectedSection.map(section => section.service);
        // Check if sectionTitle exists and is part of the selectedSection array
        if (selectedServices.includes(sectionTitle)) { 
            let matchedSection = selectedSection.find(item => item.service === sectionTitle);
            // Hide the section if no title or title is not in selectedSection
            section.classList.remove('hidden');
            let cost=section.querySelector('.cost')
            cost.textContent=matchedSection["cost"] 
            console.log(matchedSection,"matchedSection")
            let [number1,period1]=matchedSection["cost"].replace('+','').replace('$','').split('/')
            console.log(number1,'matchedSection')
            sectionCost+=Number(number1)
            // totalCost+=parseInt(number)
            // totalCost+=parseFloat(matchedSection["cost"].replace('$', '').replace('/mo', ''));
            
        } else { 
            section.classList.add('hidden');
            
            // Otherwise, show the section (in case it was hidden before)
            // section.style.display = 'block';
        }
    }) 
    let total=document.querySelector('.total-cost')
    total.textContent="+$"+String(totalCost+sectionCost)+"/"+period;
    // console.log(totalCost,"sssssssssssssss",sectionCost)


}
let changePlan=document.querySelector('.change-plan');
changePlan.addEventListener('click',(event)=>{
    let step2=document.querySelector('.step-2');
    step2.classList.remove('hidden');
    let step4=document.querySelector('.step-4');
    step4.classList.add('hidden')
    // nextButtonChange();
    changeColor('.number-4','.number-2');

}) 
// change number color function 
function changeColor(number1,number2){
    let current=document.querySelector(number1)
    let next=document.querySelector(number2); 
    console.log(current,next)

    current.classList.remove('bg-[hsl(206,94%,87%)]','text-[#4f46e5]');
    current.classList.add('text-white');
    next.classList.remove('text-white');
    next.classList.add('bg-[hsl(206,94%,87%)]','text-[#4f46e5]'); 
   
   
} 

const nextButtons = document.querySelectorAll('.nextButton');
const prevButtons = document.querySelectorAll('.goBack');
const steps = document.querySelectorAll('.step-1, .step-2, .step-3, .step-4, .step-5'); // Add more steps as needed
// let currentStep = 0;
nextButtonChange();
function nextButtonChange(){
    let currentStep = 0;

    nextButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault() 
        let flag=0;
        console.log(currentStep,'ccccccccccccccccccc')
        if (currentStep < steps.length ) {  
            
        if(currentStep===0){
            if(validateDetails()){
                console.log("innnn")
                steps[currentStep].classList.add('hidden');
                currentStep++;
                steps[currentStep].classList.remove('hidden'); 
               
                changeColor('.number-1','.number-2');
            } 
        }  
        else if(currentStep===1){
            if(checkPlanSelect()){
                steps[currentStep].classList.add('hidden');
                currentStep++;
                steps[currentStep].classList.remove('hidden'); 
                setPlan();
                changeColor('.number-2','.number-3')
            } 
            else{
                alert('select any plan')
            }
        } 
        else if(currentStep===2){ 
            console.log("cs",currentStep);
            if(checkSection()){   
                steps[currentStep].classList.add('hidden');
                currentStep++;
                steps[currentStep].classList.remove('hidden'); 
                setSection();
                changeColor('.number-3','.number-4')
               
                
                // let selectedSectionJSON = localStorage.getItem('selectedSection');
                //  let selectedSection = JSON.parse(selectedSectionJSON); 
                // console.log( typeof selectedPlan,selectedPlan) 
                // for(let section of selectedSection){
                //     console.log("end",section);
                // }
            } 
            else{
                alert("select any add-ons")
            }
        
        }  
        else if(currentStep===3){ 
           
            if(!steps[1].classList.contains('hidden')){
                console.log("123456787989090988")
                changeColor('.number-2','.number-3')
                steps[currentStep].classList.add('hidden');
                currentStep=1; 
                steps[currentStep].classList.add('hidden');
                currentStep++;
                steps[currentStep].classList.remove('hidden'); 
            } 
            else{ 
                flag=1;
                steps[currentStep].classList.add('hidden');
                currentStep++;
                steps[currentStep].classList.remove('hidden'); 
                let step5=document.querySelector('.main-container');
                step5.classList.add('md:w-[60%]') 

            }
           
        }
        else{ 
            console.log("in in last step",steps)
            // steps[currentStep].classList.add('hidden');
            // currentStep++;
            // steps[currentStep].classList.remove('hidden'); 
            // let step5=document.querySelector('.main-container');
            // step5.classList.add('md:w-[60%] ')
        } 
        if(flag==0){ 
            let step5=document.querySelector('.main-container');
            step5.classList.remove('md:w-[60%]') 

        }
        
        }
    });
    }); 
    prevButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          if (currentStep > 0) { 
            if(currentStep===3 && (!steps[1].classList.contains('hidden'))){ 
                currentStep=1;
                steps[currentStep].classList.add('hidden');
                let first=parseInt(currentStep)
                let number1 = `.number-${String(first)}`;
                let c=parseInt(1)+1;
                let number2 = `.number-${String(c)}`;
                changeColor(number2,number1);
                currentStep--;
                steps[currentStep].classList.remove('hidden');
            } 
            else{ 
                steps[currentStep].classList.add('hidden');
                let first=parseInt(currentStep)
                let number1 = `.number-${String(first)}`;
                let c=parseInt(currentStep)+1;
                let number2 = `.number-${String(c)}`;
                console.log(number1,number2,"[[[[[[[[[[[[[[[[")
                changeColor(number2,number1);
                currentStep--;
                console.log(currentStep,"currentsteppppppp");
                steps[currentStep].classList.remove('hidden');

            }
           
            
      
          }
        });
      }); 
       
}


});

