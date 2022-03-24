import pako from './pako.min.js';

export namespace Pako {
    export enum FlushValues {
        Z_NO_FLUSH = 0,
        Z_PARTIAL_FLUSH = 1,
        Z_SYNC_FLUSH = 2,
        Z_FULL_FLUSH = 3,
        Z_FINISH = 4,
        Z_BLOCK = 5,
        Z_TREES = 6,
    }

    export enum StrategyValues {
        Z_FILTERED = 1,
        Z_HUFFMAN_ONLY = 2,
        Z_RLE = 3,
        Z_FIXED = 4,
        Z_DEFAULT_STRATEGY = 0,
    }

    export enum ReturnCodes {
        Z_OK = 0,
        Z_STREAM_END = 1,
        Z_NEED_DICT = 2,
        Z_ERRNO = -1,
        Z_STREAM_ERROR = -2,
        Z_DATA_ERROR = -3,
        Z_BUF_ERROR = -5,
    }

    export interface DeflateOptions {
        level?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
        windowBits?: number | undefined;
        memLevel?: number | undefined;
        strategy?: StrategyValues | undefined;
        dictionary?: any;
        raw?: boolean | undefined;
        to?: 'string' | undefined;
        chunkSize?: number | undefined;
        gzip?: boolean | undefined;
        header?: Header | undefined;
    }

    export interface DeflateFunctionOptions {
        level?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
        windowBits?: number | undefined;
        memLevel?: number | undefined;
        strategy?: StrategyValues | undefined;
        dictionary?: any;
        raw?: boolean | undefined;
        to?: 'string' | undefined;
    }

    export interface InflateOptions {
        windowBits?: number | undefined;
        dictionary?: any;
        raw?: boolean | undefined;
        to?: 'string' | undefined;
        chunkSize?: number | undefined;
    }

    export interface InflateFunctionOptions {
        windowBits?: number | undefined;
        raw?: boolean | undefined;
        to?: 'string' | undefined;
    }

    export interface Header {
        text?: boolean | undefined;
        time?: number | undefined;
        os?: number | undefined;
        extra?: number[] | undefined;
        name?: string | undefined;
        comment?: string | undefined;
        hcrc?: boolean | undefined;
    }

    export type Data = Uint8Array | number[] | string | ArrayBuffer;
    /**
     * Compress data with deflate algorithm and options.
     */
    export function deflate(data: Data, options: DeflateFunctionOptions & { to: 'string' }): string
    export function deflate(data: Data, options?: DeflateFunctionOptions): Uint8Array;
    export function deflate(data: Data, options: DeflateFunctionOptions): string | Uint8Array {
        return pako.deflate(data, options);
    }

    /**
     * The same as deflate, but creates raw data, without wrapper (header and adler32 crc).
     */
    export function deflateRaw(data: Data, options: DeflateFunctionOptions & { to: 'string' }): string;
    export function deflateRaw(data: Data, options?: DeflateFunctionOptions): Uint8Array;
    export function deflateRaw(data: Data, options?: DeflateFunctionOptions): string | Uint8Array {
        return pako.deflateRaw(data, options);
    }

    /**
     * The same as deflate, but create gzip wrapper instead of deflate one.
     */
    export function gzip(data: Data, options: DeflateFunctionOptions & { to: 'string' }): string;
    export function gzip(data: Data, options?: DeflateFunctionOptions): Uint8Array;
    export function gzip(data: Data, options?: DeflateFunctionOptions): string | Uint8Array {
        return pako.gzip(data, options);
    }

    /**
     * Decompress data with inflate/ungzip and options. Autodetect format via wrapper header
     * by default. That's why we don't provide separate ungzip method.
     */
    export function inflate(data: Data, options: InflateFunctionOptions & { to: 'string' }): string;
    export function inflate(data: Data, options?: InflateFunctionOptions): Uint8Array;
    export function inflate(data: Data, options?: InflateFunctionOptions): string | Uint8Array {
        return pako.inflate(data, options);
    }

    /**
     * The same as inflate, but creates raw data, without wrapper (header and adler32 crc).
     */
    export function inflateRaw(data: Data, options: InflateFunctionOptions & { to: 'string' }): string;
    export function inflateRaw(data: Data, options?: InflateFunctionOptions): Uint8Array;
    export function inflateRaw(data: Data, options?: InflateFunctionOptions): string | Uint8Array {
        return pako.inflateRaw(data, options);
    }

    /**
     * Just shortcut to inflate, because it autodetects format by header.content. Done for convenience.
     */
    export function ungzip(data: Data, options: InflateFunctionOptions & { to: 'string' }): string;
    export function ungzip(data: Data, options?: InflateFunctionOptions): Uint8Array;
    export function ungzip(data: Data, options?: InflateFunctionOptions): string | Uint8Array {
        return pako.ungzip(data, options);
    }

    // https://github.com/nodeca/pako/blob/893381abcafa10fa2081ce60dae7d4d8e873a658/lib/deflate.js
    export interface Deflate {
        constructor(options?: DeflateOptions);
        err: ReturnCodes;
        msg: string;
        result: Uint8Array | number[];
        onData(chunk: Data): void;
        onEnd(status: number): void;
        push(data: Data | ArrayBuffer, mode?: FlushValues | boolean): boolean;
    }

    // https://github.com/nodeca/pako/blob/893381abcafa10fa2081ce60dae7d4d8e873a658/lib/inflate.js
    export interface Inflate {
        constructor(options?: InflateOptions);
        header?: Header | undefined;
        err: ReturnCodes;
        msg: string;
        result: Data;
        onData(chunk: Data): void;
        onEnd(status: number): void;
        push(data: Data | ArrayBuffer, mode?: FlushValues | boolean): boolean;
    }
}

