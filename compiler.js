const html = `
 <div>
   <span>hello world</span>
 </div>
 `;
// 调用 Compiler 编译得到树型结构的数据对象
const obj = Compiler(html);
// 再调用 Render 进行渲染
Render(obj, document.body);
