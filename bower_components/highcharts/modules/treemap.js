!function(t){"object"==typeof module&&module.exports?module.exports=t:t(Highcharts)}(function(t){var i=t.seriesTypes,e=t.map,o=t.merge,n=t.extend,l=t.extendClass,r=t.getOptions().plotOptions,s=function(){},a=t.each,h=t.grep,d=t.pick,c=t.Series,p=t.stableSort,u=t.Color,v=function(t,i,e){var o,e=e||this;for(o in t)t.hasOwnProperty(o)&&i.call(e,t[o],o,t)},g=function(t,i,e,o){return o=o||this,t=t||[],a(t,function(n,l){e=i.call(o,e,n,l,t)}),e},f=function(t,i,e){e=e||this,t=i.call(e,t),t!==!1&&f(t,i,e)};r.treemap=o(r.scatter,{showInLegend:!1,marker:!1,borderColor:"#E0E0E0",borderWidth:1,dataLabels:{enabled:!0,defer:!1,verticalAlign:"middle",formatter:function(){return this.point.name||this.point.id},inside:!0},tooltip:{headerFormat:"",pointFormat:"<b>{point.name}</b>: {point.node.val}</b><br/>"},layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,states:{hover:{borderColor:"#A0A0A0",brightness:i.heatmap?0:.1,shadow:!1}},drillUpButton:{position:{align:"right",x:-10,y:10}}}),i.treemap=l(i.scatter,o({pointAttrToOptions:{},pointArrayMap:["value"],axisTypes:i.heatmap?["xAxis","yAxis","colorAxis"]:["xAxis","yAxis"],optionalAxis:"colorAxis",getSymbol:s,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",translateColors:i.heatmap&&i.heatmap.prototype.translateColors},{type:"treemap",trackerGroups:["group","dataLabelsGroup"],pointClass:l(t.Point,{setVisible:i.pie.prototype.pointClass.prototype.setVisible}),getListOfParents:function(i,e){var o=g(i,function(t,i,e){return i=d(i.parent,""),void 0===t[i]&&(t[i]=[]),t[i].push(e),t},{});return v(o,function(i,o,n){""!==o&&-1===t.inArray(o,e)&&(a(i,function(t){n[""].push(t)}),delete n[o])}),o},getTree:function(){var t,i=this;return t=e(this.data,function(t){return t.id}),t=i.getListOfParents(this.data,t),i.nodeMap=[],t=i.buildNode("",-1,0,t,null),f(this.nodeMap[this.rootNode],function(t){var e=!1,o=t.parent;return t.visible=!0,(o||""===o)&&(e=i.nodeMap[o]),e}),f(this.nodeMap[this.rootNode].children,function(t){var i=!1;return a(t,function(t){t.visible=!0,t.children.length&&(i=(i||[]).concat(t.children))}),i}),this.setTreeValues(t),t},init:function(t,i){c.prototype.init.call(this,t,i),this.options.allowDrillToNode&&this.drillTo()},buildNode:function(t,i,e,o,n){var l,r=this,s=[],h=r.points[i];return a(o[t]||[],function(i){l=r.buildNode(r.points[i].id,i,e+1,o,t),s.push(l)}),i={id:t,i:i,children:s,level:e,parent:n,visible:!1},r.nodeMap[i.id]=i,h&&(h.node=i),i},setTreeValues:function(t){var i,e=this,o=e.options,l=0,r=[],s=e.points[t.i];return a(t.children,function(t){t=e.setTreeValues(t),r.push(t),t.ignore?f(t.children,function(t){var i=!1;return a(t,function(t){n(t,{ignore:!0,isLeaf:!1,visible:!1}),t.children.length&&(i=(i||[]).concat(t.children))}),i}):l+=t.val}),p(r,function(t,i){return t.sortIndex-i.sortIndex}),i=d(s&&s.value,l),n(t,{children:r,childrenTotal:l,ignore:!(d(s&&s.visible,!0)&&i>0),isLeaf:t.visible&&!l,levelDynamic:o.levelIsConstant?t.level:t.level-e.nodeMap[e.rootNode].level,name:d(s&&s.name,""),sortIndex:d(s&&s.sortIndex,-i),val:i}),t},calculateChildrenAreas:function(t,i){var e=this,n=e.options,l=this.levelMap[t.levelDynamic+1],r=d(e[l&&l.layoutAlgorithm]&&l.layoutAlgorithm,n.layoutAlgorithm),s=n.alternateStartingDirection,c=[],n=h(t.children,function(t){return!t.ignore});l&&l.layoutStartingDirection&&(i.direction="vertical"===l.layoutStartingDirection?0:1),c=e[r](i,n),a(n,function(t,n){var l=c[n];t.values=o(l,{val:t.childrenTotal,direction:s?1-i.direction:i.direction}),t.pointValues=o(l,{x:l.x/e.axisRatio,width:l.width/e.axisRatio}),t.children.length&&e.calculateChildrenAreas(t,t.values)})},setPointValues:function(){var t=this.xAxis,i=this.yAxis;a(this.points,function(e){var o,n,l,r=e.node.pointValues;r?(o=Math.round(t.translate(r.x,0,0,0,1)),n=Math.round(t.translate(r.x+r.width,0,0,0,1)),l=Math.round(i.translate(r.y,0,0,0,1)),r=Math.round(i.translate(r.y+r.height,0,0,0,1)),e.shapeType="rect",e.shapeArgs={x:Math.min(o,n),y:Math.min(l,r),width:Math.abs(n-o),height:Math.abs(r-l)},e.plotX=e.shapeArgs.x+e.shapeArgs.width/2,e.plotY=e.shapeArgs.y+e.shapeArgs.height/2):(delete e.plotX,delete e.plotY)})},setColorRecursive:function(t,i){var e,o,n=this;t&&(e=n.points[t.i],o=n.levelMap[t.levelDynamic],i=d(e&&e.options.color,o&&o.color,i),e&&(e.color=i),t.children.length&&a(t.children,function(t){n.setColorRecursive(t,i)}))},algorithmGroup:function(t,i,e,o){this.height=t,this.width=i,this.plot=o,this.startDirection=this.direction=e,this.lH=this.nH=this.lW=this.nW=this.total=0,this.elArr=[],this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(t,i){return Math.max(t/i,i/t)}},this.addElement=function(t){this.lP.total=this.elArr[this.elArr.length-1],this.total+=t,0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH)),this.elArr.push(t)},this.reset=function(){this.lW=this.nW=0,this.elArr=[],this.total=0}},algorithmCalcPoints:function(t,i,e,o){var n,l,r,s,h,d=e.lW,c=e.lH,p=e.plot,u=0,v=e.elArr.length-1;i?(d=e.nW,c=e.nH):h=e.elArr[e.elArr.length-1],a(e.elArr,function(t){(i||v>u)&&(0===e.direction?(n=p.x,l=p.y,r=d,s=t/r):(n=p.x,l=p.y,s=c,r=t/s),o.push({x:n,y:l,width:r,height:s}),0===e.direction?p.y+=s:p.x+=r),u+=1}),e.reset(),0===e.direction?e.width-=d:e.height-=c,p.y=p.parent.y+(p.parent.height-e.height),p.x=p.parent.x+(p.parent.width-e.width),t&&(e.direction=1-e.direction),i||e.addElement(h)},algorithmLowAspectRatio:function(t,i,e){var o,n=[],l=this,r={x:i.x,y:i.y,parent:i},s=0,h=e.length-1,d=new this.algorithmGroup(i.height,i.width,i.direction,r);return a(e,function(e){o=i.width*i.height*(e.val/i.val),d.addElement(o),d.lP.nR>d.lP.lR&&l.algorithmCalcPoints(t,!1,d,n,r),s===h&&l.algorithmCalcPoints(t,!0,d,n,r),s+=1}),n},algorithmFill:function(t,i,e){var o,n,l,r,s,h=[],d=i.direction,c=i.x,p=i.y,u=i.width,v=i.height;return a(e,function(e){o=i.width*i.height*(e.val/i.val),n=c,l=p,0===d?(s=v,r=o/s,u-=r,c+=r):(r=u,s=o/r,v-=s,p+=s),h.push({x:n,y:l,width:r,height:s}),t&&(d=1-d)}),h},strip:function(t,i){return this.algorithmLowAspectRatio(!1,t,i)},squarified:function(t,i){return this.algorithmLowAspectRatio(!0,t,i)},sliceAndDice:function(t,i){return this.algorithmFill(!0,t,i)},stripes:function(t,i){return this.algorithmFill(!1,t,i)},translate:function(){var t,i;c.prototype.translate.call(this),this.rootNode=d(this.options.rootId,""),this.levelMap=g(this.options.levels,function(t,i){return t[i.level]=i,t},{}),i=this.tree=this.getTree(),this.axisRatio=this.xAxis.len/this.yAxis.len,this.nodeMap[""].pointValues=t={x:0,y:0,width:100,height:100},this.nodeMap[""].values=t=o(t,{width:t.width*this.axisRatio,direction:"vertical"===this.options.layoutStartingDirection?0:1,val:i.val}),this.calculateChildrenAreas(i,t),this.colorAxis?this.translateColors():this.options.colorByPoint||this.setColorRecursive(this.tree,void 0),i=this.nodeMap[this.rootNode].pointValues,this.xAxis.setExtremes(i.x,i.x+i.width,!1),this.yAxis.setExtremes(i.y,i.y+i.height,!1),this.xAxis.setScale(),this.yAxis.setScale(),this.setPointValues()},drawDataLabels:function(){var t,i,e=this,n=h(e.points,function(t){return t.node.visible});a(n,function(n){i=e.levelMap[n.node.levelDynamic],t={style:{}},n.node.isLeaf||(t.enabled=!1),i&&i.dataLabels&&(t=o(t,i.dataLabels),e._hasPointLabels=!0),n.shapeArgs&&(t.style.width=n.shapeArgs.width),n.dlOptions=o(t,n.options.dataLabels)}),c.prototype.drawDataLabels.call(this)},alignDataLabel:i.column.prototype.alignDataLabel,pointAttribs:function(t,i){var e=this.levelMap[t.node.levelDynamic]||{},o=this.options,n=i&&o.states[i]||{},e={stroke:t.borderColor||e.borderColor||n.borderColor||o.borderColor,"stroke-width":d(t.borderWidth,e.borderWidth,n.borderWidth,o.borderWidth),dashstyle:t.borderDashStyle||e.borderDashStyle||n.borderDashStyle||o.borderDashStyle,fill:t.color||this.color,zIndex:"hover"===i?1:0};return t.node.level<=this.nodeMap[this.rootNode].level?(e.fill="none",e["stroke-width"]=0):t.node.isLeaf?i&&(e.fill=u(e.fill).brighten(n.brightness).get()):e.fill=d(o.interactByLeaf,!o.allowDrillToNode)?"none":u(e.fill).setOpacity("hover"===i?.75:.15).get(),e},drawPoints:function(){var t=this,e=h(t.points,function(t){return t.node.visible});a(e,function(i){var e="levelGroup-"+i.node.levelDynamic;t[e]||(t[e]=t.chart.renderer.g(e).attr({zIndex:1e3-i.node.levelDynamic}).add(t.group)),i.group=t[e],i.pointAttr={"":t.pointAttribs(i),hover:t.pointAttribs(i,"hover"),select:{}}}),i.column.prototype.drawPoints.call(this),t.options.allowDrillToNode&&a(e,function(i){var e;i.graphic&&(e=i.drillId=t.options.interactByLeaf?t.drillToByLeaf(i):t.drillToByGroup(i),i.graphic.css({cursor:e?"pointer":"default"}))})},drillTo:function(){var i=this;t.addEvent(i,"click",function(t){var e,t=t.point,o=t.drillId;o&&(e=i.nodeMap[i.rootNode].name||i.rootNode,t.setState(""),i.drillToNode(o),i.showDrillUpButton(e))})},drillToByGroup:function(t){var i=!1;return t.node.level-this.nodeMap[this.rootNode].level!==1||t.node.isLeaf||(i=t.id),i},drillToByLeaf:function(t){var i=!1;if(t.node.parent!==this.rootNode&&t.node.isLeaf)for(t=t.node;!i;)t=this.nodeMap[t.parent],t.parent===this.rootNode&&(i=t.id);return i},drillUp:function(){var t=null;this.rootNode&&(t=this.nodeMap[this.rootNode],t=null!==t.parent?this.nodeMap[t.parent]:this.nodeMap[""]),null!==t&&(this.drillToNode(t.id),""===t.id?this.drillUpButton=this.drillUpButton.destroy():(t=this.nodeMap[t.parent],this.showDrillUpButton(t.name||t.id)))},drillToNode:function(t){this.options.rootId=t,this.isDirty=!0,this.chart.redraw()},showDrillUpButton:function(t){var i,e,o=this,t=t||"< Back",n=o.options.drillUpButton;n.text&&(t=n.text),this.drillUpButton?this.drillUpButton.attr({text:t}).align():(e=(i=n.theme)&&i.states,this.drillUpButton=this.chart.renderer.button(t,null,null,function(){o.drillUp()},i,e&&e.hover,e&&e.select).attr({align:n.position.align,zIndex:9}).add().align(n.position,!1,n.relativeTo||"plotBox"))},buildKDTree:s,drawLegendSymbol:t.LegendSymbolMixin.drawRectangle,getExtremes:function(){c.prototype.getExtremes.call(this,this.colorValueData),this.valueMin=this.dataMin,this.valueMax=this.dataMax,c.prototype.getExtremes.call(this)},getExtremesFromAll:!0,bindAxes:function(){var i={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};c.prototype.bindAxes.call(this),t.extend(this.yAxis.options,i),t.extend(this.xAxis.options,i)}}))});