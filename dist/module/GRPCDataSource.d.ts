import { DataSource, DataSourceConfig } from 'apollo-datasource';
import GRPCCache from './GRPCCache';
declare abstract class GRPCDataSource<TContext = any> extends DataSource {
    cache: GRPCCache;
    context: TContext;
    client: any;
    constructor();
    initialize(config: DataSourceConfig<any>): void;
    callRPC(ttl: number | undefined, request: any, fnTransformResponseData?: any): Promise<any>;
    getCacheKey(args: any, rpcName: string): string;
}
export default GRPCDataSource;
