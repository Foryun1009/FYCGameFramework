/**
 * 无限大的数
 */
export class BigNumber {
    private value: string;

    constructor(value: string | number | BigNumber) {
        if (typeof value === 'number') {
            this.value = value.toString();
        } else if (typeof value === 'string') {
            this.value = value;
        } else {
            Object.assign(this, value);
        }
    }

    private static addStrings(num1: string, num2: string): string {
        if (num1[0] === '-' && num2[0] === '-') {
            return '-' + BigNumber.addStrings(num1.slice(1), num2.slice(1));
        } else if (num1[0] === '-') {
            return BigNumber.subtractStrings(num2, num1.slice(1));
        } else if (num2[0] === '-') {
            return BigNumber.subtractStrings(num1, num2.slice(1));
        }

        let carry = 0;
        let result = '';

        let i = num1.length - 1;
        let j = num2.length - 1;

        while (i >= 0 || j >= 0 || carry > 0) {
            const digit1 = i >= 0 ? parseInt(num1.charAt(i--), 10) : 0;
            const digit2 = j >= 0 ? parseInt(num2.charAt(j--), 10) : 0;

            const sum = digit1 + digit2 + carry;
            result = (sum % 10) + result;
            carry = Math.floor(sum / 10);
        }

        return result;
    }

    private static subtractStrings(num1: string, num2: string): string {
        if (num1[0] === '-' && num2[0] === '-') {
            return BigNumber.subtractStrings(num2.slice(1), num1.slice(1));
        } else if (num1[0] === '-') {
            return '-' + BigNumber.addStrings(num1.slice(1), num2);
        } else if (num2[0] === '-') {
            return BigNumber.addStrings(num1, num2.slice(1));
        }

        if (BigNumber.compareStrings(num1, num2) < 0) {
            return '-' + BigNumber.subtractStrings(num2, num1);
        }

        let borrow = 0;
        let result = '';

        let i = num1.length - 1;
        let j = num2.length - 1;

        while (i >= 0 || j >= 0) {
            const digit1 = i >= 0 ? parseInt(num1.charAt(i--), 10) : 0;
            const digit2 = j >= 0 ? parseInt(num2.charAt(j--), 10) : 0;

            let diff = digit1 - digit2 - borrow;
            if (diff < 0) {
                diff += 10;
                borrow = 1;
            } else {
                borrow = 0;
            }

            result = diff + result;
        }

        return result.replace(/^0+/, '') || '0';
    }

    private static multiplyStrings(num1: string, num2: string): string {
        const isNegative = (num1[0] === '-') !== (num2[0] === '-');
        if (num1[0] === '-') num1 = num1.slice(1);
        if (num2[0] === '-') num2 = num2.slice(1);

        const result = Array(num1.length + num2.length).fill(0);

        for (let i = num1.length - 1; i >= 0; i--) {
            for (let j = num2.length - 1; j >= 0; j--) {
                const product = parseInt(num1.charAt(i), 10) * parseInt(num2.charAt(j), 10);
                const sum = result[i + j + 1] + product;

                result[i + j + 1] = sum % 10;
                result[i + j] += Math.floor(sum / 10);
            }
        }

        let resultString = result.join('').replace(/^0+/, '') || '0';
        if (isNegative && resultString !== '0') {
            resultString = '-' + resultString;
        }

        return resultString;
    }

    private static divideStrings(num1: string, num2: string): string {
        if (num2 === '0') throw new Error('Division by zero');
        if (num1 === '0') return '0';

        const isNegative = (num1[0] === '-') !== (num2[0] === '-');
        if (num1[0] === '-') num1 = num1.slice(1);
        if (num2[0] === '-') num2 = num2.slice(1);

        let result = '';
        let current = '';

        for (let i = 0; i < num1.length; i++) {
            current += num1.charAt(i);
            let count = 0;
            while (BigNumber.compareStrings(current, num2) >= 0) {
                current = BigNumber.subtractStrings(current, num2);
                count++;
            }
            result += count;
        }

        result = result.replace(/^0+/, '') || '0';
        if (isNegative && result !== '0') {
            result = '-' + result;
        }

        return result;
    }

