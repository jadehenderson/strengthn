const scheme = 'https'
const hostname = 'stengthn.herokuapp.com'
const portnumber = ''

let basearray = [scheme, '://', hostname];

if (portnumber) { // portnumber non-empty and defined
    basearray = [...basearray, ':', portnumber];
}

export const base = basearray.join('');