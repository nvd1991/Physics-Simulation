const wordFrequency = function () {
    const nonWordPattern = /\W+/;
    const nonDigitPattern = /\D+/;
    
    function wordFrequencyCount(result) {
        // split using non-word as delimiter
        let tokens = result.join("\n").split(nonWordPattern);
        const list = tokens.reduce(function (previousList, currentToken) {
            // do not count number
            if (nonDigitPattern.test(currentToken)) {
                // count lower + uppercase
                currentToken = currentToken.toLowerCase();
                if (!previousList.hasOwnProperty(currentToken)) {
                    previousList[currentToken] = 1;
                } else {
                    previousList[currentToken] += 1;
                }
            }
            return previousList;
        }, {});
        tokens = null;
        return list;
    }

    function sortList(list) {
        // to generate an array of ordered frequency
        const array = Object.entries(list);
        array.sort(function (a, b) {
            return b[1] - a[1];
        });
        return array;
    }

    return {
        wordFrequencyCount: wordFrequencyCount,
        sortList: sortList
    }
}();