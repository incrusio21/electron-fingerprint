import { Fyo } from "..";
import { DatabaseHandler } from "./dbHandler";

export class Converter {
    db: DatabaseHandler;
    fyo: Fyo;

    constructor(db: DatabaseHandler, fyo: Fyo) {
        this.db = db;
        this.fyo = fyo;
    }
}