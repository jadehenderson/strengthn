import { writable } from "svelte/store";
import { jwt } from "./jwt";
import { userID } from "./userid"
import { get } from '../lib/api'

export const dash = writable({});

export const loadDash = async () => {
    try {
        let njwt;
        const unsubscribe = jwt.subscribe(value => {
            njwt = value;
        })

        const submit = await get('user/home', njwt);
        /*await fetch("https://stengthn.herokuapp.com/user/home", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "token": JSON.stringify(njwt)
            },
        });*/

        const data = await submit.json();
        const parsedData = JSON.parse(data);

        dash.set(parsedData);

        userID.set(parsedData.user[0].userid);

    } catch (err) {
        console.log(err)
    }
};



