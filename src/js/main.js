const burgerBtn = document.getElementById('burger-btn');
const burger = document.getElementById('burger');
const burgerOpen = document.getElementById('burger-open');
const burgerClose = document.getElementById('burger-close');
const navPopup = document.getElementById('nav-popup');

const headerInput = document.getElementById('header-input');
const searchBtn = document.getElementById('search-btn');
const searchClose = document.getElementById('search-close');

const popupClose = document.getElementById('popup-close');
const popupOpen = document.getElementById('popup-open');

const popup = document.getElementById('popup');

burgerBtn.addEventListener("click", function() {
  burger.style.display = 'none';
  burgerOpen.style.display = 'block';
  navPopup.style.transform = 'translateX(0)';
  navPopup.style.opacity = '1';
})

burgerClose.addEventListener("click", function() {
  burger.style.display = 'block';
  burgerOpen.style.display = 'none';
  navPopup.style.transform = 'translateX(-600px)';
  navPopup.style.opacity = '0';
})



searchBtn.addEventListener("click", function() {
  headerInput.style.transform = 'translateY(0)';
  headerInput.style.opacity = '1';
 // headerInput.style.display = 'block';
  searchBtn.style.display = 'none';
  searchClose.style.display = 'block';
});

searchClose.addEventListener("click", function() {
  headerInput.style.transform = 'translateY(-300px)';
  headerInput.style.opacity = '0';
 // headerInput.style.display = 'none';
  searchBtn.style.display = 'block';
  searchClose.style.display = 'none';
});








popupClose.addEventListener("click", function() {
  popup.style.transform = 'translateX(-414px)';
  popup.style.opacity = '0';
  popupOpen.style.opacity = '1';
  popupOpen.style.display = 'block';

})

popupOpen.addEventListener("click", function() {
  popup.style.transform = 'translateX(0)';
  popup.style.opacity = '1';
  popupOpen.style.opacity = '0';
  popupOpen.style.display = 'none';
})

const validation = new JustValidate('#form');

validation
  .addField('#name', [
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Email is required',
    },
    {
      rule: 'email',
      errorMessage: 'Email is invalid!',
    },
  ]);
