import { DatabaseHandler } from "./core/dbHandler";
import { DocHandler } from "./core/docHandler";
import { FyoConfig } from "./core/types";
import { Config } from "./demux/config";

export class Fyo {
    // t = t;
    // T = T;

    isElectron: boolean;
    isTest: boolean;

    doc: DocHandler;
    db: DatabaseHandler;
    
    config: Config;
    
    constructor(conf: FyoConfig = {}) {
        this.isTest = conf.isTest ?? false;
        this.isElectron = conf.isElectron ?? true;

        this.config = new Config(this.isElectron && !this.isTest);
        
        this.db = new DatabaseHandler(this, conf.DatabaseDemux);
        this.doc = new DocHandler(this);
    }

    get models() {
        return this.doc.models; 
    }

    get schemaMap() {
        return this.db.schemaMap;
    }
}