const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];
let audio = new Audio();

// Configura volume inicial
audio.volume = 0.5;

const playTune = (key) => {
  const audioPath = `./src/tunes/${key}.wav`;
  console.log("Tentando reproduzir:", audioPath);

  audio.src = audioPath;
  audio.play().catch((err) => console.error("Erro ao tocar áudio:", err));

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  if (clickedKey) {
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);
  }
};

pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
  if (mapedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

const handleVolume = (e) => {
  const volume = e.target.value / 100; // Normaliza o volume para [0, 1]
  audio.volume = volume;
  console.log("Volume ajustado para:", volume);
};

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

volumeSlider.addEventListener("input", handleVolume);
keysCheck.addEventListener("click", showHideKeys);
