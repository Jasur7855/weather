import "./style.scss";
import data from "./data";

interface WeatherData{
  bgImg: string,
      icon: string,
      sound: string,
      pauseImg:string,
}

// Elements
const heading:HTMLHeadElement = document.createElement("h1");
const weatherContainer:HTMLDivElement = document.createElement("div");
const musicInput:HTMLInputElement = document.createElement("input");
const audioElement:HTMLAudioElement = new Audio();
audioElement.loop = true;

// Add child in body
document.body.appendChild(heading);
document.body.appendChild(weatherContainer);
document.body.appendChild(musicInput);
document.body.appendChild(audioElement);

// Child options
heading.textContent = "Weather Sound";
weatherContainer.classList.add("weatherContainer");

musicInput.type = "range";
musicInput.min = "0";
musicInput.max= "100";
musicInput.value = "100";

function renderItem(elem:WeatherData) {
  const child = document.createElement("div");
  child.classList.add("weather");
  child.setAttribute("data-music-status", "pause");
  child.setAttribute("data-icon", elem.icon);
  child.setAttribute("data-bgImg", elem.bgImg);
  child.setAttribute("data-sound", elem.sound);

  const img = document.createElement("img");
  img.src = elem.pauseImg;
  img.alt = "Weather background";

  child.style.backgroundImage = `url(${elem.bgImg})`;
  child.appendChild(img);
  weatherContainer.appendChild(child);
}

weatherContainer.addEventListener("click",clickWeatherButton );

function clickWeatherButton(event:MouseEvent):void  {
  let target = event.target as HTMLElement;
  weatherContainer.querySelectorAll<HTMLImageElement>(".weather img").forEach((elem)=>{
    elem.src = data[0].pauseImg
  })
  // Проверяем, что клик был по элементу с классом weather
  while (target && !target.classList.contains("weather")) {
    target = target.parentElement as HTMLElement;
  }
  if (!target) return;

  const musicStatus = target.getAttribute("data-music-status");

  if (musicStatus === "play") {
    audioElement.pause();
    target.setAttribute("data-music-status", "pause");
    const img = target.querySelector("img");
    if (img) img.src = data[0].pauseImg;
  } else if (musicStatus === "pause") {
    // Сброс состояния всех элементов
    const allChildren = weatherContainer.querySelectorAll(".weather");
    allChildren.forEach((childElement) => {
      childElement.setAttribute("data-music-status", "pause");
      const img = childElement.querySelector("img");
      if (img) img.src = data[0].pauseImg
    });

    // Устанавливаем новый фон и звук
    document.body.style.backgroundImage = `url(${target.getAttribute(
      "data-bgImg"
    )})`;
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.src = target.getAttribute("data-sound");
    audioElement.play();

    target.setAttribute("data-music-status", "play");
    const img = target.querySelector("img");
    if (img) img.src = target.getAttribute("data-icon");
  }
}

// Настройка громкости через слайдер
musicInput.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  const volume = Number(target.value) / 100;
  audioElement.volume = volume;
});

// Рендерим элементы
data.forEach((elem) => {
  renderItem(elem);
});


