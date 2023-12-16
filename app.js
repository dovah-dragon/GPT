
const submitButton = document.getElementById('submit');
const API_KEY = '';

const outBox = document.querySelector('#output');
const inBox = document.querySelector('.send_msg');
const historyElement = document.querySelector('.history');
const newChatBtn = document.querySelector('.side-bar__btn1');

async function getMessage() {


    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages : [{role : "user", content: inBox.value}],
            max_tokens : 50
          }),
      };



    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        console.log(data.choices[0].message.content);
        outBox.textContent = data.choices[0].message.content;
        if (data.choices[0].message.content){
            const pElement = document.createElement('p');
            pElement.textContent = inBox.value;
            historyElement.append(pElement);
        }
    } catch (error){
        console.error(error);
    }
}

submitButton.addEventListener('click', getMessage);

function clearChat() {
    inBox.value = "";
    outBox.textContent = "";
}

newChatBtn.addEventListener('click', clearChat);
