
"use strict"


window.elHtml=document.documentElement; window.elBody=document.body;


var calcXY=function(w, d, h, t, xGlueOverlap){
  var yFoldFlap=Math.min(w,d)/2
  // var XMark=[w+t/2, w+d+1.5*t, 2*w+d+2.5*t, 2*w+2*d+3.5*t, 2*w+2*d+xGlueOverlap+4*t]
  // var YMark=[yFoldFlap+t/2, yFoldFlap+h+1.5*t, 2*yFoldFlap+h+2*t]
  var XMark=[0, w, w+t,   w+d+t, w+d+2*t,   2*w+d+2*t, 2*w+d+3*t,   2*w+2*d+3*t, 2*w+2*d+4*t,   2*w+2*d+xGlueOverlap+4*t]
  var YMark=[0,yFoldFlap, yFoldFlap+t,   yFoldFlap+h+t, yFoldFlap+h+2*t,   2*yFoldFlap+h+2*t]

  return {XMark, YMark, yFoldFlap}
}
var formatX=function(XMark){
  XMark[8]=`(${XMark[8]})`
  var str=`X= [${XMark.join(', ')}]`;
  return str
}
var formatY=function(YMark){
  YMark[1]=`(${YMark[1]})`
  YMark[4]=`(${YMark[4]})`
  var str=`Y= [${YMark.join(', ')}]`;
  return str
}
var formatSummary=function(XMark, YMark){
  var wSheet=XMark[XMark.length-1],  hSheet=YMark[YMark.length-1]
  var str=`Total sheet: ${wSheet} × ${hSheet} (Area: ${wSheet*hSheet})`;
  return str
}
var cbCalc=function(ev){
  spanErr.myText('')
  var Val=[]
  for(var i=0;i<nInp;i++){
    var val=Number(Inp[i].value); if(typeof val!='number'){spanErr.myText('Non-nummeric value'); return;};
    if(val<0){spanErr.myText('Error: negative input.'); return;};
    Val[i]=val;
  }
  localStorage.setItem('Val',JSON.stringify(Val))
  var [w, d, h, t, xGlueOverlap]=Val
  

  var ObjPerm=[]
  ObjPerm[0]=calcXY(w,d,h,t,xGlueOverlap); var {XMark, YMark, yFoldFlap}=ObjPerm[0];
  LabPerm[0].empty().myAppend(`Alt 1 (w=${w}, d=${d}, h=${h}), `, formatSummary(XMark, YMark, yFoldFlap))

  ObjPerm[1]=calcXY(w,h,d,t,xGlueOverlap); var {XMark, YMark, yFoldFlap}=ObjPerm[1];
  LabPerm[1].empty().myAppend(`Alt 2 (w=${w}, d=${h}, h=${d}), `, formatSummary(XMark, YMark, yFoldFlap))

  ObjPerm[2]=calcXY(d,h,w,t,xGlueOverlap); var {XMark, YMark, yFoldFlap}=ObjPerm[2];
  LabPerm[2].empty().myAppend(`Alt 3 (w=${d}, d=${h}, h=${w}), `, formatSummary(XMark, YMark, yFoldFlap))

  var inpPerm=formPerm.querySelector('input[type=radio]:checked'), iPerm=inpPerm.value
  var {XMark, YMark, yFoldFlap}=ObjPerm[iPerm];
  var strX=formatX(XMark); spanX.myText(strX);
  var strY=formatY(YMark); spanY.myText(strY);
}

var ValDefault=[600,400,500,3,35]
var Val=localStorage.getItem('Val')
if(Val){
  try{Val=JSON.parse(Val)}
  catch(err){Val=ValDefault}
} else {Val=ValDefault}
var StrInpKey=['w', 'd', 'h', 't', 'g'], nInp=StrInpKey.length
var StrLab=['w', 'd', 'h', 't', 'xGlueOverlap']
var El=[], Inp=[]
for(var i=0;i<nInp;i++){
  var strInpKey=StrInpKey[i], strInpKeyUC=strInpKey.toUpperCase()
  var strId=`inp${strInpKeyUC}`
  var lab=createElement('label').prop({for:strId}).myText(StrLab[i])
  var inp=createElement('input').prop({type:'number', min:0, id:strId}).attr('value',Val[i]).on('change',cbCalc).on('keyup',cbCalc).css({'margin-right':'0.4em'})
  Inp.push(inp); El.push(lab, inp)
}
var pIntro=createElement('p').myHtml(`Enter the (inner) box dimensions in the fields below:<br>
  w (width)<br>
  d (depth)<br>
  h (height)<br>
  t (thickness of cardboard).<br>
  xGlueOverlap (see image)`).css({'margin-right':'0.4em'})

var pDimensionless=createElement('p').myHtml(`Note! the values are dimensionless (so consider the dimensions as mm, inch or whatever)`).css({'margin-right':'0.4em'})
//var butGo=createElement('button').myText('Go').on('click',cbCalc)
var optionMM=createElement('option').myHtml('mm').prop({value:'mm'})
var optionImp=createElement('option').myHtml('inch').prop({value:'inch'})
var selUnit=createElement('select').myAppend(optionMM, optionImp).css({'margin-right':'0.4em'})
//var spanUnit=createElement('span').myAppend(`[dimensionless (so mm, inch or whatever)]`).css({'margin-right':'0.4em'})
var spanErr=createElement('span').css({color:'red'})


var headPerm=createElement('h3').myAppend(`Select "permutation"`)
var formPerm=createElement('form').css({ border:'1px solid', width:'fit-content'});
var LabPerm=[], InpPerm=[];
var br=createElement('br')
for(var i=0;i<3;i++){
  var lab=createElement('label'); //.css({background:'lightgrey', border:'1px solid', width:'fit-content'});
  var inp=createElement('input').attr({type:'radio', id:`${i}`, name:"fav_language", value:`${i}`}).on('click', cbCalc); //.css({background:'lightgrey', border:'1px solid', width:'fit-content'})
  LabPerm.push(lab), InpPerm.push(inp);
  formPerm.myAppend(inp, lab, br.cloneNode())
}
InpPerm[0].attr({checked:true});
var spanTip=createElement('span').myAppend(`Tip: Use the alternative with the smallest Area to reduce the required amount of cardboard.\n\n`)
var headResult=createElement('h3').myAppend(`Result`)
var spanX=createElement('p').css({'margin-left':'6em'}), spanY=createElement('span');


var img=createElement('img').prop({src:'cardbordBox.png'}).css({'vertical-align':'middle'})
// var figcaption=createElement('figcaption').myAppend(``)
// var fig=createElement('figure').myAppend(img,figcaption)

var divBreadB=createElement('div').myHtml(`Numbers in parentheses should not be cut (only folded (so you may want to mark them differently)).<br>
Cut the solid lines, and fold the dotted lines.<br>
Glue the overlap-flap and put it together.`)
elBody.myAppend(pIntro, pDimensionless, ...El, spanErr, headPerm, formPerm, spanTip, headResult, spanX, img, spanY, divBreadB)
cbCalc()

