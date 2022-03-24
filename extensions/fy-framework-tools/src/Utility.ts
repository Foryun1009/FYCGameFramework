import fs from 'fs';
import path from 'path';

export default class Utility {
    /** 
     * 创建目录
     * @param filePath 文件路径或者文件夹路径
     */
    public static createDirectory(filePath: string) {
        const arr = filePath.split('/');
        let dir = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (dir.length > 0 && !fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            dir = dir + '/' + arr[i];
        }
    }

    /** 
     * 目录与目录之间复制文件,两个参数要匹配,文件就是文件,文件夹就是文件夹
     * @param start 起始文件目录
     * @param end 目标文件目录
     */
    public static copyFile(start: string, end: string) {
        //如果目标文件夹不存在则需要创建文件夹
        if (!fs.existsSync(end)) {
            this.createDirectory(end)
        }

        //判断起始文件是文件还是目录
        fs.stat(start, (e, s) => {
            if (s.isFile()) {
                // console.log("CustomPlugin: 拷贝文件", start, end)
                fs.writeFileSync(end, fs.readFileSync(start));
            } else {
                //读取目录中的所有文件,递归所有目录
                fs.readdirSync(start, "utf8").forEach(f => {
                    this.copyFile(start + "/" + f, end + "/" + f);
                });
            }
        });
    }

    /**
     * 递归获取目录下所有文件
     * @param dir 目录
     * @param filesList 文件列表
     * @returns 文件列表
     */
    public static readFileList(dir: string, filesList: Array<string> = []): Array<string> {
        const files = fs.readdirSync(dir);
        files.forEach((item, index) => {
            var fullPath: string = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                Utility.readFileList(path.join(dir, item), filesList);  //递归读取文件
            } else {
                let extname = path.extname(fullPath);
                if (extname !== '.meta' && extname !== '.DS_Store' && extname !== '') {
                    // 排除文件
                    filesList.push(fullPath);
                }
            }
        });
        return filesList;
    }

    /**
     * 校验目录，如果不存在，则创建
     * @param dir 目录
     * @returns 目录
     */
    public static checkDirectory(dir: string) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    }
}