import { KeyValueCache } from 'apollo-server-caching';
declare class GRPCCache {
    keyValueCache: KeyValueCache<string>;
    constructor(keyValueCache: KeyValueCache<string>);
    get(key: string): Promise<any>;
    set(key: string, value: any, ttl: number): Promise<void>;
}
export default GRPCCache;
