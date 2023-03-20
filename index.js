function closeOnClick() {
    console.log('orderOnClick');
    const navItem = document.querySelectorAll('.nav-item');
    const collapseMenu = document.querySelector('.navbar-toggler');
    const collapseShow = document.querySelector('.navbar-collapse');
    navItem.forEach((item => item.addEventListener('click', () => {
        collapseMenu.classList.toggle('collapsed');
        collapseShow.classList.toggle('show');
    })));
}
function saveData() {
    const formData = {
        name: document.getElementById('orderName').value,
        email: document.getElementById('orderEmail').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        country: document.getElementById('orderCountry').value,
        card: document.querySelector("input[name=paymentCard]:checked").value,
        sms: document.getElementById('sms-tracking').checked
    }
    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem('orderData', formDataJSON);
    console.log(localStorage.getItem('orderData'));
}

function getData() {
    const formDataJSON = localStorage.getItem('orderData');
    if (formDataJSON) {
        const data = JSON.parse(formDataJSON);
        document.getElementById('orderName').value = data.name;
        document.getElementById('orderEmail').value = data.email;
        document.getElementById('phoneNumber').value = data.phoneNumber;
        document.getElementById('orderCountry').value = data.country;
        data.card === "visa" ? document.getElementById('visa').checked = true
            : document.getElementById('mastercard').checked = true;
        if (!document.getElementById('sms-tracking').checked) document.getElementById('sms-tracking').checked = false;
    }
}
function orderDetail(val){
    if(val === 20) {
        fetch('sub20.txt')
            .then(response => response.text())
            .then(data => document.querySelector('.order-info').innerHTML = data)
            .catch(error => console.error(error));
    }
    else{
        fetch('sub30.txt')
            .then(response => response.text())
            .then(data => document.querySelector('.order-info').innerHTML = data)
            .catch(error => console.error(error));
    }
    getData();
}
function orderOnClick(){
    const subButton20 = document.getElementById('subscription-20');
    const subButton30 = document.getElementById('subscription-30');
    subButton20.addEventListener('click',()=>{
        orderDetail(20);
    });
    subButton30.addEventListener('click',() => {
        orderDetail(30);
    });

}
function orderValidation(){
    const nameRegex = /[a-zA-z]+/;
    const ccvRegex = /^[0-9]{3}$/;
    const emailRegex = /^\S+@\S+\.\S+$/
    const numberRegex = /\d+/;

    let check = true;
    const name = document.getElementById('orderName');
    const email = document.getElementById('orderEmail');
    const number = document.getElementById('phoneNumber');
    const ccv = document.getElementById('orderCCV');
    const card = document.getElementById('cardID');

    if(!nameRegex.test(name.value)) {name.setCustomValidity('Incorrect Name'); check=false;}
    if(!ccvRegex.test(ccv.value)) {ccv.setCustomValidity('Incorrect CCV');  check=false;}
    if(!emailRegex.test(email.value)) {email.setCustomValidity('Incorrect Email');  check=false;}
    if(!numberRegex.test(number.value)) {number.setCustomValidity('Incorrect Phone Number');  check=false;}
    if(!numberRegex.test(card.value)){card.setCustomValidity('Incorrect Card Number');  check=false;}
    return check === true;

}
orderOnClick();
closeOnClick();

AOS.init({
    duration: 1200
});