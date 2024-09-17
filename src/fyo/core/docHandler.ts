import { Doc } from "@fyo/models/doc";
import { NotFoundError } from "@fyo/utils/errors";
import { ModelMap, SinglesMap } from "@models/types";
import { Schema } from "@schemas/types";
import { Fyo } from "..";
import { DocValueMap, RawValueMap } from "./types";

export class DocHandler {
    fyo: Fyo;
    models: ModelMap = {};
    singles: SinglesMap = {};
    
    #temporaryNameCounters: Record<string, number>;

    constructor(fyo: Fyo) {
        this.fyo = fyo;
        this.#temporaryNameCounters = {};
    }

    init() {
        this.models = {};
        this.singles = {};
        // this.docs = new Observable();
        // this.observer = new Observable();
    }

    getNewDoc(
        schemaName: string,
        data: DocValueMap | RawValueMap = {},
        cacheDoc = true,
        schema?: Schema,
        Model?: typeof Doc,
        isRawValueMap = true
      ): Doc {

        if (!this.models[schemaName] && Model) {
            this.models[schemaName] = Model;
        }
    
        Model ??= this.models[schemaName];
        schema ??= this.fyo.schemaMap[schemaName];
    
        if (schema === undefined) {
            throw new NotFoundError(`Schema not found for ${schemaName}`);
        }
    
        const doc = new Model!(schema, data, this.fyo, isRawValueMap);
        doc.name ??= this.getTemporaryName(schema);
        if (cacheDoc) {
            this.#addToCache(doc);
        }
    
        return doc;
    }

    getTemporaryName(schema: Schema): string {

        this.#temporaryNameCounters[schema.name] ??= 1;

        const idx = this.#temporaryNameCounters[schema.name];
        this.#temporaryNameCounters[schema.name] = idx + 1;
        const label = schema.label ?? schema.name;

        return `New ${label} ${String(idx).padStart(2, '0')}`;
    }

    /**
     * Cache operations
     */
    #addToCache(doc: Doc) {
        if (!doc.name) {
            return;
        }

        // const name = doc.name;
        // const schemaName = doc.schemaName;
    }
}