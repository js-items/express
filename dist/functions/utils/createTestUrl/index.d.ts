export interface Options {
    readonly url: string;
    readonly params?: {
        [paramName: string]: any;
    };
}
declare const createTestUrl: ({ params, url }: Options) => string;
export default createTestUrl;
