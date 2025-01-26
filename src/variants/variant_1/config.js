/*<MOD id="imports"> add other imports that can can be used in "MOD#components" block */
/*</MOD>*/

export const GLOBAL = "$__" + "_CNAME_" + "__";

export const MAX_TRIES = 10;

export const DISCONNECT_DELAY_MS = 10;

export let config = {
    observedProps: ['id', 'view', 'debug'],
    components: {
        /*<MOD id="components"> add other imports that can can be used in "MOD#render-handlers" block */ 
        "example-component": {
            initialised: false,
            where: "beforebegin",
            view: "example",
            target: () => {
                return document.querySelector(".example-target-element");
            },
            condition: function getTargetConditions(){
                return /localhost/.test(location.host);
            }, 
        },
        /*</MOD>*/

    }
}

export function getGLobal(){
    return window[GLOBAL]
}

window[GLOBAL] = window[GLOBAL] || config;