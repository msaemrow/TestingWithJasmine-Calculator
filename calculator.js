
window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("calc-form");
    if (form) {
      setupIntialValues();
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        update();
      });
    }
  });
  
  function getCurrentUIValues() {
    return{
      amount: +(document.getElementById("loan-amount").value),
      years: +(document.getElementById("loan-years").value),
      rate: +(document.getElementById("loan-rate").value)
    };
  }
  
  // Get the inputs from the DOM.
  // Put some default values in the inputs
  // Call a function to calculate the current monthly payment
  function setupIntialValues() {
    const values = {amount: 10000, years: 10, rate: 2.5};
    const amountInput = document.getElementById("loan-amount");
    amountInput.value = values.amount;
    const yearsInput = document.getElementById("loan-years");
    yearsInput.value = values.years;
    const rateInput = document.getElementById("loan-rate");
    rateInput.value = values.rate;
    update();
  }
  
  // Get the current values from the UI
  // Update the monthly payment
  function update() {
    // const currentValues = getCurrentUIValues();
    updateMonthly(calculateMonthlyPayment(getCurrentUIValues()));
  }
  
  // Given an object of values (a value has amount, years and rate ),
  // calculate the monthly payment.  The output should be a string
  // that always has 2 decimal places.
  function calculateMonthlyPayment(values) {
    const principle = values.amount;
    const monthlyRate = (values.rate / 100) / 12;
    const n = values.years * 12;
    if(monthlyRate === 0){
      return (principle / n).toFixed(2);
    } else {
    return ((principle * monthlyRate)/(1 - Math.pow((1+monthlyRate), -n))).toFixed(2);
    }
  }
  
  // Given a string representing the monthly payment value,
  // update the UI to show the value.
  function updateMonthly(monthly) {
    let monthlyPmt = document.getElementById('monthly-payment');
    monthlyPmt.innerText = "$" + monthly;
  }
  