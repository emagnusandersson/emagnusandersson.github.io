
"use strict"

window.elHtml=document.documentElement; window.elBody=document.body;


var w=600, d=400, h=500

var t=3, xGlueOverlap=35

var cbCalc=function(ev){

  var Val=[]
  for(var i=0;i<nInp;i++){ Val[i]=Number(Inp[i].value) }
  localStorage.setItem('Val',JSON.stringify(Val))
  var [w, d, h, t, xGlueOverlap]=Val
  
  
  pre.empty()
  //pre.myAppend(`w:${w}, d:${d}, h:${h}, t(thickness of cardboard):${t}, xGlueOverlap:${xGlueOverlap}\n`)
  var yFoldFlap=Math.min(w,d)/2
  pre.myAppend(`yFoldFlap:${yFoldFlap}\n`)
  // var XMark=[w+t/2, w+d+1.5*t, 2*w+d+2.5*t, 2*w+2*d+3.5*t, 2*w+2*d+xGlueOverlap+4*t]
  // var YMark=[yFoldFlap+t/2, yFoldFlap+h+1.5*t, 2*yFoldFlap+h+2*t]
  var XMark=[w, w+t,   w+d+t, w+d+2*t,   2*w+d+2*t, 2*w+d+3*t,   2*w+2*d+3*t, 2*w+2*d+4*t,   2*w+2*d+xGlueOverlap+4*t]
  var YMark=[yFoldFlap, yFoldFlap+t,   yFoldFlap+h+t, yFoldFlap+h+2*t,   2*yFoldFlap+h+2*t]
  
  var wSheet=XMark[XMark.length-1]
  var hSheet=YMark[YMark.length-1]
  pre.myAppend(`wSheet:${wSheet}, hSheet:${hSheet}\n\n`)
  pre.myAppend(`XMark: ${XMark.join(', ')}\n`)
  pre.myAppend(`YMark: ${YMark.join(', ')}\n`)
  pre.myAppend(`\nMark up the sheet according to:
     XMark (left-to-right in the picture below)
     YMark (top-down in the picture below)
Then cut the solid lines, and fold the dotted lines.
Glue the "GlueOverlap" and put it together.\n`)

}

var ValDefault=[600,400,500,3,35]
var Val=localStorage.getItem('Val')
if(Val){
  try{Val=JSON.parse(Val)}
  catch(err){Val=ValDefault}
} else {Val=ValDefault}
var StrInpKey=['w', 'd', 'h', 't', 'g'], nInp=StrInpKey.length
var StrLab=['w', 'd', 'h', 't (thickness of cardboard)', 'xGlueOverlap']
var El=[], Inp=[]
for(var i=0;i<nInp;i++){
  var strInpKey=StrInpKey[i], strInpKeyUC=strInpKey.toUpperCase()
  var strId=`inp${strInpKeyUC}`
  var lab=createElement('label').prop({for:strId}).myText(StrLab[i])
  var inp=createElement('input').prop({type:'number', min:0, id:strId}).attr('value',Val[i]).on('change',cbCalc).css({'margin-right':'0.4em'})
  Inp.push(inp); El.push(lab,inp)
}
var butGo=createElement('button').myText('Go').on('click',cbCalc)
var optionMM=createElement('option').myHtml('mm').prop({value:'mm'})
var optionImp=createElement('option').myHtml('inch').prop({value:'inch'})
var selUnit=createElement('select').myAppend(optionMM, optionImp).css({'margin-right':'0.4em'})
var spanUnit=createElement('span').myAppend(`[mm, inch or whatever]`).css({'margin-right':'0.4em'})
elBody.myAppend(...El, spanUnit, butGo)


var pre=createElement('pre');
elBody.myAppend(pre)
var img=createElement('img').prop({src:'cardbordBox.png'})
var figcaption=createElement('figcaption').myAppend(``)
var fig=createElement('figure').myAppend(img,figcaption)
elBody.myAppend(fig)

