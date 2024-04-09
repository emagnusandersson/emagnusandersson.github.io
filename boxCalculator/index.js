
"use strict"

window.elHtml=document.documentElement; window.elBody=document.body;


var w=600, d=400, h=500

var t=3, xGlueOverlap=35

var calcXY=function(w,d,h, t){
  var yFoldFlap=Math.min(w,d)/2
  // var XMark=[w+t/2, w+d+1.5*t, 2*w+d+2.5*t, 2*w+2*d+3.5*t, 2*w+2*d+xGlueOverlap+4*t]
  // var YMark=[yFoldFlap+t/2, yFoldFlap+h+1.5*t, 2*yFoldFlap+h+2*t]
  var XMark=[0, w, w+t,   w+d+t, w+d+2*t,   2*w+d+2*t, 2*w+d+3*t,   2*w+2*d+3*t, 2*w+2*d+4*t,   2*w+2*d+xGlueOverlap+4*t]
  var YMark=[0,yFoldFlap, yFoldFlap+t,   yFoldFlap+h+t, yFoldFlap+h+2*t,   2*yFoldFlap+h+2*t]

  return {XMark,YMark, yFoldFlap}
}
var formatXY=function(XMark, YMark, yFoldFlap){
  var Str=[]
  XMark[8]=`(${XMark[8]})`
  YMark[1]=`(${YMark[1]})`
  YMark[4]=`(${YMark[4]})`
  Str.push(`X= [${XMark.join(', ')}]`)
  Str.push(`Y= [${YMark.join(', ')}]`)
  Str.push(`(yFoldFlap:${yFoldFlap})`)
  var wSheet=XMark[XMark.length-1],  hSheet=YMark[YMark.length-1]
  Str.push(`Total sheet: wSheet:${wSheet}, hSheet:${hSheet} (Area:${wSheet*hSheet})`)
  Str.push(`\n`)
  return Str.join('\n')
}
var cbCalc=function(ev){
  var Val=[]
  for(var i=0;i<nInp;i++){ Val[i]=Number(Inp[i].value) }
  localStorage.setItem('Val',JSON.stringify(Val))
  var [w, d, h, t, xGlueOverlap]=Val
  
  
  pre.empty()
  
  pre.myAppend(`Mark up the sheet according to:
     X (left-to-right in the picture below)
     Y (down-to-top in the picture below)
X-/Y- numbers in parentheses are for folding only.
Cut the solid lines, and fold the dotted lines.
Glue the overlap-flap and put it together.\n\n`)

  var {XMark, YMark, yFoldFlap}=calcXY(w,d,h,t)
  pre.myAppend(`Alt 1 (w=${w}, d=${d}, h=${h})\n`)
  pre.myAppend(formatXY(XMark, YMark, yFoldFlap))

  var {XMark, YMark, yFoldFlap}=calcXY(w,h,d,t)
  pre.myAppend(`Alt 2 (w=${w}, d=${h}, h=${d})\n`)
  pre.myAppend(formatXY(XMark, YMark, yFoldFlap))

  var {XMark, YMark, yFoldFlap}=calcXY(d,h,w,t)
  pre.myAppend(`Alt 3 (w=${d}, d=${h}, h=${w})\n`)
  pre.myAppend(formatXY(XMark, YMark, yFoldFlap))

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
var pIntro=createElement('p').myAppend(`w (width), d (depth) and h (height) are the inner dimensions of the box`).css({'margin-right':'0.4em'})
var butGo=createElement('button').myText('Go').on('click',cbCalc)
var optionMM=createElement('option').myHtml('mm').prop({value:'mm'})
var optionImp=createElement('option').myHtml('inch').prop({value:'inch'})
var selUnit=createElement('select').myAppend(optionMM, optionImp).css({'margin-right':'0.4em'})
var spanUnit=createElement('span').myAppend(`[dimensionless (so mm, inch or whatever)]`).css({'margin-right':'0.4em'})
elBody.myAppend(pIntro, ...El, spanUnit, butGo)


var pre=createElement('pre');
elBody.myAppend(pre)
var img=createElement('img').prop({src:'cardbordBox.png'})
var figcaption=createElement('figcaption').myAppend(``)
var fig=createElement('figure').myAppend(img,figcaption)
elBody.myAppend(fig)

