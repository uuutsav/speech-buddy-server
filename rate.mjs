import _ from "lodash";

// const a = "Hello, my name is Utsav!"
// const b = " my name utsav bruh"

let correctArr = []
let incorrectArr = []
let missedArr = []

export const compare = (generatedString, transcriptedString) => {
    const arrG = _.words(_.lowerCase(generatedString))
    const arrT = _.words(_.lowerCase(transcriptedString))

    correctArr = _.intersection(arrG, arrT);
    incorrectArr = _.difference(arrT, arrG);
    missedArr = _.difference(arrG, arrT);

    // console.log(correctArr)
    // console.log(incorrectArr)
    // console.log(missedArr)

    /* mkc, implement library logcs for now, precise manual logc for later versions

    const minIndex = 0;
    const maxIndex = bb.length -1;
    
    let j = 0;

    for (let i = 0; i < aa.length ; i++){
        if ((i-2) < minIndex){
            j = minIndex;
        } else {
            j = i-3;
        }
        _.slice(bb, j, j+4).includes(aa[i]);
    }
    */

}

// compare(a, b);
export { correctArr, incorrectArr, missedArr }