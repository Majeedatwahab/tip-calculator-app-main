document.addEventListener("DOMContentLoaded", () => {
    let billAmount = 0;
    let tipPercentage = 0; 
    let numberOfPeople = 1;

    document.getElementById("bill").addEventListener("input", updateValues);
    document.getElementById("people").addEventListener("input", updateValues);


    document.querySelectorAll(".tip-button").forEach(button => {
        button.addEventListener("click", () => {
            selectTip(button.getAttribute("data-tip"));
        });
    });


    document.getElementById("customTip").addEventListener("input", setCustomTip);

    document.getElementById("resetButton").addEventListener("click", resetCalculator);

    function selectTip(percentage) {
        tipPercentage = parseFloat(percentage);
        document.querySelectorAll(".tip-button").forEach(button => {
            button.classList.remove("active");
        });
        document.querySelector(`.tip-button[data-tip="${percentage}"]`).classList.add("active");
        document.getElementById("customTip").value = ""; 
        updateValues();
    }

    function setCustomTip() {
        const customTipInput = document.getElementById("customTip").value;
        tipPercentage = customTipInput ? parseFloat(customTipInput) : 0;
        document.querySelectorAll(".tip-button").forEach(button => button.classList.remove("active"));
        updateValues();
    }

    function updateValues() {
        billAmount = parseFloat(document.getElementById("bill").value) || 0;
        numberOfPeople = parseInt(document.getElementById("people").value) || 1;
        calculateResults();
    }

    function calculateResults() {
        const tipAmountPerPerson = (billAmount * (tipPercentage / 100)) / numberOfPeople;
        const totalAmountPerPerson = (billAmount / numberOfPeople) + tipAmountPerPerson;

        document.getElementById("tipAmount").innerText = `$${tipAmountPerPerson.toFixed(2)}`;
        document.getElementById("totalAmount").innerText = `$${totalAmountPerPerson.toFixed(2)}`;
    }

    function resetCalculator() {
        document.getElementById("bill").value = "";
        document.getElementById("customTip").value = "";
        document.getElementById("people").value = "1";
        tipPercentage = 0; 
        billAmount = 0;
        numberOfPeople = 1;

        document.querySelectorAll(".tip-button").forEach(button => button.classList.remove("active"));

        // Reset displayed tip and total amounts to $0.00
        document.getElementById("tipAmount").innerText = "$0.00";
        document.getElementById("totalAmount").innerText = "$0.00";
    }
});
