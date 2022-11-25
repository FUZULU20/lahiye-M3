let Container = document.querySelector("main");
let inputFrom = document.querySelector(".input_from");
let inputTo = document.querySelector(".input_to");
let valutaParagraphFrom = document.querySelector(".fromRate");
let valutaParagraphTo = document.querySelector(".toRate");
let firstButton = document.querySelectorAll(".btn_first");
let from = "RUB"
let to = "USD"
eventListeners();
function eventListeners() {
  Container.addEventListener("click", handleValueta);
  inputFrom.addEventListener("keyup", getDataByFrom);
  inputTo.addEventListener("keyup", getDataByTo);
}

firstButton.forEach(x => x.setAttribute("style", "background: #833AE0;color:#fff"))

function handleValueta(e) {
  let targetSpace = e.target;
  // targetSpace.setAttribute("style", "background: #833AE0;color:#fff");
  Array.from(targetSpace.parentElement.children).forEach((x) => x.removeAttribute("style"));
  if (targetSpace.parentElement.className.indexOf("button1") !== -1) {
    targetSpace.setAttribute("style", "background: #833AE0;color:#fff");
    from = targetSpace.textContent;
    getDataByFrom();
  } else if (targetSpace.parentElement.className.indexOf("button2") !== -1) {
    targetSpace.setAttribute("style", "background: #833AE0;color:#fff");
    to = targetSpace.textContent;
    getDataByFrom();
  }
}

async function getDataByFrom() {
  const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
  const data = await res.json();
  inputTo.value = (Object.values(data.rates)[0] * inputFrom.value).toFixed(5);
  if (from && to) {
    valutaParagraphFrom.textContent = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(2)} ${Object.keys(data.rates)}`;
    valutaParagraphTo.textContent = `1 ${Object.keys(data.rates)} = ${(1 / Object.values(data.rates)[0]).toFixed(5)} ${data.base}`;
  }
}
async function getDataByTo() {
  const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
  const data = await res.json();
  inputFrom.value = (inputTo.value / Object.values(data.rates)[0]).toFixed(2);
}
