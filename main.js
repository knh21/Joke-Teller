const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const textMsg = document.getElementById('textMsg');

// disable/enable button
function toggleButton() {
  button.disabled = !button.disabled;
  textMsg.style.display = 'none';
}

// passing Joke to VoiceRSS API
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20');
  VoiceRSS.speech({
    key: '3cb2bc9b24ce492c815db581f3142ab5',
    src: jokeString,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// get jokes from joke API
async function getJokes() {
  let joke = '';
  const apiURL =
    'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //text-to speech
    tellMe(joke);
    //disable button
    toggleButton();
    textMsg.textContent = joke;
    textMsg.style.display = 'flex';
  } catch (error) {
    console.log('error', error);
  }
}

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);