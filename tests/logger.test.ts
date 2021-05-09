import {log} from '../src/util';

test("Test Logger", () => {
    log("hello {}, from typescript!", "yea", "ok");
})