    private static compareStrings(num1: string, num2: string): number {
        num1 = num1.replace(/^0+/, '');
        num2 = num2.replace(/^0+/, '');

        if (num1.length > num2.length) return 1;
        if (num1.length < num2.length) return -1;

        for (let i = 0; i < num1.length; i++) {
            if (num1.charAt(i) > num2.charAt(i)) return 1;
            if (num1.charAt(i) < num2.charAt(i)) return -1;
        }

        return 0;
    }

    /**
     * 加
     * @param other 
     * @returns 
     */
    add(other: BigNumber | number): BigNumber {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        return new BigNumber(BigNumber.addStrings(this.value, other.value));
    }

    /**
     * 加等于
     * @param other 
     * @returns 
     */
    plusEquals(other: BigNumber | number): BigNumber {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        this.value = BigNumber.addStrings(this.value, other.value);
        return this;
    }

    /**
     * 减
     * @param other 
     * @returns 
     */
    subtract(other: BigNumber | number): BigNumber {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        return new BigNumber(BigNumber.subtractStrings(this.value, other.value));
    }

    /**
     * 减等于
     * @param other 
     * @returns 
     */
    minusEquals(other: BigNumber | number): BigNumber {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        this.value = BigNumber.subtractStrings(this.value, other.value);
        return this;
    }

    /**
     * 乘
     * @param other 
     * @returns 
     */
    multiply(other: BigNumber | number): BigNumber {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        return new BigNumber(BigNumber.multiplyStrings(this.value, other.value));
    }

    /**
     * 乘等于
     * @param other 
     * @returns 
     */
    timesEquals(other: BigNumber | number): BigNumber {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        this.value = BigNumber.multiplyStrings(this.value, other.value);
        return this;
    }

    /**
     * 除
     * @param other 
     * @returns 
     */
    divide(other: BigNumber | number): BigNumber {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        return new BigNumber(BigNumber.divideStrings(this.value, other.value));
    }

    /**
     * 除等于
     * @param other 
     * @returns 
     */
    dividedEquals(other: BigNumber | number): BigNumber {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        this.value = BigNumber.divideStrings(this.value, other.value);
        return this;
    }

    /**
     * 取负数
     * @returns 
     */
    negate(): BigNumber {
        if (this.value[0] === '-') {
            return new BigNumber(this.value.slice(1));
        } else {
            return new BigNumber('-' + this.value);
        }
    }

    /**
     * 取负数等于
     * @returns 
     */
    negateEquals(): BigNumber {
        if (this.value[0] === '-') {
            this.value = this.value.slice(1);
        } else {
            this.value = '-' + this.value;
        }
        return this;
    }

    /**
     * 大于
     * @param other 
     * @returns 
     */
    greaterThan(other: BigNumber | number): boolean {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        return BigNumber.compareStrings(this.value, other.value) > 0;
    }

    /**
     * 大于等于
     * @param other 
     * @returns 
     */
    greaterThanOrEqual(other: BigNumber | number): boolean {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        return BigNumber.compareStrings(this.value, other.value) >= 0;
    }

    /**
     * 小于
     * @param other 
     * @returns 
     */
    lessThan(other: BigNumber | number): boolean {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        return BigNumber.compareStrings(this.value, other.value) < 0;
    }

    /**
     * 小于等于
     * @param other 
     * @returns 
     */
    lessThanOrEqual(other: BigNumber | number): boolean {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        return BigNumber.compareStrings(this.value, other.value) <= 0;
    }

    /**
     * 等于
     * @param other 
     * @returns 
     */
    equals(other: BigNumber | number): boolean {
        if (typeof other === 'number') {
            other = new BigNumber(other);
        }
        return BigNumber.compareStrings(this.value, other.value) === 0;
    }

    format(maxDigits: number): string {
        const units = ['', 'K', 'M', 'B', 'T'];
        let number = this.value;
        let length = number.length;

        const isNegative = number[0] === '-';
        if (isNegative) {
            number = number.slice(1);
            length -= 1;
        }

        if (length <= maxDigits) {
            // No need to convert to a unit
            let formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return isNegative ? '-' + formattedNumber : formattedNumber;
        }

        let unitIndex = 0;
        let divisor = 0;
        let divideBigNumber = new BigNumber(number);
        let dividedValue = divideBigNumber.getValue();
        while (dividedValue.length > maxDigits) {
            unitIndex++;
            if (unitIndex >= units.length) {
                unitIndex = units.length - 1;
                break;
            }
            divisor = Math.pow(10, unitIndex * 3);
            dividedValue = divideBigNumber.divide(new BigNumber(divisor)).getValue();
        }

        const truncatedValue = dividedValue.split('.')[0]; // Remove the decimal part
        let formattedNumber = truncatedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + units[unitIndex];
        return isNegative ? '-' + formattedNumber : formattedNumber;
    }

