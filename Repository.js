const json = require('./words.json');
const today = require('./today.json');
const fs = require('fs');


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
    return today.day;
  } catch (error) {
    console.log(error);
  }
}

async function generateWordOfTheDay() {


  // Lire le contenu du fichier JSON
  fs.readFile('today.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier :', err);
    } else {
      try {
        // Convertir le contenu du fichier en objet JavaScript
        const jsonData = JSON.parse(data);
  
        // Mettre à jour la valeur de "suite_day"
        jsonData.suite_day = ['kk', 'kk new'];
  
        // Convertir l'objet mis à jour en JSON (chaîne de caractères JSON)
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
  
        // Écrire le JSON mis à jour dans le fichier
        fs.writeFile('today.json', updatedJsonData, (err) => {
          if (err) {
            console.error('Erreur lors de l\'écriture du fichier :', err);
          } else {
            console.log('Le fichier today.json a été mis à jour avec succès !');
          }
        });
        return today.suite_day;
      } catch (parseError) {
        console.error('Erreur lors de l\'analyse du fichier JSON :', parseError);
      }
    }
  });
  
}

async function getListOfTheDay() {
  try {
    return today.suite_day;
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