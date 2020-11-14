import fetchCountries from "./fetchCountries.js";
import countriesListMarkup from "./tpl/countriesList.hbs";
import oneCountryMarkup from "./tpl/oneCountry.hbs";

import { error, notice } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const Handlebars = require("handlebars");
const debounce = require("lodash.debounce");
import "./styles.css";
import "./index.html";

const inputRef = document.querySelector(".form__input");
const resultContainerRef = document.querySelector(".stats-container");
const dataListRef = document.getElementById("datalist");
let countryInfo = [];

inputRef.addEventListener("input", debounce(onInputRefInput, 500));

function onInputRefInput(e) {
  e.preventDefault();
  let name = e.target.value;
  if (e.target.value.length >= 1) {
    fetchCountries(name).then(renderEngine);
  }
}

function renderEngine(response) {
  checkResponse(response);
  dataListRef.innerHTML = "";
  resultContainerRef.innerHTML = "";

  if (countryInfo.length >= 2 && countryInfo.length <= 10) {
    dataListRef.innerHTML = countriesListMarkup(countryInfo);
  } else if (countryInfo.length > 10) {
    error({
      text: "Too many maches found. Please, make more specific query",
      delay: 1500,
      fade: true,
    });
  } else {
    resultContainerRef.innerHTML = oneCountryMarkup(...countryInfo);
  }
}

function checkResponse(data) {
  if (data.length > 0) {
    countryInfo = data;
  } else {
    error({
      text: "Please, try another combination",
      delay: 1500,
    });
  }
}
