export function wait(condition, timeout, success){
    var DEFAULT_TIMEOUT = 3000;
    return new Promise((resolve, reject) => {
        let conditionResults = condition();
        if(conditionResults){
            resolve(conditionResults)
        } else {
            let int = setInterval(() => {
                conditionResults = condition();
                if(conditionResults){
                    resolve(conditionResults)
                    clearInterval(int);
                }
            }, 10);
            setTimeout(() => {
                clearInterval(int);
                reject('wait timeout in:', timeout || DEFAULT_TIMEOUT);
            }, timeout || DEFAULT_TIMEOUT);
        }
    }).then((result) => {
        if(success){success(result)}
        return result;
    }).catch(err => {console.warn(err)})
}