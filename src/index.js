// const a = 1;

// const foo = () => {
//   console.log(b);
// };

// foo();

// function square(n) {
//   return n * n;
// }

// foo === bar;

const bar = () => {
  console.log("bar..");
  throw new Error("hhh");
};

async function foo() {
  await bar();
}

// async function fn() {
//   await f();
// }

foo();
