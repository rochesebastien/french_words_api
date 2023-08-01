const json = require('./data/words.json');
const fs = require('fs');
const fileName = './data/save.json';
const file = require(fileName);


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
    return file.day;
  } catch (error) {
    console.log(error);
  }
}

async function generateWordOfTheDay() {
  try {
    file.day = await GetRandomWord();
    updateJsonFile(file);
    return file.day;
  } catch (error) {
    return error;
  }
}

async function getListOfTheDay() {
  try {
    return file.suite_day;
  } catch (error) {
    console.log(error);
  }
}

async function generateListOfTheDay() {
  try {
    list_day = await generateList(5)
    file.suite_day = list_day;
    updateJsonFile(file);
    return file.suite_day;
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
    console.log(next);
    if (previous != next) {
      list_day.push(next);
    }
  }
  return list_day;
}

function updateJsonFile(data) {
  fs.writeFile(fileName, JSON.stringify(data), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(data));
    console.log('writing to ' + fileName);
  });
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