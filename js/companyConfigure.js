function zTreeClick(event, treeId, treeNode) {
  //var treeObj = $.fn.zTree.getZTreeObj(treeNode.pId);
  //var node = treeObj.getNodeIndex();
  /*treeNode.id == 3是表单*/
  if (!treeNode.id) {
    return;
  } else {
    $("a span").css({
      "color": "#000000",
      "fontWeight": "normal"
    })
    $(".icon01_ico_docu").css({
      "background": "url(./images/inputIcon1.png) -1px -2px no-repeat"
    })
    $(".icon02_ico_docu").css({
      "background": "url(./images/inputIcon2.png) -1px -2px no-repeat"
    })
    if (treeNode.id == 2) {
      $("ul#inputConfig li").each(function(item) {
        $(this).css({
          "display": "none"
        });
      })
      $("ul#inputConfig li").eq(2).css({
        "display": "block"
      });
      /*改变click样式*/
      $("#" + treeNode.tId + "_span").css({
        "color": "#0490ef",
        "fontWeight": "bold"
      })
      $("#" + treeNode.tId + "_ico").css({
        "background": "url(./images/inputIconHover2.png) -1px -2px no-repeat"
      })
    } else if (treeNode.id == 3) {
      $("ul#inputConfig li").each(function(item) {
        $(this).css({
          "display": "none"
        });
      })
      $("ul#inputConfig li").eq(1).css({
        "display": "block"
      });
      /*改变hover样式*/
      $("#" + treeNode.tId + "_span").css({
        "color": "#0490ef",
        "fontWeight": "bold"
      })
      $("#" + treeNode.tId + "_ico").css({
        "background": "url(./images/inputIconHover1.png) -1px -2px no-repeat"
      })
    }
  }
};

/*新增节点*/

/*标记是文件夹还是子级*/
var flag = 0,
  inputORfile = 0,
  inputORfileFlag = 1;
/*获取select的option值*/

function getOption() {
  var country = document.getElementById("homeSelect");
  country.onchange = function() {
    if (country.options[country.selectedIndex].value == 1) {
      inputORfileFlag = 1;
    } else if (country.options[country.selectedIndex].value == 2) {
      inputORfileFlag = 2;
    }
  }
}

//添加弹出操作

function addNodes() {
  $("#radio1").on("click", function() {
    $(".lables").css({
      "background": "url(./images/lablesBg.png) 0px 15px no-repeat"
    });
    $(this).parent("lable").css({
      "background": "url(./images/lablesClickBg.png) 0px 15px no-repeat"
    });
    $("#types,#inputs,#uploadfile").css("display", "none");
    flag = 1;
  })
  $("#radio2").on("click", function() {
    $(".lables").css({
      "background": "url(./images/lablesBg.png) 0px 15px no-repeat"
    });
    $(this).parent("lable").css({
      "background": "url(./images/lablesClickBg.png) 0px 15px no-repeat"
    })
    $("#types").css("display", "block");
    var country = document.getElementById("type");
    country.onchange = function() {
      if (country.options[country.selectedIndex].value == 1) {
        $("#uploadfile").css("display", "block");
        $("#inputs").css("display", "none");
        inputORfile = 1;
      } else if (country.options[country.selectedIndex].value == 2) {
        $("#uploadfile").css("display", "none");
        $("#inputs").css("display", "block");
        inputORfile = 2;
      } else {
        $("#uploadfile,#inputs").css("display", "none");
      }
    }
    flag = 2;
  })
  getOption();
}

