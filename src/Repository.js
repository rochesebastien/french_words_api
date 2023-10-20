  const json = require('./data/words.json');

word_day =''
day = ''
list_day =''
last_update =''

setInterval(function() {
  word_day = GetRandomWord();
}, 12 * 60 * 60 * 1000); // 12 heures * 60 minutes * 60 secondes * 1000 millisecondes

  async function getAllWords() {
    try {
        return json.words;
      } catch(error) {
      console.log(error);
      }
  }

  async function GetRandomWord() {
      try {
          const random = Math.floor(Math.random() * json.words.length);
          return json.words[random];
        } catch(error) {
        console.log(error);
        }
  }

  async function getWordOfTheDay() {
    return word_day
  }

  async function getListOfTheDayWords() {
    try {
      for (let i = 0; i < 5; i++) {
        let previous = ""
        let next  = GetRandomWord();
        if(previous != next) {
          list_day.push(next);
        }
      }
        return day_list;
      } catch(error) {
      console.log(error);
      }
  }

  async function getWordsOfLength(len) {
    try {
      let length = len;
      let word_list = [];
      json.words.forEach(word => {
        if(word.length == length) {
          word_list.push(word);
        }
      });
      return word_list;

      } catch(error) {
      console.log(error);
      }
  }

  module.exports = {
    GetRandomWord,
    getListOfTheDayWords,
    getAllWords,
    getWordsOfLength,
    getWordOfTheDay
  }