"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonHPack {
    /**
     * 打包
     * @param collection 源集合 mono dimensional homogeneous collection of objects to pack
     * @param compression 可选参数，压缩级别从0-4，默认值是0 optional compression level from 0 to 4 - default 0
     * @returns 已经优化的集合 optimized collection
     */
    static hPack(collection, compression = 0) {
        let result = [];
        if (3 < compression) {
            // try evey compression level and returns the best option
            let i = JsonHPack.hBest(collection);
            result = JsonHPack.cache[i];
            JsonHPack.cache = [];
        }
        else {
            // compress via specified level (default 0)
            let first = collection[0];
            let index = 0;
            let k = 0;
            let len = 0;
            let length = collection.length;
            // 表头
            let header = [];
            // 结果是二维数组
            // 第一个行是表头
            result = [header];
            // 获取表头
            for (let key in first) {
                header[index++] = key;
            }
            len = index;
            index = 0;
            // 将每一行的值取出来，一行就是一个数组
            for (let i = 0; i < length; ++i) {
                let row = [];
                for (let item = collection[i], j = 0; j < len; ++j) {
                    row[j] = item[header[j]];
                }
                result[++index] = row;
            }
            ++index;
            // compression 1, 2 or 3
            if (0 < compression) {
                // create a fixed enum type for each property (except numbers)
                for (let row = result[1], j = 0; j < len; ++j) {
                    if (typeof row[j] != "number") {
                        header[j] = [header[j], first = []];
                        // replace property values with enum index (create entry in enum list if not present)
                        for (let i = 1; i < index; ++i) {
                            let value = result[i][j], l = first.indexOf(value);
                            result[i][j] = l < 0 ? first.push(value) - 1 : l;
                        }
                    }
                }
            }
            // compression 3 only
            if (2 < compression) {
                // Second Attemp:
                // This compression is quite expensive.
                // It calculates the length of all indexes plus the lenght
                // of the enum against the length of values rather than indexes and without enum for each column
                // In this way the manipulation will be hibryd but hopefully worthy in certain situation.
                // not truly suitable for old client CPUs cause it could cost too much
                for (let j = 0; j < len; ++j) {
                    if (header[j] instanceof Array) {
                        let row = header[j][1];
                        let value = [];
                        let first = [];
                        for (let k = 0, i = 1; i < index; ++i) {
                            value[k] = row[first[k] = result[i][j]];
                            ++k;
                        }
                        if (JSON.stringify(value).length < JSON.stringify(first.concat(row)).length) {
                            for (let k = 0, i = 1; i < index; ++i) {
                                result[i][j] = value[k];
                                ++k;
                            }
                            header[j] = header[j][0];
                        }
                    }
                }
            }
            // compression 2 only
            else if (1 < compression) {
                length -= Math.floor(length / 2);
                for (let j = 0; j < len; ++j) {
                    if (header[j] instanceof Array) {
                        // if the collection length - (collection lenght / 2) is lower than enum length
                        // maybe it does not make sense to create extra characters in the string for each
                        // index representation
                        let first = header[j][1];
                        if (length < first.length) {
                            for (let i = 1; i < index; ++i) {
                                let value = result[i][j];
                                result[i][j] = first[value];
                            }
                            header[j] = header[j][0];
                        }
                    }
                }
            }
            // if compression is at least greater than 0
            if (0 < compression) {
                for (let j = 0; j < len; ++j) {
                    if (header[j] instanceof Array) {
                        header.splice(j, 1, header[j][0], header[j][1]);
                        ++len;
                        ++j;
                    }
                }
            }
        }
        return result;
    }
    /**
     * 解包
     * @param collection 优化集合的副本 optimized collection to clone
     * @returns 源集合 original  mono dimensional homogeneous collection of objects
     */
    static hUnpack(collection) {
        // compatible with every hpack compressed array
        // simply swaps arrays with key/values objects
        let result = [];
        let keys = [];
        let header = collection[0];
        let len = header.length;
        let length = collection.length;
        let index = -1;
        for (let k = -1, i = 0, l = 0, j = 0, row; i < len; ++i) {
            // list of keys
            keys[++k] = header[i];
            // if adjacent value is an array (enum)
            if (typeof header[i + 1] == "object") {
                ++i;
                // replace indexes in the column
                // using enum as collection
                for (j = 1; j < length; ++j) {
                    row = collection[j];
                    row[l] = header[i][row[l]];
                }
                ;
            }
            ;
            ++l;
        }
        for (let i = 0, len = keys.length; i < len; ++i) {
            // replace keys with assignment operation ( test becomes o["test"]=a[index]; )
            // make properties safe replacing " char
            keys[i] = 'o["'.concat(keys[i].replace('"', "\\x22"), '"]=a[', i.toString(), '];');
        }
        let anonymous = Function("o,a", keys.join("") + "return o;");
        for (let j = 1; j < length; ++j) {
            // replace each item with runtime key/value pairs object
            result[++index] = anonymous({}, collection[j]);
        }
        return result;
    }
    /**
     * 获取集合的副本 get a copy of collection
     * @param collection 优化集合的副本 optimized collection to clone
     * @returns 源集合的副本 a clone of the original collection
     */
    static hClone(collection) {
        // avoid array modifications
        // it could be useful but not that frequent in "real life cases"
        let clone = [];
        for (let i = 0, length = collection.length; i < length; ++i) {
            clone[i] = collection[i].slice(0);
        }
        return clone;
    }
    /**
     * 获取最优转换 get the most convenient conversion
     * @param collection 优化集合的副本 optimized collection to clone
     * @returns 最优压缩选项 best compression option
     */
    static hBest(collection) {
        let j = 0;
        for (let i = 0, len = 0, length = 0; i < 4; ++i) {
            // cache result
            JsonHPack.cache[i] = JsonHPack.hPack(collection, i);
            // retrieve the JSON length
            len = JSON.stringify(JsonHPack.cache[i]).length;
            if (length === 0) {
                length = len;
            }
            // choose which one is more convenient
            else if (len < length) {
                length = len;
                j = i;
            }
        }
        // return most convenient convertion
        // please note that with small amount of data
        // native JSON convertion could be smaller
        // [{"k":0}] ==> [["k"],[0]] (9 chars against 11)
        // above example is not real life example and as soon
        // as the list will have more than an object
        // hpack will start to make the difference:
        // [{"k":0},{"k":0}] ==> [["k"],[0],[0]] (17 chars against 15)
        return j;
    }
}
exports.default = JsonHPack;
JsonHPack.cache = [];
