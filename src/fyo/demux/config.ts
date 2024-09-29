import { ConfigMap, Contex } from '@fyo/core/types';

export class Config {
    config: Map<string, unknown> | Contex;

    constructor(isElectron: boolean) {
        this.config = new Map();
        if (isElectron) {
            this.config = context.store;
        }
    }

    get<K extends keyof ConfigMap>(
        key: K,
        defaultValue?: ConfigMap[K]
    ): ConfigMap[K] | undefined {
        const value = this.config.get(key) as ConfigMap[K] | undefined;
        return value ?? defaultValue;
    }

    set<K extends keyof ConfigMap>(key: K, value: ConfigMap[K]) {
        this.config.set(key, value);
    }

    delete(key: keyof ConfigMap) {
        this.config.delete(key);
    }
}
