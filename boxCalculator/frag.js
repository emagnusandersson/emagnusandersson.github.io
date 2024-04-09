
//////////////////////////////////////////////////////////////
var strSheet=`
     w        d        w        d
┌──────────┬──────┬──────────┬──────┐
│          │      │          │      │   yFoldFlap
│··········╵······╵··········╵······└┐
│          ·      ·          ·      ·│
│          ·      ·          ·      ·│  h
│          ·      ·          ·      ·│
│··········╷······╷··········╷······┌┘
│          │      │          │      │
└──────────┴──────┴──────────┴──────┘
`
//pre.myAppend(strSheet)
//////////////////////////////////////////////////////////////
var labW=createElement('label').prop({for:'inpW'})
var labD=createElement('label').prop({for:'inpD'})
var labH=createElement('label').prop({for:'inpH'})
var labT=createElement('label').prop({for:'inpT'})
var labG=createElement('label').prop({for:'inpG'})
var inpW=createElement('input').prop({type:'number', min:1}).attr('value',1)
var inpD=createElement('input').prop({type:'number', min:1}).attr('value',1)
var inpH=createElement('input').prop({type:'number', min:1}).attr('value',1)
var inpT=createElement('input').prop({type:'number', min:0}).attr('value',1)
var inpG=createElement('input').prop({type:'number', min:0}).attr('value',1)
//////////////////////////////////////////////////////////////
  Str.push(`X= [${XMark.join(', ')}]`)
  Str.push(`Y= [${YMark.join(', ')}]`)
  Str.push(`(yFoldFlap:${yFoldFlap})`)
//////////////////////////////////////////////////////////////
//   pre.myAppend(`Mark up the sheet according the calculated values (once Go is pressed):
//      X (left-to-right in the picture below)
//      Y (down-to-top in the picture below)
// X-/Y- numbers in parentheses are for folding only.
// Cut the solid lines, and fold the dotted lines.
// Glue the overlap-flap and put it together.\n\n`)
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////