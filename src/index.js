import "./style.scss";
import data from "./data.js";

// Elements
const heading = document.createElement("h1");
const weatherContainer = document.createElement("div");
const musicInput = document.createElement("input");
const audioElement = new Audio();  
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
musicInput.min = 0;
musicInput.max = 100;
musicInput.value = 100;

function renderItem(elem) {
  const child = document.createElement("div");
  child.setAttribute("data-music", "pause");
  const img = document.createElement("img");
  child.classList.add("weather");
  child.style.backgroundImage = `url(${elem.bgImg})`;
  img.src = `${elem.pauseImg}`;
  img.alt = "Weather background";

  child.addEventListener("click", () => {
    // Сначала сбрасываем состояние всех элементов на pause
    const allChildren = weatherContainer.querySelectorAll(".weather");
    allChildren.forEach((childElement) => {
      childElement.setAttribute("data-music", "pause");
      childElement.querySelector("img").src = `${elem.pauseImg}`;
    });

    // Устанавливаем фон и ставим текущий элемент в состояние play
    document.body.style.backgroundImage = `url(${elem.bgImg})`;

    const musicStatus = child.getAttribute("data-music");
    if (musicStatus === "pause") {
      // Прекращаем воспроизведение предыдущей музыки
      audioElement.pause();
      audioElement.currentTime = 0; // Сбрасываем воспроизведение

      // Загружаем и воспроизводим новый звук
      audioElement.src = elem.sound;
      audioElement.play();

      // Обновляем состояние элемента
      child.setAttribute("data-music", "play");
      img.src = elem.icon; 
    } else {
      audioElement.pause();
      child.setAttribute("data-music", "pause");
      img.src = `${elem.pauseImg}`;
    }
  });

  child.appendChild(img);
  weatherContainer.appendChild(child);
}

// Настройка громкости через слайдер
musicInput.addEventListener("input", (event) => {
  const volume = event.target.value / 100;
  audioElement.volume = volume;
});

// Рендерим элементы
data.forEach((elem) => {
  renderItem(elem);
});
