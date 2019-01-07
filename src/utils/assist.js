/*   findComponentUpward 接收两个参数，第一个是当前上下文，
       比如你要基于哪个组件来向上寻找，
       一般都是基于当前组件，也就是传入this
       第二个就是要找的组件的name
*/
/*
    在while中不断向上覆盖当前的parent对象，
    通过判断组件的name与传入的componentName是否一致，
    直到找到最近的一个组件为止
*/
function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) {
      name = parent.$options.name;
    }
  }
  return parent;
}
export { findComponentUpward };

// 向上找到所有的指定组件
// 返回的是包含所有找到的组件实例

function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent);
    }
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}
export { findComponentsUpward };

// 向下找到最近的指定组件

/*
*   context.$children得到的是当前组件的所有子组件，
*   再遍历一遍，找到有没有匹配的组件name
*   没找到，继续递归找$children的$children
*   直到找到最近的一个
*/

function findComponentDownward(context, componentName) {
  const children = context.$children;
  let child = null;

  if (children.length) {
    for (const son of children) {
      const name = son.$options.name;

      if (name === componentName) {
        child = son;
        break;
      } else {
        child = findComponentDownward(son, componentName);
        if (child) break;
      }
    }
  }
  return child;
}
export { findComponentDownward };

// 向下找到所有的指定组件
function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child);
    }
    const foundSons = findComponentsDownward(child, componentName);
    return components.concat(foundSons);
  }, []);
}
export { findComponentsDownward };

// 找到指定的兄弟组件
/*
* 多了个参数expectMe，默认为true。
* 先获取context.$parent.$children，就是父组件的全部子组件，当然包括自身
* Vuejs渲染组件时，都会给每个组件加一个内置属性 _uid，它是不会重复的。
* */

function findBrothersComponents(context, componentName, expectMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (expectMe) {
    res.splice(index, 1);
  }
  return res;
}
export { findBrothersComponents };
