  const json = require('./words.json');

word_day ='test'
day = ''
list_day =''

setInterval(function() {
  word_day = GetRandomWord();
}, 1000 * 60); // intervalle de 24h exprimé en millisecondes

  async function getAllWords() {
    try {
        const random = Math.floor(Math.random() * json.words.length);
        console.log(json.words[random]);
        return json.words[random];
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

  async function getWordsOfLength(id) {
    try {
      let length = id;
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