function addHoverDom(treeId, treeNode) {
  var sObj = $("#" + treeNode.tId + "_span"); //获取节点信息  
  if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
  var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='新增' onfocus='this.blur();'></span>"; //定义添加按钮  
  sObj.after(addStr); //加载添加按钮  
  var btn = $("#addBtn_" + treeNode.tId);
  //绑定添加事件，并定义添加操作  
  if (btn) btn.bind("click", function() {
    var zTree = $.fn.zTree.getZTreeObj("companyManage");
    var nodes = '<div class="alert-inputs clearfix"><div class="input-list"><span class="spans1"><font color="#f06a6b">*</font>选择级别：</span><span class="spans2"><select name="" id="homeSelect">';
    if (treeNode.id === 0) {
      nodes += '<option value="1">添加子节点</option>';
    } else if (treeNode.id === 1) {
      nodes += '<option value="1">添加同级节点</option><option value="2">添加子节点</option>';
    } else {
      nodes += '<option value="1">添加同级节点</option>';
    };
    nodes += '</select></span></div><div class="input-list"><span class="spans1"><font color="#f06a6b">*</font>节点名称：</span><span class="spans2"><input id="nodeNames" type="text"></span></div><div class="input-list"><span class="spans1"><font color="#f06a6b">*</font>节点类型：</span><span class="spans2"><lable class="lables"><input id="radio1" name="nodes" type="radio">&nbsp;分类节点</lable><lable class="lables"><input id="radio2" name="nodes" type="radio">&nbsp;叶子节点</lable></span></div><div class="input-list hidden" id="types"><span class="spans1"><font color="#f06a6b">*</font>选择类型：</span><span class="spans2"><select name="" id="type"><option value="0">请选择</option><option value="1">模板类</option><option value="2">表单类</option></select></span></div><div class="input-list hidden" id="inputs"><span class="spans1"><font color="#f06a6b">*</font>选择表单：</span><span class="spans2"><select name="" id=""><option value="0">请选择</option><option value="1">表单1</option><option value="2">表单2</option></select></span></div><div class="input-list hidden" id="uploadfile"><span class="spans1"><font color="#f06a6b">*</font>上传模板：</span><div class="fl"><div class="u-file-c fl u-file-btn"><i class="glass-icon"></i><input type="file" id="File" name="file" aria-invalid="false" class="valid">浏览</div><span class="fileName">未上传文件</span></div></div></div><script>addNodes();</script>';
    //询问框
    layer.confirm(nodes, {
      btn: ['确定', '取消'], //按钮
      title: '新增'
    }, function() {
      /*判断是添加的子节点还是同级节点*/
      if (treeNode.id === 0) {
        //只能子级
        if (flag == 1) {
          zTree.addNodes(treeNode, {
            id: 1,
            open: true,
            name: $("#nodeNames").val() || "addNodes name",
            iconSkin: "icon00"
          });
          layer.msg('添加成功！', {
            icon: 1
          });
        } else {
          inputORfile = inputORfile == 1 ? 1 : 2;
          ids = inputORfile == 1 ? 2 : 3;
          zTree.addNodes(treeNode, {
            id: ids,
            open: true,
            name: $("#nodeNames").val() || "addNodes name",
            iconSkin: "icon0" + inputORfile
          });
          layer.msg('添加成功！', {
            icon: 1
          });
        }
      } else if (treeNode.id === 1) {
        //同级或者子级
        //console.log(inputORfileFlag)
        var parentNode = treeNode.getParentNode();
        if (inputORfileFlag === 1) { //同级
          if (flag == 1) {
            zTree.addNodes(parentNode, {
              id: 1,
              open: true,
              name: $("#nodeNames").val() || "addNodes name",
              iconSkin: "icon00"
            });
            layer.msg('添加成功！', {
              icon: 1
            });
          } else {
            inputORfile = inputORfile == 1 ? 1 : 2;
            ids = inputORfile == 1 ? 2 : 3;
            console.log(ids + "----------" + inputORfile)
            zTree.addNodes(parentNode, {
              id: ids,
              open: true,
              name: $("#nodeNames").val() || "addNodes name",
              iconSkin: "icon0" + inputORfile
            });
            layer.msg('添加成功！', {
              icon: 1
            });
          }
        } else { //子级
          if (flag == 1) {
            zTree.addNodes(treeNode, {
              id: 1,
              open: true,
              name: $("#nodeNames").val() || "addNodes name",
              iconSkin: "icon00"
            });
            layer.msg('添加成功！', {
              icon: 1
            });
          } else {
            inputORfile = inputORfile == 1 ? 1 : 2;
            ids = inputORfile == 1 ? 2 : 3;
            zTree.addNodes(treeNode, {
              id: ids,
              open: true,
              name: $("#nodeNames").val() || "addNodes name",
              iconSkin: "icon0" + inputORfile
            });
            layer.msg('添加成功！', {
              icon: 1
            });
          }
        }
      } else {
        //只能同级 
        var parentNode = treeNode.getParentNode();
        if (flag == 1) {
          zTree.addNodes(parentNode, {
            id: 1,
            open: true,
            name: $("#nodeNames").val() || "addNodes name",
            iconSkin: "icon00"
          });
          layer.msg('添加成功！', {
            icon: 1
          });
        } else {
          inputORfile = inputORfile == 1 ? 1 : 2;
          ids = inputORfile == 1 ? 2 : 3;
          console.log(ids + "----------" + inputORfile)
          zTree.addNodes(parentNode, {
            id: ids,
            open: true,
            name: $("#nodeNames").val() || "addNodes name",
            iconSkin: "icon0" + inputORfile
          });
          layer.msg('添加成功！', {
            icon: 1
          });
        }
      };
      //console.log(treeNode)
    });
    inputORfileFlag = 1;
    return false;
  });
};

