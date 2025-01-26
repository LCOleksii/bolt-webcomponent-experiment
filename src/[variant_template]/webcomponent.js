/*<MOD id="imports"> add other imports that can can be used in "MOD#render-handlers" block */ 
import {ClassWatcher} from "../../utils/classwatcher.js"
import {wait} from "../../utils/common.js"
/*</MOD>*/

/*<DO_NOT_MODIFY>*/
import styles from "../../../public/_VARIANT_/build/bundle.css"
import script from "../../../public/_VARIANT_/build/bundle.js"
import globalStyles from "./global.css"
import {config} from "./config.js"
import {getCustomElement, connectAll} from "../../utils/customElement";

var COMPONENT = "_CNAME_";
/*</DO_NOT_MODIFY>*/
/*<DO_NOT_MODIFY>*/
function addGlobalCss() {
    let id = COMPONENT + "-global-styles";
    if(document.getElementById(id)){
        return
    }
    let root = document.body;
    var style = document.createElement("style");
    style.id = id;
    style.innerHTML = globalStyles;
    root.appendChild(style);
}

function render(){
    const customElement = getCustomElement({
        config: config,
        styles: styles,
        script: script,
        onConnected: addGlobalCss,
    });

    // define custom element
    customElements.define(COMPONENT, customElement);
/*</DO_NOT_MODIFY>*/
/*<MOD id="render-handlers">*/ 
    new ClassWatcher(document.body, "example-ready", () => {
        connectAll(config);
    }, () => {}) 
/*</MOD>*/    
/*<DO_NOT_MODIFY>*/
}
function dev() {
    window[COMPONENT + "-dev"] = true;
    const VARIANT = "_VARIANT_";
    const HOST = "localhost";
    const PORT = "9292";
    
    let s = document.createElement("script");
    s.src ="http://"+ HOST +":"+ PORT +"/"+ VARIANT +"/webcomponent.js";
    document.body.appendChild(s);
}

wait(()=>document.body, 3000, ()=>{
    // register component
    if(/lc-dev=1/i.test(document.cookie) && !window[COMPONENT + "-dev"]){
        dev();
    } else {
        render();
    }
})
/*<DO_NOT_MODIFY>*/