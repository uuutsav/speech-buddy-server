import _ from "lodash";

let correctArr = []
let incorrectArr = []
let missedArr = []

export const compare = (generatedString, transcriptedString) => {
    const arrG = _.words(_.lowerCase(generatedString))
    const arrT = _.words(_.lowerCase(transcriptedString))

    correctArr = _.intersection(arrG, arrT);
    incorrectArr = _.difference(arrT, arrG);
    missedArr = _.difference(arrG, arrT);

    // TODO:- implement library logcs for now, precise manual logc for later versions
}

export { correctArr, incorrectArr, missedArr }