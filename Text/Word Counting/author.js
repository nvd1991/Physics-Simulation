const Author = function(){
    function Author(name, works){
        this.name = name;
        this.works = works;
        this.dictionaryOfWordFrequency = {
            all:{}
        };
        this.vocabulary = new Set();
        this.loaded = false;
    }

    Author.prototype.loadWorks = function(){
        const that = this;
        const promises = [];
        for(let work of this.works){           
            const promise = new Promise(function(resolve, reject){
                loadStrings('../../Resources/Text/' + work + '.txt', function(result) {
                    that.dictionaryOfWordFrequency[work] = wordFrequency.wordFrequencyCount(result);    
                    resolve();            
                });
            });
            promises.push(promise);            
        }        
        Promise.all(promises).then(function() {                     
            for(let work in that.dictionaryOfWordFrequency){
                const keys = Object.keys(that.dictionaryOfWordFrequency[work]);
                for(let key of keys){
                    that.vocabulary.add(key);
                    if(!that.dictionaryOfWordFrequency.all.hasOwnProperty(key)){
                        that.dictionaryOfWordFrequency.all[key] = that.dictionaryOfWordFrequency[work][key];
                    } else {
                        that.dictionaryOfWordFrequency.all[key] += that.dictionaryOfWordFrequency[work][key];
                    }                   
                }
            }
            that.loaded = true;
        });
    }

    return Author;
}();