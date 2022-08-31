const formButton = document.querySelector(`.formButton`);
const response = document.querySelector(`.response`);
localStorage.clear();
const Preventing = (e) => {
  e.preventDefault();
  let username = document.querySelector(`#username`);
  let password = document.querySelector(`#password`);

  const Run = async () => {
    // Checking for values in the input field
    if (!username.value || !password.value) {
      response.style.display = `block`;
      response.style.color = `red`;
      response.innerHTML = `kindly Input all field!`;
    } else {
      const token = await fetch(`/login`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username.value,
          password: password.value,
        }),
      });

      const { Message } = await token.json();
      // checking for response received from server
      if (
        Message === `Internal Server Error, data sent, but unable to process`
      ) {
        setTimeout(() => {
          response.style.display = `block`;
          response.style.color = `red`;
          response.innerHTML = Message;
        }, 10);
        username.value = ``;
        password.value = ``;
        setTimeout(() => {
          response.style.display = `none`;
        }, 4000);
      } else {
        setTimeout(() => {
          response.style.display = `block`;
          response.style.color = `green`;
          response.innerHTML = `Data Sent succesfully`;
        }, 10);
        username.value = ``;
        password.value = ``;
        const divFp = document.querySelector(`.divFp`);
        divFp.innerHTML = `Token Present`;
        divFp.style.color = `green`;
        localStorage.setItem(`token`, Message);
        setTimeout(() => {
          response.style.display = `none`;
        }, 3000);
      }
    }
  };
  Run();
};

formButton.addEventListener(`click`, Preventing);

// DASHBOARD SCRIPT

const divButton = document.querySelector(`.divButton`);

const getData = async () => {
  const token = localStorage.getItem(`token`);
  const responseObject = await fetch(`/dashboard`, {
    method: `GET`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data } = await responseObject.json();
  const section = document.querySelector(`.section`);
  if (
    data ===
    `Cannot access route, request lacks valid authentication credentials`
  ) {
    return (section.innerHTML = `${data}`), (section.style.color = `red`);
  }
  section.style.color = `green`;
  section.innerHTML = data;
};

divButton.addEventListener(`click`, getData);
