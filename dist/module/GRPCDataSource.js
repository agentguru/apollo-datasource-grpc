import { DataSource } from 'apollo-datasource';
import crypto from 'crypto';
import GRPCCache from './GRPCCache';
class GRPCDataSource extends DataSource {
    constructor() {
        super();
    }
    initialize(config) {
        this.context = config.context;
        this.cache = new GRPCCache(config.cache);
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
        return crypto
            .createHash("sha1")
            .update(JSON.stringify(args) + rpcName)
            .digest("base64");
    }
}
export default GRPCDataSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JQQ0RhdGFTb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvR1JQQ0RhdGFTb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBb0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFDO0FBRXBDLE1BQWUsY0FBK0IsU0FBUSxVQUFVO0lBSzlEO1FBQ0UsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQTZCO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLE9BQVksRUFBRSx1QkFBNkI7UUFDaEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRSxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdDLElBQUksS0FBSztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXhCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsTUFBVyxFQUFFLEVBQUU7WUFDL0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBUSxFQUFFLFFBQWEsRUFBRSxFQUFFO2dCQUMxRixJQUFJLEdBQUcsRUFBRTtvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEI7Z0JBRUQsSUFBSSx1QkFBdUIsRUFBRTtvQkFDM0IsTUFBTSxHQUFHLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN4QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ25CO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBUyxFQUFFLE9BQWU7UUFDcEMsT0FBTyxNQUFNO2FBQ1YsVUFBVSxDQUFDLE1BQU0sQ0FBQzthQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7YUFDdEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7Q0FDRjtBQUVELGVBQWUsY0FBYyxDQUFDIn0=