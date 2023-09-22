// 用一个全局变量存储被注册的副作用函数
let activeEffect;
// effect 函数用于注册副作用函数
function effect(fn) {
  // 调用effect注册副作用函数时，将副作用函数fn赋值给activeEffect
  activeEffect = fn;
  // 执行副作用函数
  fn();
}
// 使用effect注册副作用函数
effect(
  // 匿名副作用函数
  () => {
    // 执行函数值则会触发对象的读取操作get,从而将注册的副作用函数装入bucket内
    document.body.innerText = obj.text;
  }
);

// 装副作用函数的桶
const bucket = new Set();

// 数据
const data = {
  text: "hello",
};
const obj = new Proxy(data, {
  get(target, key) {
    // 将activeEffect中存储的副作用函数收集到bucket中
    if (activeEffect) {
      bucket.add(activeEffect);
    }
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    bucket.forEach((fn) => fn());
    return true;
  },
});

// 设置不存在属性时，也会导致触发bucket中的effect副作用函数
// 所以便需要在副作用函数与被操作字段之间建立联系