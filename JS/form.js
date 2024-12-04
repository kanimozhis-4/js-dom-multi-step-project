document.addEventListener('DOMContentLoaded', (e) => {
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const nameError = document.querySelector('.name-error');
const emailError = document.querySelector('.email-error');
const phoneError = document.querySelector('.phonenum-error');

const nameRegex = /^[A-Za-z\s]+$/; 
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
const phoneRegex = /^\d{10}$/;

const monthlyPrices = { arcade: "$9/mo", advanced: "$12/mo", pro: "$15/mo" };
const yearlyPrices = { arcade: "$90/yr", advanced: "$120/yr", pro: "$150/yr" };

let toggleClick=document.querySelector('.toggle-click');
let isMonthly = true;
toggleClick.addEventListener('click',toggleChange)

function toggleChange(){ 
    let priceClass=document.querySelectorAll('.price');  
    let month=document.querySelector('.month');
    let year=document.querySelector('.year');
    const toggleCircle = document.querySelector(".toggle-circle");
    month.classList.toggle('text-active');
    month.classList.toggle('text-inactive');
    year.classList.toggle('text-active');
    year.classList.toggle('text-inactive');

    // Toggle toggle switch position
    toggleCircle.classList.toggle("toggle-left");
    toggleCircle.classList.toggle("toggle-right");
    priceClass.forEach((price)=>{
        let priceName = price.querySelector('h5').textContent.toLowerCase(); // Get the name (arcade, advanced, pro)
        let free=price.querySelector('span');
       
        
        
        let priceText = !isMonthly ? monthlyPrices[priceName] : yearlyPrices[priceName];  
        if(isMonthly){
            free.classList.remove('hidden')
            free.classList.add('block');
        } 
        else{
            free.classList.remove('block');
            free.classList.add('hidden');
        }
        
        
        price.querySelector('p').textContent = priceText; 
       
    })
    isMonthly = !isMonthly; 
    let allItems = document.querySelectorAll('.price-item');
    allItems.forEach((item) => {  
        if(item.classList.contains('price-item-selected')){
            item.classList.remove('price-item-selected');
            item.classList.add('price-item-default');
        }
      
    })
   
} 
// select itemprice
let priceItem=document.querySelector('.list');
priceItem.addEventListener('click',(event)=>{   
    let allItems = document.querySelectorAll('.price-item');
        allItems.forEach((item) => {  
            if(item.classList.contains('price-item-selected')){
                item.classList.remove('price-item-selected');
                item.classList.add('price-item-default');
            }
        })
    let checkedItem=event.target.closest('.price-item');
    checkedItem.classList.remove('price-item-default');
    checkedItem.classList.add('price-item-selected');
    
   

}); 



// / Select service items container
let serviceItem = document.querySelectorAll('.list-service');

// Add event listener to the service item container 
serviceItem.forEach((item)=>{ 
    item.addEventListener('click', (event) => {
        const checkbox = event.target.closest('.price-item')?.querySelector('input[type="checkbox"]');

        let checkedItem = event.target.closest('.price-item');
        if(checkedItem.classList.contains('price-item-default')){
            checkbox.checked=true
            checkedItem.classList.remove('price-item-default');
            checkedItem.classList.add('price-item-selected');
            
        } 
        else{
            checkbox.checked=false
            checkedItem.classList.remove('price-item-selected');
            checkedItem.classList.add('price-item-default');
            
        }  
    }); 
})


// Function to validate name
function validateName() {
    if (nameRegex.test(nameInput.value)) {
        nameError.classList.add('hidden');
        nameInput.classList.remove('error');
        nameInput.classList.add('no-error');


        return true;
    } else {
        nameError.classList.remove('hidden');
        nameInput.classList.remove('no-error');
        nameInput.classList.add('error');
        
        return false;
    }
}

// Function to validate email
function validateEmail() {
    if (emailRegex.test(emailInput.value)) {
        emailError.classList.add('hidden');
        emailInput.classList.remove('error');
        emailInput.classList.add('no-error');
        return true;
    } else {
        emailError.classList.remove('hidden');
        emailInput.classList.remove('no-error');
        emailInput.classList.add('error');
        return false;
    }
}

// Function to validate phone number
function validatePhone() {
    if (phoneRegex.test(phoneInput.value)) {
        phoneError.classList.add('hidden');
        phoneInput.classList.remove('error');
        phoneInput.classList.add('no-error');
        return true;
    } else {
        phoneError.classList.remove('hidden');
        phoneInput.classList.remove('no-error');
        phoneInput.classList.add('error');
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
        input.classList.remove('no-error');
        input.classList.add('error');
        return false;
    } else {
        errorElement.classList.add('hidden');
        input.classList.remove('error');
        input.classList.add('no-error');

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
    if(validity.classList.contains('toggle-right')){
        spanDuration='year'
    }
    for(let item of planItems){
        if(item.classList.contains('price-item-selected'))
        { 
            let planTitle = item.querySelector('h5').textContent; 
            let planPrice = item.querySelector('p').textContent; 
            
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
    let sectionArray=[];
    let selectedPlanJSON = localStorage.getItem('selectedPlan');
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
    localStorage.setItem('selectedSection', JSON.stringify(sectionArray)); 

}
// choose year or month in step 3 
function setPlan(){ 
    let selectedPlanJSON = localStorage.getItem('selectedPlan');
    
    let selectedPlan = JSON.parse(selectedPlanJSON);
    let year =document.querySelector('.price-year');
    let month = document.querySelector('.price-month');
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
    let sectionCost=0;
    sectionSummary.forEach((section,index)=>{
        let sectionTitle = section.querySelector('.title').textContent; 
        
        let selectedServices = selectedSection.map(section => section.service);
        if (selectedServices.includes(sectionTitle)) { 
            let matchedSection = selectedSection.find(item => item.service === sectionTitle);
            section.classList.remove('hidden');
            let cost=section.querySelector('.cost')
            cost.textContent=matchedSection["cost"] 
            console.log(matchedSection,"matchedSection")
            let [number1,period1]=matchedSection["cost"].replace('+','').replace('$','').split('/')
            console.log(number1,'matchedSection')
            sectionCost+=Number(number1)
             
        } else { 
            section.classList.add('hidden');
          
        }
    }) 
    let total=document.querySelector('.total-cost')
    total.textContent="+$"+String(totalCost+sectionCost)+"/"+period;


}
let changePlan=document.querySelector('.change-plan');
changePlan.addEventListener('click',(event)=>{
    let step2=document.querySelector('.step-2');
    step2.classList.remove('hidden');
    let step4=document.querySelector('.step-4');
    step4.classList.add('hidden')
    changeColor('.number-4','.number-2');

}) 
// change number color function 
function changeColor(number1,number2){
    let current=document.querySelector(number1)
    let next=document.querySelector(number2); 
    console.log(current,next)

    current.classList.remove('number-active');
    current.classList.add('number-inactive');
    next.classList.remove('number-inactive');
    next.classList.add('number-active'); 
   
   
} 

const nextButtons = document.querySelectorAll('.nextButton');
const prevButtons = document.querySelectorAll('.goBack');
const steps = document.querySelectorAll('.step-1, .step-2, .step-3, .step-4, .step-5'); 
nextButtonChange();
function nextButtonChange(){
    let currentStep = 0;

    nextButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault() 
        let flag=0;
        if (currentStep < steps.length ) {  
            
        if(currentStep===0){
            if(validateDetails()){
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
            checkSection()
            steps[currentStep].classList.add('hidden');
            currentStep++;
            steps[currentStep].classList.remove('hidden'); 
            setSection();
            changeColor('.number-3','.number-4')
        }  
        else if(currentStep===3){ 
           
            if(!steps[1].classList.contains('hidden')){
                changeColor('.number-2','.number-3')
                steps[currentStep].classList.add('hidden');
                currentStep=1; 
                if(checkPlanSelect()){
                    steps[currentStep].classList.add('hidden');
                    currentStep++;
                    steps[currentStep].classList.remove('hidden'); 
                } 
                else{
                    alert('select any plan')
                }
               
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
                
            } 
            steps[currentStep].classList.add('hidden');
            let first=parseInt(currentStep)
            let number1 = `.number-${String(first)}`;
            let c=parseInt(currentStep)+1;
            let number2 = `.number-${String(c)}`;
            changeColor(number2,number1);
            currentStep--;
            steps[currentStep].classList.remove('hidden');
          }
        });
      }); 
       
}


});

