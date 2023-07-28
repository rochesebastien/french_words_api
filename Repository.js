const json = require('./words.json');

const dotenv = require('dotenv');
dotenv.config();


// word_day = ''
// day = ''
// list_day = []
// last_update = ''


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

async function getWordOfTheDay() {
  try {
    alert(process.env[WORD_TODAY])
    return process.env[WORD_TODAY] || "Non";
  } catch (error) {
    console.log(error);
  }
}

async function generateWordOfTheDay() {
  if (word_day == "") {
    word_day = await GetRandomWord()
  }
  word_day = word_day
  return word_day
}

async function getListOfTheDay() {
  try {
    return list_day;
  } catch (error) {
    console.log(error);
  }
}

async function generateListOfTheDay() {
  try {
    list_day = []
    for (let i = 0; i < 5; i++) {
      let previous = list_day[i-1] ? list_day[i-1] : ''
      let next = await this.GetRandomWord();
      console.log(next);
      if (previous != next) {
        list_day.push(next);
      }
    }
    list_day = list_day
    return list_day;
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

module.exports = {
  GetRandomWord,
  getListOfTheDay,
  getAllWords,
  getWordsOfLength,
  getWordOfTheDay,
  generateWordOfTheDay,
  generateListOfTheDay
}