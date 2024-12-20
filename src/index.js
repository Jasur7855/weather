// Elements
const heading = document.createElement("h1");
const weatherContainer = document.createElement("div");
const musicInput = document.createElement("input");
const audioElement = document.createElement("audio");

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

let weather = [
  {
    bgImg: "../public/assets/summer-bg.jpg",
    icon: "../public/assets/icons/sun.svg",
    sound: "../public/assets/sounds/summer.mp3",
  },
  {
    bgImg: "../public/assets/rainy-bg.jpg",
    icon: "../public/assets/icons/cloud-rain.svg",
    sound: "../public/assets/sounds/rain.mp3",
  },
  {
    bgImg: "../public/assets/winter-bg.jpg",
    icon: "../public/assets/icons/cloud-snow.svg",
    sound: "../public/assets/sounds/winter.mp3",
  },
];

for (let i = 0; i < weather.length; i++) {
  renderItem(weather[i]);
}

function renderItem(elem) {
    const child = document.createElement("div");
    child.setAttribute("data-musick", "pause");
    const img = document.createElement("img");
    child.classList.add("weather");
    child.style.backgroundImage = `url(${elem.bgImg})`;
  
    img.src = elem.icon;
    img.alt = "Weather background";
  
   
    child.addEventListener("click", () => {
      const musickStatus = child.getAttribute("data-musick"); 
      if (musickStatus === "pause") {
        audioElement.src = elem.sound;
        audioElement.play();
        child.setAttribute("data-musick", "play");
      } else {
        audioElement.pause();
        child.setAttribute("data-musick", "pause");
      }
    });
  
    child.appendChild(img);
    weatherContainer.appendChild(child);
  }
  
// Устанавливаем громкость звука в зависимости от значения слайдера
musicInput.addEventListener("input", (event) => {
  const volume = event.target.value / 100;
  audioElement.volume = volume;
});
