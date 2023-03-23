



export default function TreeCatalogue(TreeCatalogue) {
  var TreeCatalogue_result = [];
  var  i,pathList;
  for(i=0;i<TreeCatalogue.length;i++){
    pathList = TreeCatalogue[i].path.split("/");
    if(pathList.length === 1){
      TreeCatalogue[i].parepath = "top";
    }
    else{
      TreeCatalogue[i].parepath = TreeCatalogue[i].path.replace("/"+pathList[pathList.length-1],"");
    }
  }
  TreeCatalogue_result = generateOptions(TreeCatalogue);
  return TreeCatalogue_result;
}


// 开始递归方法
function generateOptions(params) {
  var pathList ;
  var result = []
  for (const param of params) {
    pathList = param.path.split("/");
    if (param.parepath === "top") {  // 判断是否为顶层节点
      var parent = {
        'name': pathList[pathList.length-1],
        'path': param.path,
        'key': param.path,
        'value':pathList[pathList.length-1],
        'label':param.path,
        'type':param.type,
      }
      parent.children = getchilds(parent.path, params)  // 获取子节点
      result.push(parent)
    }
  }
  return result
}

function getchilds(parename, array) {
  const childs = []
  var pathList;
  for (const arr of array) {
    // 循环获取子节点
    if (arr.parepath === parename) {
      pathList = arr.path.split("/");
      childs.push({
        'name': pathList[pathList.length-1],
        'path': arr.path,
        'key': arr.path,
        'type':arr.type,
        'children':[],
      })
    }
  }
  for (const child of childs) { // 获取子节点的子节点
    const childscopy = getchilds(child.path, array)// 递归获取子节点
    if (childscopy.length > 0) {
      child.children = childscopy
    }
  }
  return childs
}
