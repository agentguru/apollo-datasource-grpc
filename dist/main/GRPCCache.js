"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_caching_1 = require("apollo-server-caching");
class GRPCCache {
    constructor(keyValueCache) {
        this.keyValueCache = keyValueCache;
        if (!this.keyValueCache)
            this.keyValueCache = new apollo_server_caching_1.InMemoryLRUCache();
    }
    async get(key) {
        const entry = await this.keyValueCache.get(`grpccache:${key}`);
        if (entry)
            return JSON.parse(entry);
        return null;
    }
    async set(key, value, ttl) {
        if (ttl > 0) {
            await this.keyValueCache.set(`grpccache:${key}`, JSON.stringify(value), { ttl });
        }
    }
}
exports.default = GRPCCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JQQ0NhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0dSUENDYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlFQUF3RTtBQUV4RSxNQUFNLFNBQVM7SUFHYixZQUFZLGFBQW9DO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSx3Q0FBZ0IsRUFBRSxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVc7UUFDbkIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFL0QsSUFBSSxLQUFLO1lBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQVUsRUFBRSxHQUFXO1FBQzVDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNYLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNsRjtJQUNILENBQUM7Q0FDRjtBQUVELGtCQUFlLFNBQVMsQ0FBQyJ9