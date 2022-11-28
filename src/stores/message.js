import { writable } from "svelte/store";
import { jwt } from "./jwt";
import { get } from '../lib/api'

export const messages = writable([]);

export const loadMessages = async () => {
    try {
        let njwt;
        const unsubscribe = jwt.subscribe(value => {
            njwt = value;
        })

        const submit = await get('user/messages', njwt);
        /*await fetch("https://stengthn.herokuapp.com/user/messages", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "token": JSON.stringify(njwt)
            },
        });*/

        const data = await submit.json();
        messages.set(data);
        


    } catch (err) {
        console.log(err)
    }
};



