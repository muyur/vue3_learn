// 副作用函数
function effect1() {
  document.body.innerText = "helle";
}
// effect执行之后,其他函数都能够读取或者设置body的内容
// 所以effect直接或间接的影响其他函数的执行，便是产生了副作用

// 修改全局变量也会产生副作用
let val = 1;
function effect2() {
  val = 2; // 改变了全局变量的值，产生副作用
}

// 使用Proxy实现响应式
// 存储副作用函数的桶
const bucket = new Set();

// 原始数据
const data = { text: "hello" };
// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 effect 添加到存储副作用函数的桶中
    bucket.add(effect);
    return target[key];
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 设置属性
    target[key] = newVal;
    // 把副作用从桶里取出并执行
    bucket.forEach((fn) => fn());
    // 返回true表示设置成功
    return true;
  },
});

// 副作用函数
function effect() {
  document.body.innerText = obj.text;
}
// 执行副作用函数，触发读取
effect();
// 延时修改响应式数据
setTimeout(() => {
    obj.text = 'world'
}, 1000)