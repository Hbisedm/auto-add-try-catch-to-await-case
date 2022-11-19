module.exports = function (babel) {
  let t = babel.types;
  return {
    visitor: {
      VariableDeclarator(path, state) {
        // VariableDeclarator 是要找的变量声明
        if (path.node.id.name == "a") {
          // 方式一：直接修改name
          path.node.id.name = "b";
          // 方式二：把id是a的ast换成b的ast
          // path.node.id = t.Identifier("b");
        }
      },
      //   BinaryExpression(path, state) {
      // console.log("path");
      // console.log(path.node.left);
      // console.log(path.get("left").isIdentifier({ name: "foo" }));
      // console.log(path.isReferencedIdentifier());
      // console.log(path.getStatementParent());
      // if (path.node.operator !== "===") {
      //   return;
      // }
      // console.log(path.get("left"));
      // path.node.left = t.identifier("sebmck");
      // console.log("state");
      // console.log(state);
      //   },
      Function(path) {
        // console.log("path.node ==> ");
        // console.log(path.node);
        // console.log("path.node <==");
      },
      //   Identifier: {
      // enter() {
      //   console.log("Entered!");
      // },
      // exit() {
      //   console.log("Exited!");
      // },
      //   },
    },
  };
};