/*显示删除按钮*/

function showRemoveBtn(treeId, treeNode) {
  if (treeNode.id === 0) {
    return false;
  } else {
    return true;
  }
}

/*显示修改按钮*/

function showRenameBtn(treeId, treeNode) {
  if (treeNode.id === 0) {
    return false;
  } else {
    return true;
  }
}
/*防止重复添加问题*/

function removeHoverDom(treeId, treeNode) {
  $("#addBtn_" + treeNode.tId).unbind().remove();
};
/*禁止拖拽*/

function beforeDrag() {
  return false;
}
/*删除节点提示*/

function beforeRemove(treeId, treeNode) {
  var treeObj = $.fn.zTree.getZTreeObj("companyManage");
  var node = treeObj.getNodeByTId(treeNode.tId );
  //return confirm("确认删除节点" + treeNode.name + " 吗？"
  layer.confirm("确认删除节点" + treeNode.name + " 吗?", {
    btn: ['确定', '取消'],
    title: "提示"
  }, function(index) {
    deleteflag = true;
    layer.close(index);
    treeObj.removeNode(node);
  });
  return false;
}

var setting = {
  view: {
    addHoverDom: addHoverDom,
    removeHoverDom: removeHoverDom,
    selectedMulti: false
  },
  edit: {
    enable: true,
    editNameSelectAll: true,
    showRemoveBtn: showRemoveBtn,
    showRenameBtn: showRenameBtn,
    renameTitle: "修改",
    removeTitle: "删除"
  },
  data: {
    simpleData: {
      enable: true
    }
  },
  async: {
    expandSpeed: "2000"
  },
  callback: {
    beforeDrag: beforeDrag,
    beforeRemove: beforeRemove,
    onClick: zTreeClick
  }
};
var zNodes = {
  name: "贯标资料目录",
  open: true,
  id: 0,
  iconSkin: "icon00",
  children: [{
    name: "人力资源管理",
    open: true,
    id: 1,
    iconSkin: "icon00",
    children: [{
      id: 2,
      name: "模板",
      iconSkin: "icon01"
    }, {
      id: 3,
      name: "表单类节点名称",
      iconSkin: "icon02"
    }]
  }, {
    name: "人力资源管理",
    open: true,
    id: 1,
    iconSkin: "icon00",
    children: [{
      id: 2,
      name: "模板类节的名称点名称",
      iconSkin: "icon01"
    }, {
      id: 3,
      name: "表单类节点名称",
      iconSkin: "icon02"
    }]
  }, {
    name: "人力资源管理",
    open: true,
    id: 1,
    iconSkin: "icon00",
    children: [{
      id: 2,
      name: "模板类节的名称点名称",
      iconSkin: "icon01"
    }, {
      id: 3,
      name: "表单类节点名称",
      iconSkin: "icon02"
    }]
  }, {
    name: "人力资源管理",
    open: true,
    id: 1,
    iconSkin: "icon00",
    children: [{
      id: 2,
      name: "模板类节的名称点名称",
      iconSkin: "icon01"
    }, {
      id: 3,
      name: "表单类节点名称",
      iconSkin: "icon02"
    }]
  }]
};

/ * * /
$(function() {
  $.fn.zTree.init($("#companyManage"), setting, zNodes);
  / * 弹窗 * /
  $("#comBtn").on("click", function() {
    commonJs.alertWin('您确定收回xx公司的授权吗？', '授权收回成功！', "授权处理", function() {
      $("#canpanys").html("企业自己配置");
      $("#comBtn").remove();
    });
  });

});