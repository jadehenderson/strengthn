import { writable } from "svelte/store";
import { jwt } from "./jwt";
import { get } from '../lib/api'

export const groupsStore = writable({});

export const loadGroupsStore = async () => {


    let njwt;
    const unsubscribe = jwt.subscribe(value => {
        njwt = value;
    })
	
        try {
            const groupsfetch = await get('user/groups', njwt);
            /*await fetch("https://stengthn.herokuapp.com/user/groups", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "token": JSON.stringify(njwt)
                },
            });*/
    
            const groupsfetched = await groupsfetch.json();

            groupsStore.set(groupsfetched)
 
    
    
        } catch (err) {
            console.log(err)
        }
    
};



