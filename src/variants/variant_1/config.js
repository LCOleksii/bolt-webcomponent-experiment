export const GLOBAL = "$__" + "_CNAME_" + "__";

export const MAX_TRIES = 10;

export const DISCONNECT_DELAY_MS = 10;

export let config = {
    observedProps: ['id', 'view', 'debug'],
    components: {
        "poc-component": {
            initialised: false,
            where: "beforebegin",
            view: "poc",
            target: () => {
                return document.querySelector(".example-target-element");
            },
            condition: function getTargetConditions(){
                return /leanconvert\.com/.test(location.host);
            }, 
        },
    }
}

export function getGLobal(){
    return window[GLOBAL]
}

window[GLOBAL] = window[GLOBAL] || config;