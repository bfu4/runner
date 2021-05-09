import {
    register,
    create
} from "./command";
import { runMake } from "./makeCommand";

const makeCommand = register(create("make", runMake));

export {
    register,
    create,
    makeCommand
};