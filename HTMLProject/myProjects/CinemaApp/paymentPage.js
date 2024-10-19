
totalPrice = model.inputs.orderpage.totalPrice
console.log(totalPrice);
function updateViewPaymentPage() {
    model.app.currentPage = 'paymentPage';
    const movieId = model.inputs.search.movieId;
    document.getElementById('app').innerHTML = /*HTML*/`
    <h1>Payment Process</h1>
    <div id= "payment" style= 'flex-direction:column;  flex 1; flex-direction: row; justify-content: center; align-content: center; margin: auto; border-radius:40px; background-color: rgba(255, 255, 255, 0.3);'>
    <h2>Card Details</h2>
    Name on your card<br><input id="cardHoldername" placeholder="write your first name" oninput="model.inputs.paymentPage.cardHoldername = this.value"><br>
    Surname on your card<br><input id="cardHolderSurname" placeholder="write your surname" oninput="model.inputs.paymentPage.cardHolderSurname = this.value"><br>
    Bank Card Details<br><input id="bankCardDetails" placeholder="type your card number" oninput="model.inputs.paymentPage.bankCardDetails = this.value"><br>
    Secret Code<br><input id="secretCode" placeholder="type three digits" oninput="model.inputs.paymentPage.secretCode = this.value"><br>
    Total Amount: ${totalPrice}<br>
    Payment Process...

    </div>
    `; 
}