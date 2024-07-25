import { Node, Vec3, instantiate } from 'cc';

/** 重置 位置归零，旋转归零，缩放归一 */
Node.prototype["reset"] = function () {
    this.setScale(Vec3.ONE);
    this.setPosition(Vec3.ZERO);
    this.setRotationFromEuler(Vec3.ZERO);
}

/**
 * 添加子对象扩展方法，会实例化一个新的子对象
 * @param child 子对象
 */
Node.prototype["addChildEx"] = function (child: Node): Node {
    let node = instantiate(child);
    node.parent = this;
    return node;
}

export { }