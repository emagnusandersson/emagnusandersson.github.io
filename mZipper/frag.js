
var encoder=new TextEncoder('utf8');

var Uint8Head=new Uint8Array(14);
var tmp=encoder.encode("mZip");   Uint8Head.set(tmp, 0);  // strMZipID
writeAsBE(Uint8Head, 4, 2, 1);  // intVersion
writeAsBE(Uint8Head, 6, 8, 0);  // intSizeArchive

var Uint8FootB=new Uint8Array(8);
writeAsBE(Uint8FootB, 0, 8, 0);  // iFoot

prepareCustomData=function(Obj){ // Obj=[obj,obj...];  // keys of object: 'name', 'data'
  for(var i=0;i<Obj.length;i++){
    var obj=Obj[i];
    var Uint8Name=encoder.encode(obj.name);

  }
}
crArchiveFoot=function(ObjFNameNSize,arrVName){

  var nAList=0, nASum=0;
  var iStrFList=2+nAList+nASum; 

  var Uint8FList=encoder.encode('sha256:64'), nFList=Uint8FList.length;
  var iStrVList=iStrFList+2+nFList,   Uint8VList=encoder.encode(''), nVList=Uint8VList.length;
  var iFileFootStart=iStrVList+2+nVList;

  var Uint8Foot=new Uint8Array(iFileFootStart);
  writeAsBE(Uint8Foot, iStrAList, 2, nFList);
  writeAsBE(Uint8Foot, iStrFList, 2, nFList);
  Uint8Foot.set(Uint8FList, iStrFList+2);
  return Uint8Foot;
}

var regTxt=RegExp('^(.*)\\.txt$');
var crFileFoot=function(file,intSizeCompressed){

  var Uint8Name=encoder.encode(file.name), nName=Uint8Name.length;

  var iFData=30 +nName; 
  var nFSum=64;
  var iVDeclarationN=iFData+nFSum, nVListN=0, nVSum=0;
  var iVData=iVDeclarationN+nVListN;
  var iLDeclaration=iVData+nVSum, nLList=0, nLSum=0;
  var iLData=iLDeclaration+2+nLList;
  var iNext=iLData+nLSum;


  var Uint8FootFile=new Uint8Array(iNext);
  tmp=regTxt.test(file.name)?1:0;    writeAsBE(Uint8FootFile, 0, 4, tmp);  // intCompressionMethod
  writeAsBE(Uint8FootFile, 4, 8, file.lastModified/1000);  // tLastMod
  writeAsBE(Uint8FootFile, 12, 8, intSizeCompressed);  // intSizeCompressed
  writeAsBE(Uint8FootFile, 20, 8, file.size);  // intSize
  writeAsBE(Uint8FootFile, 28, 2, nName);  // nName
  Uint8FootFile.set(Uint8Name, 30);  // Uint8Name

  var tmp=encoder.encode(strHash);   Uint8FootFile.set(tmp, 30+nName);  // Fixed data field 

  return Uint8FootFile;
 
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
prepareCustomData=function(Obj){ // Obj=[obj,obj...];  // keys of object: 'name', 'data'
  for(var i=0;i<Obj.length;i++){
    var obj=Obj[i];
    var Uint8Name=encoder.encode(obj.name);

  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  var saveButtonClick=function*(event) {
    var link=document.createElement("a");
    link.download='abc.mZip';
    var len=Uint8File.length, lenSumFile=0;
    for(var i=0;i<len;i++){  lenSumFile+=Uint8File[i].length;  }
    var Len=new Uint8Array(len*4);
    var Uint8Wr=new Uint8Array(lenSumFile+len*4), iCur=0;
    for(var i=0;i<len;i++){
      var lenTmp=Uint8File[i].length;
      writeAsBE(Len, i*4, 4, lenTmp);
      Uint8Wr.set(Uint8File[i], iCur);
      iCur+=lenTmp;
    }
    Uint8Wr.set(Len,lenSumFile);

    link.href=window.URL.createObjectURL(new Blob([Uint8Wr], {type: 'text/csv'}));
    document.body.appendChild(link);  link.click();    document.body.removeChild(link);

    event.preventDefault();
    return false;
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
crHead=function(){
  var Parts=[];
  Parts.push(encoder.encode("mZip"));   // strMZipID
  Parts.push(encodeAsBE(2, 1));  // intVersion
  Parts.push(encodeAsBE(8, 0));  // intSizeArchive
  return Parts;
}
crIMeta=function(iMeta){
  var Parts=[];
  Parts.push(encodeAsBE(8, iMeta));  // iMeta
  return Parts;
}
crObjMeta=function(){
  var Parts=[];
  Parts.push(encodeAsBE(2, 0));    // nAList
  var Uint8FList=encoder.encode('sha256:64'), nFList=Uint8FList.length;      Parts.push(encodeAsBE(2, nFList), Uint8FList);     // nFList, Uint8FList
  Parts.push(encodeAsBE(2, 0));    // nVList
  return Parts;
}

var crFileFoot=function(file, intSizeCompressed, boCompress, strSha256){
  var Parts=[];  
  var tmp=boCompress?1:0;       Parts.push(encodeAsBE(4, tmp));  // intCompressionMethod
  Parts.push(encodeAsBE(8, file.lastModified/1000));  // tLastMod
  Parts.push(encodeAsBE(8, intSizeCompressed));  // intSizeCompressed
  Parts.push(encodeAsBE(8, file.size));  // intSize
  var Uint8Name=encoder.encode(file.name), nName=Uint8Name.length;        Parts.push(encodeAsBE(2, nName), Uint8Name);  // nName, Uint8Name
  var tmp=encoder.encode(strSha256);     Parts.push(tmp);  // Fixed data field: strSha256
  return Parts; 
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
rdObjMeta=function(arrBuff,iMeta){
  var nAList=readAsBE(arrBuff,0,2);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
