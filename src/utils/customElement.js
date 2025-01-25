import {wait} from './common';

const COMPONENT = "_CNAME_";
const isDebug = /lc-dev=1/i.test(document.cookie);

import {conditionsReady} from './targeting';


export function getCustomElement(opts){
    let styles = opts.styles;
    let script = opts.script;
    let _config = opts.config;

    let props = _config.observedProps;
    let onConnected = opts.onConnected;

    class Webcomponent extends HTMLElement {
        constructor() {
            super();
            this._data = null;
        }

        static get observedAttributes() {
            return props;
        }

        // connect component
        connectedCallback() {
            if(this.initialized){
                return
            }

            let id = this.id;
            let view = this.getAttribute("view");

            this.attachShadow({mode: 'open'});
            let widgetWrapper = document.createElement('main');
            let styleWrapper = document.createElement('style');
            let scriptWrapper = document.createElement('script');

            styleWrapper.innerHTML = styles;
            scriptWrapper.innerHTML = script;
            widgetWrapper.className = view;

            this.shadowRoot.appendChild(widgetWrapper);
            this.shadowRoot.appendChild(styleWrapper);
            this.shadowRoot.appendChild(scriptWrapper);

            document.dispatchEvent(
                new CustomEvent("init", {detail: {"id": id}})
            );
            this.initialized = true;
            
            // global app connect
            if(onConnected){
                onConnected();
            }

            // local component connect
            if (this.config.components[id] &&
                this.config.components[id].watch
            ){
                this.config.components[id].watch(() => {
                    connect(this.config, id)
                })
            }
        }

        disconnectedCallback(){
            let id = this.id;
            this.shadowRoot && this.shadowRoot.dispatchEvent(new CustomEvent("disconnect", {detail: {"id": id}}));
        }

        attributeChangedCallback(attr){
            let id = this.id;
            this.shadowRoot && this.shadowRoot.dispatchEvent(new CustomEvent("update", {detail: {"id": id}}));
        }
        
        get config() {
            return _config;
        }

        get data() {
            return this._data;
        }

        set data(d) {
            let id = this.id;
            this._data = d;
            // set app props
            this.shadowRoot && this.shadowRoot.dispatchEvent(
                new CustomEvent("update", {detail: {"id": id}}));
        }
    }
    return Webcomponent;
}

export function connect(config, id) {
    let component = config.components[id];
    if(!component){
        return
    }

    let componentElement = document.getElementById(id);

    // check rendered once;
    if(!!componentElement){
        return
    }

    let targetElement = component.target();
    if(targetElement){
        targetElement.insertAdjacentHTML(component.where,
            '<' + COMPONENT+' id="'+ id +'" view="'+ component.view +'" debug="' + (isDebug ? "true":"") +'"/>'
        );
        return
    }
}

export function connectAll(config){
    Object.keys(config.components).forEach((k) => {
        wait(() => conditionsReady(config, k), 10000, () => {
            connect(config, k)
        })
    });
}
