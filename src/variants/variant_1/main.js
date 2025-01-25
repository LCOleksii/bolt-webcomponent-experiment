import App from './App.svelte';
import {GLOBAL} from './config';
import {setRootElement} from '../../utils/dom';

// app registry
let globalSync = window[GLOBAL];

document.addEventListener("init", (e) => {
	let c = globalSync.components[e.detail.id];
	if(c && !c.initialised){
		c.initialised = true;
		c.app = initialiseApp(e.detail.id)
	}
});

function initialiseApp(cmpId) {
	if(!cmpId){
		return
	}

	var id = cmpId;
	var cmp = document.querySelector("#" + id);
	var root = cmp.shadowRoot;
	var props = getProps(id);

	setRootElement(root);

	root.addEventListener("update", (e) => {
		if(e.detail.id === id) {
			let c = globalSync.components[e.detail.id];
			c.app.$set(getProps(id))
		}
	})

	root.addEventListener("disconnect", (e) => {
		if(e.detail.id === id){
			let c = globalSync.components[e.detail.id];
			if(c && c.initialised){
				c.initialised = false;
			}
		}
	})

	return new App({
		props: props,
		target: root.querySelector("main")
	});

	function getProps(id){
		var cmp = document.querySelector("#" + id);
		var props = {};
		// copy attributes

		Object.keys(cmp.attributes).map(a => {
			props[cmp.attributes[a].name] = cmp.attributes[a].value;
		})

		props.data = cmp.data;
		return props;
	}

}

export default null;