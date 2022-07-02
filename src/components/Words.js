import wordBank from '../wordle-bank.txt';

export const boardDefault = [
    [" "," "," "," "," "],
    [" "," ",""," "," "],
    [" "," "," "," "," "],
    [" "," "," "," "," "],
    [" "," "," "," "," "],
];

export const generateWordSet = async () => {
    let wordSet;
    await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
        const wordArray = result.split("\n")
        wordSet = new Set(wordArray)
        console.log("generateWordSet has fired")
    });
    console.log("returning wordset")
    return {wordSet};
}