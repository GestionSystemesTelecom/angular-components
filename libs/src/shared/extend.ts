export function extend(...args) {
    for (let i = 1;  i < args.length; i++) {
        for (let key in args[i]) {
            if (args[i].hasOwnProperty(key)) {
                args[0][key] = args[i][key];
            }
        }
    }
    return args[0];
}
