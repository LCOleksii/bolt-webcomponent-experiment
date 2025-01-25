export let root = document;

export function setRootElement(el){
    root = el || document;
}

export function getRootElement(){
    return root;
}

export function setRootProperties(name, data){
    try{
        root[name] = data;
        return null
    } catch (e) {
        return e
    }
}
