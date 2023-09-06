// 函数描述组件
const MyComponent = function () {
  return {
    tag: "div",
    props: {
      onClick: () => alert("hello"),
    },
    children: "click me",
  };
};

// 虚拟DOM描述组件
const vnode = {
  tag: MyComponent,
};

function renderer(vnode, container) {
  if (typeof vnode.tag === "string") {
    mountElement(vnode, container);
  } else if (typeof vnode.tag === "function") {
    // function说明是组件
    mountComponent(vnode, container);
  }
}

function mountElement(vnode, container) {
  // 使用 vnode.tag 作为标签名称创建 DOM 元素
  const el = document.createElement(vnode.tag);
  // 遍历 vnode.props，将属性、事件添加到 DOM 元素
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      // 如果 key 以 on 开头，说明它是事件
      el.addEventListener(
        key.substring(2).toLowerCase(), // 事件名称 onClick ---> click
        vnode.props[key] // 事件处理函数
      );
    } else {
      el.setAttribute(key, vnode.props[key]);
    }
  }

  // 处理 children
  if (typeof vnode.children === "string") {
    // 如果 children 是字符串，说明它是元素的文本子节点
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    // 递归地调用 renderer 函数渲染子节点，使用当前元素 el 作为挂载点
    vnode.children.forEach((child) => renderer(child, el));
  }

  // 将元素添加到挂载点下
  container.appendChild(el);
}
// 挂在组件
function mountComponent(vnode, container) {
    // 调用组件函数，获取组件需要渲染的虚拟dom
    const subtree = vnode.tag()
    // 递归调用renderer渲染subtree
    renderer(subtree, container)
}

// 执行渲染
renderer(vnode, document.body)