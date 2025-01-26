import {ClassWatcher} from "../../utils/classwatcher.js"
import {wait} from "../../utils/common.js"

import styles from "../../../public/_VARIANT_/build/bundle.css"
import script from "../../../public/_VARIANT_/build/bundle.js"
import globalStyles from "./global.css"
import {config} from "./config.js"
import {getCustomElement, connectAll} from "../../utils/customElement";

var COMPONENT = "_CNAME_";

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
    new ClassWatcher(document.body, "example-ready", () => {
        connectAll(config);
    }, () => {}) 
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