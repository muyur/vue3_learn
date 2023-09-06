
const obj = {
  tag: "div",
  children: [{ tag: "span", children: "hello world" }],
};

function Render(obj, root) {
  const el = document.createElement(obj.tag);
  if (typeof obj.children === "string") {
    const text = document.createTextNode(obj.children);
    el.appendChild(text);
  } else if (obj.children) {
    // 数组，递归调用 Render，使用 el 作为 root 参数
    obj.children.forEach((child) => Render(child, el));
  }

  // 将元素添加到 root
  root.appendChild(el);
}

Render(obj, document.body)