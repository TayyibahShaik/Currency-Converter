const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("fromcurrency");
const toCurrencySelect = document.getElementById("tocurrency");
const convertButton = document.getElementById("convertButton");
const resultDiv = document.getElementById("result");

const apiKey = "3e23ca8480b94d21bef858f2";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;

convertButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const fromcurrency = fromCurrencySelect.value;
    const tocurrency = toCurrencySelect.value;

    if (isNaN(amount)) {
        resultDiv.textContent = "Enter a valid amount.";
        resultDiv.classList.remove("success-message");
        resultDiv.classList.add("error-message");
        return;
    }

    const query = `${apiUrl}/${fromcurrency}`;

    fetch(query)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const exchangeRate = data.conversion_rates[tocurrency];
            if (!exchangeRate) {
                resultDiv.textContent = `Conversion rate not available for ${tocurrency}`;
                resultDiv.classList.remove("success-message");
                resultDiv.classList.add("error-message");
                return;
            }

            const convertedAmount = amount * exchangeRate;
            resultDiv.textContent = `${amount} ${fromcurrency} = ${convertedAmount.toFixed(2)} ${tocurrency}`;
            resultDiv.classList.remove("error-message");
            resultDiv.classList.add("success-message");
        })
        
});