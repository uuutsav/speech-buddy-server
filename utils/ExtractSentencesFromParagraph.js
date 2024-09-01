// remove preceeding \n-s
function removePreceedingRturns(arr) {
    for (let i in arr) {
        let s = 0;
        while (arr[i][s] == '\n') {
            s++;
        }
        arr[i] = arr[i].substring(s).trim();
    }

    return arr;
}

export function extractSentences(str) {
    const dataArr = str.split('\n').filter(item => item.length > 5)

    return removePreceedingRturns(dataArr)
}
