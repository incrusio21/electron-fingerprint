import { SchemaMap } from "@schemas/types";
import { Fyo } from "..";
import { Converter } from "./converter";
import { DatabaseDemuxConstructor } from "./types";

export class DatabaseHandler {
    /* eslint-disable @typescript-eslint/no-floating-promises */
    #fyo: Fyo;
    converter: Converter;
    
    #schemaMap: SchemaMap = {};
    
    constructor(fyo: Fyo, _?: DatabaseDemuxConstructor ) {
        this.#fyo = fyo;
        this.converter = new Converter(this, this.#fyo);
    }

    get schemaMap(): Readonly<SchemaMap> {
        return this.#schemaMap;
    }
}