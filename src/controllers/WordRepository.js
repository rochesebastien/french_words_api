const json = require('../data/words.json');

async function getAllWords() {
  try {
    return json.words;
  } catch (error) {
    console.log(error);
  }
}

async function GetRandomWord() {
  try {
    const random = Math.floor(Math.random() * json.words.length);
    return json.words[random];
  } catch (error) {
    console.log(error);
  }
}

async function GetRandomWordWLength(length) {
  try {
    const fil_words = await getWordsOfLength(length)
    const random = Math.floor(Math.random() * fil_words.length);
    return fil_words[random];
  } catch (error) {
    console.log(error);
  }
}


async function getWordsOfLength(len) {
  try {
    let length = len;
    let word_list = [];
    json.words.forEach(word => {
      if (word.length == length) {
        word_list.push(word);
      }
    });
    return word_list;

  } catch (error) {
    console.log(error);
  }
}

async function generateList(length) {
  let list_day = []
  for (let i = 0; i < length; i++) {
    let previous = list_day[i - 1] ? list_day[i - 1] : ''
    let next = await GetRandomWord();
    if (previous != next) {
      list_day.push(next);
    }
  }
  return list_day;
}

module.exports = {
  GetRandomWord,
  getAllWords,
  getWordsOfLength,
  generateList,
  GetRandomWordWLength
}