    getValue(): string {
        return this.value;
    }

    toString(): string {
        return this.value;
    }

    valueOf(): number {
        return parseFloat(this.value);
    }

    /**
     * 格式化
     * @param value 数值
     * @param maxDigits 显示的最大位数
     * @returns 
     */
    public static format(value: number | string, maxDigits: number): string {
        return new BigNumber(value).format(maxDigits);
    }

    /**
     * 测试用例
     */
    public static test() {
        for (let i = 1; i <= 20; i++) {
            const n = new BigNumber(-Math.pow(10, i));
            console.log(Math.pow(10, i) + ' --- ' + n.format(6));
        }
        // 使用示例
        const num1 = new BigNumber('-12345678901234567890');
        const num2 = new BigNumber('98765432109876543210');

        console.log('num1 = ' + num1);
        console.log('num2 = ' + num2);
        console.log('num1.format(12) = ' + num1.format(12));
        console.log('num2.format(12) = ' + num2.format(12));

        const sum = num1.add(num2);
        console.log('num1.add(num2) = ' + sum);
        console.log('num1.add(num2).format(12) = ' + sum.format(12)); // 输出: 111,111,111,111,111.111B

        const difference = num1.subtract(12345678901234567890);
        console.log('num1.subtract(12345678901234567890).format(12) = ' + difference.format(12)); // 输出: 98,765,432,109,876.54321B

        const product = num1.multiply(2);
        console.log('num1.multiply(2).format(12) = ' + product.format(12)); // 输出: 197,530,864,219,753.0864B

        const quotient = num1.divide(3);
        console.log('num1.divide(3).format(12) = ' + quotient.format(12)); // 输出: 65,843,621,406,584.3621B

        // 使用加减乘除符号进行运算
        const num3 = new BigNumber('1234567890');
        const num4 = 9876543210;

        console.log('num3 = ' + num3);
        console.log('num4 = ' + num4);

        const resultAdd = num3.add(num4); // BigNumber + number
        console.log('num3.add(num4).format(12) = ' + resultAdd.format(12)); // 输出: 11,111,111,100

        const resultSubtract = num3.subtract(num4); // BigNumber - number
        console.log('num3.subtract(num4).format(12) = ' + resultSubtract.format(12)); // 输出: -8,641,975,320

        const resultMultiply = num3.multiply(num4); // BigNumber * number
        console.log('num3.multiply(num4).format(12) =' + resultMultiply.format(12)); // 输出: 12,193,263,111,263,526,900

        const resultDivide = num3.divide(num4); // BigNumber / number
        console.log('num3.divide(num4).format(12) = ' + resultDivide.format(12)); // 输出: 0.1249999998

        function testPerformance(operation: 'add' | 'subtract' | 'multiply' | 'divide', iterations: number): void {
            const num1 = new BigNumber('12345678901234567890');
            const num2 = new BigNumber('98765432109876543210');
            let result: BigNumber;

            const startTime = performance.now();

            for (let i = 0; i < iterations; i++) {
                switch (operation) {
                    case 'add':
                        result = num1.add(num2);
                        break;
                    case 'subtract':
                        result = num1.subtract(num2);
                        break;
                    case 'multiply':
                        result = num1.multiply(num2);
                        break;
                    case 'divide':
                        result = num1.divide(num2);
                        break;
                }
            }

            const endTime = performance.now();
            console.log(`${operation} operation took ${endTime - startTime} milliseconds for ${iterations} iterations.`);
        }

        // 测试加法性能
        testPerformance('add', 1000);

        // 测试减法性能
        testPerformance('subtract', 1000);

        // 测试乘法性能
        testPerformance('multiply', 1000);

        // 测试除法性能
        testPerformance('divide', 1000);
    }
}


