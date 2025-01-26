import { writable, get } from 'svelte/store';
import {getGLobal, STORE} from '../config';
import _ from 'lodash';

export const ACTIVE = "activeStore";
export const EVENTS = "eventsStore";

// local component store
let stores = {};
let global = getGLobal();

// shared filter
global[STORE] = global[STORE] || {};

const activeStore = getStore(ACTIVE) || writable({counter: 0, data: {},});
const eventStore = getStore(EVENTS) || writable({});

stores[ACTIVE] = activeStore;
global[STORE][ACTIVE] = global[STORE][ACTIVE] || stores[ACTIVE];

stores[EVENTS] = eventStore;
global[STORE][EVENTS] = global[STORE][EVENTS] || stores[EVENTS];

export function getStore(name){
    return global[STORE][name] || stores[name];
}

export function getStoreValue(name){
    let st = getStore(name);
    if(!st){
        return null;
    }

    return get(st);
}

export function update(name, key, updater){
    let val = getStoreValue(name);
    if(!val){
        return;
    }
    // merge
    updater = _.set(val, key, updater);
    console.log("Updater:", updater)
    return updater
}

export function set(storeName, key, val){
    let updater = update(storeName, key, val);
    stores[storeName].set(updater)
}

export function increment(storeName, key){
    if(!storeName || !key){
        return;
    }

    let val = getStoreValue(storeName);
    if(!val){
        return;
    }
    val[key] = val[key] || 0;

    let updater = update(storeName, key, val[key] + 1);

    stores[storeName].set(updater);
}

export function clearCounter(storeName, key){
    if(!storeName || !key){
        return;
    }
    let val = getStoreValue(storeName);
    if(!val){
        return;
    }

    let updater = update(storeName,key, 0);

    stores[storeName].set(updater)
}