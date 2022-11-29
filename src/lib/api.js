//import { error } from '@sveltejs/kit';
import { base } from './constants';

// define an http api for frontend to query backend database
async function send({ method, path, data, token }) {
    const opts = { method, headers: {'Content-Type': 'application/json'} };

    if (data) {
        opts.body = JSON.stringify(data);
    }

    if (token) {
        opts.headers['token'] = JSON.stringify(token);
    }

    const res = await fetch(`${base}/${path}`, opts);

    // immediately returns the result of fetch
    // leaves any error handling up to the caller
    return res;
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function post({ path, data, token }) {
	return send({ method: 'POST', path, data, token });
}

// PUT and DELETE not implemented