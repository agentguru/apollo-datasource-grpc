"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_1 = require("apollo-datasource");
const crypto_1 = __importDefault(require("crypto"));
const GRPCCache_1 = __importDefault(require("./GRPCCache"));
class GRPCDataSource extends apollo_datasource_1.DataSource {
    constructor() {
        super();
    }
    initialize(config) {
        this.context = config.context;
        this.cache = new GRPCCache_1.default(config.cache);
    }
    async callRPC(ttl = 5, request, fnTransformResponseData) {
        const cacheKey = this.getCacheKey(request.args, request.rpcName);
        const entry = await this.cache.get(cacheKey);
        if (entry)
            return entry;
        const response = await new Promise((resolve, reject) => {
            this.client[request.rpcName]({ ...request.args }, request.meta, (err, response) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                if (fnTransformResponseData) {
                    const res = fnTransformResponseData(response);
                    this.cache.set(cacheKey, res, ttl);
                    resolve(res);
                }
                else {
                    this.cache.set(cacheKey, response, ttl);
                    resolve(response);
                }
            });
        });
        return response;
    }
    getCacheKey(args, rpcName) {
        return crypto_1.default
            .createHash("sha1")
            .update(JSON.stringify(args) + rpcName)
            .digest("base64");
    }
}
exports.default = GRPCDataSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JQQ0RhdGFTb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvR1JQQ0RhdGFTb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5REFBaUU7QUFDakUsb0RBQTRCO0FBQzVCLDREQUFvQztBQUVwQyxNQUFlLGNBQStCLFNBQVEsOEJBQVU7SUFLOUQ7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBNkI7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLE9BQVksRUFBRSx1QkFBNkI7UUFDaEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRSxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdDLElBQUksS0FBSztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXhCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsTUFBVyxFQUFFLEVBQUU7WUFDL0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBUSxFQUFFLFFBQWEsRUFBRSxFQUFFO2dCQUMxRixJQUFJLEdBQUcsRUFBRTtvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEI7Z0JBRUQsSUFBSSx1QkFBdUIsRUFBRTtvQkFDM0IsTUFBTSxHQUFHLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN4QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ25CO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBUyxFQUFFLE9BQWU7UUFDcEMsT0FBTyxnQkFBTTthQUNWLFVBQVUsQ0FBQyxNQUFNLENBQUM7YUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO2FBQ3RDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxjQUFjLENBQUMifQ==