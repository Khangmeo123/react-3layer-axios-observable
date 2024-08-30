Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');
var rxjs = require('rxjs');

/**
 * @package [react3l-axios-observable](https://www.npmjs.com/package/react3l-axios-observable)
 * @namespace Axios
 * @author thanhtunguet <thanhtung.uet@gmail.com>
 * @description Axios class, like axios, but with observable methods
 */
class Axios {
    /**
     * Class constructor
     *
     * @param axiosInstance - Axios instance
     */
    constructor(axiosInstance) {
        Object.defineProperty(this, "axiosInstance", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.axiosInstance = axiosInstance;
    }
    get interceptors() {
        return this.axiosInstance.interceptors;
    }
    get defaults() {
        return this.axiosInstance.defaults;
    }
    /**
     * Create a new Axios instance
     * @param config {AxiosRequestConfig}
     */
    static create(config) {
        const axiosInstance = axios.create(config);
        return new Axios(axiosInstance);
    }
    static request(config) {
        return Axios.createObservable(axios.request, config);
    }
    static get(url, config) {
        return Axios.createObservable(axios.get, url, config);
    }
    static delete(url, config) {
        return Axios.createObservable(axios.delete, url, config);
    }
    static head(url, config) {
        return Axios.createObservable(axios.head, url, config);
    }
    static options(url, config) {
        return Axios.createObservable(axios.options, url, config);
    }
    static post(url, data, config) {
        return Axios.createObservable(axios.post, url, data, config);
    }
    static put(url, data, config) {
        return Axios.createObservable(axios.put, url, data, config);
    }
    static patch(url, data, config) {
        return Axios.createObservable(axios.patch, url, data, config);
    }
    /**
     * Create an observable function from a promise function
     *
     * @param promiseFunction
     * @param args
     * @private
     */
    static createObservable(promiseFunction, ...args) {
        let config = args[args.length - 1];
        config = typeof config === 'object' ? Object.assign({}, config) : {};
        args[args.length - 1] = config;
        let cancelSource;
        const hasCancelToken = !!config.cancelToken;
        if (hasCancelToken) {
            console.warn(`No need to use cancel token, just unsubscribe the subscription would cancel the http request automatically`);
        }
        return new rxjs.Observable((subscriber) => {
            if (!hasCancelToken) {
                cancelSource = axios.CancelToken.source();
                config.cancelToken = cancelSource.token;
            }
            promiseFunction(...args)
                .then((response) => {
                subscriber.next(response);
                subscriber.complete();
            })
                .catch((error) => subscriber.error(error));
        });
    }
    request(config) {
        return Axios.createObservable(this.axiosInstance.request, config);
    }
    get(url, config) {
        return Axios.createObservable(this.axiosInstance.get, url, config);
    }
    delete(url, config) {
        return Axios.createObservable(this.axiosInstance.delete, url, config);
    }
    head(url, config) {
        return Axios.createObservable(this.axiosInstance.head, url, config);
    }
    options(url, config) {
        return Axios.createObservable(this.axiosInstance.options, url, config);
    }
    post(url, data, config) {
        return Axios.createObservable(this.axiosInstance.post, url, data, config);
    }
    put(url, data, config) {
        return Axios.createObservable(this.axiosInstance.put, url, data, config);
    }
    patch(url, data, config) {
        return Axios.createObservable(this.axiosInstance.patch, url, data, config);
    }
}
/**
 * Axios default config
 *
 * @type {AxiosRequestConfig}
 */
Object.defineProperty(Axios, "defaults", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: axios.defaults
});
/**
 * Axios interceptor manager
 *
 * @type {AxiosInstance["interceptor"]}
 */
Object.defineProperty(Axios, "interceptors", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: axios.interceptors
});

exports.Axios = Axios;
exports.default = Axios;
//# sourceMappingURL=index.js.map
