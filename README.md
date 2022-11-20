# auto-add-try-catch-to-await-case

> 为await函数自动加入try-catch的babel插件

## 思路:

- 借助AST抽象语法树，遍历查找代码中的await关键字
- 找到await节点后，从父路径中查找声明的async函数，获取该函数的body（函数中包含的代码）
- 创建try/catch语句，将原来async的body放入其中
- 最后将async的body替换成创建的try/catch语句
