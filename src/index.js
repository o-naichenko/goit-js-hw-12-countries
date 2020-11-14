import fetchCountries from "./fetchCountries.js";
import countriesListMarkup from "./tpl/countriesList.hbs";
import oneCountryMarkup from "./tpl/oneCountry.hbs";

// import {
//   alert,
//   defaultModules,
// } from "node_modules/@pnotify/core/dist/PNotify.js";
// import * as PNotifyMobile from "./node_modules/@pnotify/mobile/dist/PNotifyMobile.js";
const Handlebars = require("handlebars");
const debounce = require("lodash.debounce");
import "./styles.css";
import "./index.html";

let countriesArray = [];
const inputRef = document.querySelector(".form__input");
const resultContainerRef = document.querySelector(".stats-container");
console.dir(resultContainerRef);

// const myAlert = alert({
//   text: "I'm an alert.",
//   type: "info",
// });

inputRef.addEventListener("input", debounce(onInputRefInput, 500));

function onInputRefInput(e) {
  e.preventDefault();
  let name = e.target.value;
  if (e.target.value.length >= 1) {
    fetchCountries(name).then(renderEngine);
  }
}

function renderEngine(array) {
  if (array.length > 10) {
    // myAlert();
  } else if (array.length > 2 && array.length <= 10) {
    // countriesListMarkup(array);
    resultContainerRef.innerHTML = countriesListMarkup(array);
  } else {
    resultContainerRef.innerHTML = oneCountryMarkup(...array);

    const cntr = array[0];
    console.log(cntr.flag);
  }
}
