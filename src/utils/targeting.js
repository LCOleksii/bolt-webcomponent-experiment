export function conditionsReady(config, componentId){
    return checkCondition(config, componentId, "target") && checkCondition(config, componentId, "condition");
}

function checkCondition(config, componentId, condition){
    let settings = config.components[componentId];
    if(!settings){
        return false
    }
    let conditionResult = settings[condition]()
    return conditionResult;
}
