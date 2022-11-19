// import template from "@babel/template";

const { default: template } = require("@babel/template");

/*
 * catch要打印的信息
 * @param {string} filePath - 当前执行文件的路径
 * @param {string} funcName - 当前执行方法的名称
 * @param {string} customLog - 用户自定义的打印信息
 */
let catchConsole = (filePath, funcName, customLog) => `
filePath: ${filePath}
funcName: ${funcName}
${customLog}:`;

module.exports = function ({ types: t }) {
  //   console.log("babel");
  //   console.log(babel.types);
  //   console.log("babel");
  // 定义try/catch语句模板
  let tryTemplate = `
    try {
    } catch (e) {
     console.log( %%catchError%%, e)
    }`;

  return {
    name: "async-add-try-catch",
    visitor: {
      Function(_, state) {
        _.traverse({
          AwaitExpression: function (path) {
            // 判断父路径中是否已存在try语句，若存在直接返回
            if (path.findParent((p) => p.isTryStatement())) {
              return false;
            }

            // 获取用户配置
            // console.log(state.opts);

            // 获取编译目标文件的路径，如：E:\myapp\src\App.vue
            const filePath = state.filename || state.opts.filename || "unknown";

            console.log("处理 AwaitExpression 中");
            // const asyncPath = path.findParent((p) => p.node.async);
            // p 为当前父节点的`检查路径`对象
            const asyncPath = path.findParent(
              (p) =>
                p.node.async &&
                (p.isFunctionDeclaration() ||
                  p.isArrowFunctionExpression() ||
                  p.isFunctionExpression() ||
                  p.isObjectMethod())
            );

            // 当前的async函数名称
            let asyncName = "";

            switch (asyncPath.node.type) {
              case "FunctionExpression":
              case "ArrowFunctionExpression":
                // 使用path.getSibling(index)来获得同级的id路径
                let identifier = asyncPath.getSibling("id");
                // 获取func方法名
                asyncName =
                  identifier && identifier.node ? identifier.node.name : "";
                break;

              // 函数声明，如async function fn2() {}
              case "FunctionDeclaration":
                asyncName = (asyncPath.node.id && asyncPath.node.id.name) || "";
                break;

              // async函数作为对象的方法，如vue项目中，在methods中定义的方法: methods: { async func() {} }
              case "ObjectMethod":
                asyncName = asyncPath.node.key.name || "";
                break;
            }

            // 若asyncName不存在，通过argument.callee获取当前执行函数的name
            let funcName =
              asyncName ||
              (node.argument.callee && node.argument.callee.name) ||
              "";

            // 给模版增加key，添加console.log打印信息
            let tempArgumentObj = {
              // 通过types.stringLiteral创建字符串字面量
              catchError: t.stringLiteral(
                catchConsole(filePath, funcName, "hbisedm log")
              ),
            };
            // 创建模板
            const temp = template(tryTemplate);

            let tryNode = temp(tempArgumentObj);

            // 获取父节点的函数体body
            let info = asyncPath.node.body;
            tryNode.block.body.push(...info.body);

            // console.log(asyncPath.node);

            // 将父节点的body替换成新创建的try语句
            info.body = [tryNode];
            // 到这里 基本结构成型
          },
        });
      },
    },
  };
};
