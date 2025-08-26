document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const buttonDraw = document.querySelector(".button-draw");
  const divRandomNumber = document.querySelector(".container-random-number");
  const contentInputs = document.querySelectorAll(
    ".content-input, .button-repeat"
  );
  const H2text = document.querySelector("h2");
  const ptext = document.querySelector(".p-dinamic");

  if (buttonDraw.textContent.includes("NOVAMENTE")) {
    contentInputs.forEach((item) => (item.style.display = "flex"));
    H2text.textContent = "QUERO SORTEAR:";
    ptext.textContent =
      'defina o intervalo e a quantidade de números, clique em "Sortear" e veja os resultados na tela. É rápido e fácil!';
    divRandomNumber.innerHTML = "";
    buttonDraw.innerHTML = `SORTEAR <img src="assets/icons/arrow.svg" alt="flecha" />`;
    ptext.style.textAlign = "start";
    H2text.style.textAlign = "start";
    return;
  }

  const quantityOfNumbers = Number(event.target.quantityOfNumbers.value); // convertido para number
  const fromNumber = Number(event.target.fromNumber.value);
  const untilNumber = Number(event.target.untilNumber.value);
  const noRepeatNumber = event.target.noRepeatNumber.checked; //true ou false

  const interval = untilNumber - fromNumber + 1; //numeros entre 2 intervalos (5, 10 = 6)

  if (noRepeatNumber) {
    // se pode ou não repetir os numeros aleatórios gerados
    if (interval < quantityOfNumbers) {
      const warning = document.querySelector(".warning");
      warning.style.display = "flex";

      setTimeout(() => {
        warning.style.display = "none";
      }, 2000);

      return;
    }
  }

  const numbers = [];

  while (numbers.length < quantityOfNumbers) {
    const randomNumber = Math.floor(
      Math.random() * (untilNumber - fromNumber + 1) + fromNumber
    );

    if (noRepeatNumber) {
      if (numbers.includes(randomNumber) === false) {
        numbers.push(randomNumber);
      }
    } else {
      numbers.push(randomNumber);
    }
  }

  contentInputs.forEach((input) => (input.style.display = "none"));

  numbers.forEach((num) => {
    const numberRamdom = document.createElement("span"); // cria a tag
    numberRamdom.textContent = num; // adiciona o numero na tag
    divRandomNumber.appendChild(numberRamdom); // adiciona a tag no container-ramdom-number
  });

  H2text.textContent = "Resultado do sorteio";
  H2text.style.textAlign = "center";

  ptext.textContent = "RESULTADO";
  ptext.style.textAlign = "center";

  buttonDraw.innerHTML = `
    SORTEAR NOVAMENTE
    <img src="assets/icons/replay.svg" alt="botão de replay" />
  `;
});

const contentInputs = document.querySelectorAll(".content-input");

contentInputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  });
});
