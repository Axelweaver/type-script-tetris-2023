var O=Object.defineProperty;var N=(o,t,e)=>t in o?O(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var l=(o,t,e)=>(N(o,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const h of s.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();function F(o,t){o!=null&&o.clearRect(t.positionX,t.positionY,t.width,t.height)}function T(o,t,e,r,i,s,h){if(o==null)return;const a=Math.round(s*.1);o.strokeStyle=t,o.beginPath(),o.lineWidth=1,o.moveTo(r+a,i+h-a),o.lineTo(r+a,i+a),o.lineTo(r+s-a,i+a),o.stroke(),o.beginPath(),o.strokeStyle=e,o.moveTo(r+a,i+h-a),o.lineTo(r-a+s,i+h-a),o.lineTo(r-a+s,i+a),o.stroke()}function y(o,t,e,r,i,s){o!=null&&(o.strokeStyle=t,o.strokeRect(e,r,i,s))}function S(o,t,e,r,i,s){o!=null&&(o.fillStyle=t,o.fillRect(e,r,i,s))}function _(o,t,e,r){o!=null&&(o.fillStyle=e,o.font=t.font,o.textAlign=t.align,o.textBaseline="middle",o.fillText(r,t.positionX,t.positionY))}function A(o,t){return Math.floor(Math.random()*(t-o+1))+o}function U(o){const t=o.length-1;return o.map((r,i)=>r.map((s,h)=>o[t-h][i]))}const Y="#gameCanvas",w=10,g=20,u=2,X=-2,B=3,b=94,f="#F0FFF0",q="#800000",R=[[[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],[[1,1,1],[0,0,1],[0,0,0]],[[1,1,1],[1,0,0],[0,0,0]],[[1,1],[1,1]],[[0,1,1],[1,1,0],[0,0,0]],[[1,1,1],[0,1,0],[0,0,0]],[[1,1,0],[0,1,1],[0,0,0]]],E=[["#87CEFA","#48D1CC","#AFEEEE"],["#B22222","#8B0000","#CD5C5C"],["#228B22","#006400","#98FB98"],["#0000CD","#00008B","#4169E1"],["#98FB98","#66CDAA","#7FFF00"],["#FFD700","#DAA520","#FFFACD"],["#FF69B4","#CD5C5C","#FFB6C1"]];class v{constructor(){l(this,"_matrix");l(this,"_color");l(this,"_darkColor");l(this,"_lightColor");l(this,"_rowIndex");l(this,"_columnIndex");l(this,"_width");l(this,"_height");this._matrix=R[A(0,R.length-1)];const t=E[A(0,E.length-1)];this._color=t[0],this._darkColor=t[1],this._lightColor=t[2],this._height=0,this._width=0,this._rowIndex=X,this._columnIndex=B,this._calcSize()}_calcSize(){const t=this._matrix.map(e=>e.map((r,i)=>r===1?i+1:0)).filter(e=>e.length!==0).flatMap(e=>e);this._width=Math.max(...t),this._height=this._matrix.filter(e=>e.some(r=>r===1)).length}_checkAndNormalize(){for(;this._matrix[0].every(t=>t===0);)this._matrix=this._matrix.slice(1).concat([new Array(this._matrix.length).fill(0)]);for(;this._matrix.every(t=>t[0]===0);)this._matrix=this._matrix.map(t=>t.slice(1).concat([0]))}get matrix(){return this._matrix}get color(){return this._color}get darkColor(){return this._darkColor}get lightColor(){return this._lightColor}get rowIndex(){return this._rowIndex}get columnIndex(){return this._columnIndex}get width(){return this._width}get height(){return this._height}setMatrix(t){this._matrix=t,this._checkAndNormalize(),this._calcSize()}moveUp(){--this._rowIndex}moveDown(){++this._rowIndex}moveLeft(){--this._columnIndex}moveRight(){++this._columnIndex}rotate(){this._matrix=U(this._matrix),this._checkAndNormalize(),this._calcSize()}}class z{constructor(){l(this,"_coloredMatrix");this._coloredMatrix=[];for(let t=0;t<g;++t)this._coloredMatrix.push(new Array(w).fill({color:"",darkColor:"",lightColor:"",value:0}))}merge(t){t.matrix.forEach((e,r)=>{e.forEach((i,s)=>{const h=t.rowIndex+r;if(i===1&&h>=0){const a=s+t.columnIndex;this._coloredMatrix[h][a]={color:t.color,darkColor:t.darkColor,lightColor:t.lightColor,value:1}}})})}isCollision(t){for(let e=0;e<t.matrix.length;++e)for(let r=0;r<t.matrix[e].length;++r)if(t.matrix[e][r]===1&&this._coloredMatrix[e+t.rowIndex][r+t.columnIndex].value===1)return!0;return!1}hasFullRows(){return!!this._coloredMatrix.some(t=>t.every(e=>e.value===1))}_getFullRowIndexes(){return this._coloredMatrix.map((e,r)=>e.every(i=>(i==null?void 0:i.value)===1)?r:0).filter(e=>e>0)}getFullRowsCount(){return this._getFullRowIndexes().length}removeFullRows(){const t=this._getFullRowIndexes(),e=t.length,r=Math.min(...t);this._coloredMatrix.splice(r,e);for(let i=0;i<e;++i)this._coloredMatrix.unshift(new Array(w).fill({color:"",darkColor:"",lightColor:"",value:0}))}isOver(){return this._coloredMatrix[0].some(t=>t.value===1)}get coloredMatrix(){return this._coloredMatrix}}function K(o){return t=>{(t.code==="ArrowLeft"||t.key==="ArrowLeft"||t.code==="KeyA"||t.key.toUpperCase()==="A")&&(o.moveLeft=!0),(t.code==="ArrowRight"||t.key==="ArrowRight"||t.code==="KeyD"||t.key.toUpperCase()==="D")&&(o.moveRight=!0),(t.code==="ArrowDown"||t.key==="ArrowDown"||t.code==="KeyS"||t.key.toUpperCase()==="S")&&(o.moveDown=!0),(t.code==="ArrowUp"||t.key==="ArrowUp"||t.code==="KeyW"||t.key.toUpperCase()==="W")&&(o.rotateFigure=!0)}}function P(o){return t=>{(t.code==="ArrowLeft"||t.key==="ArrowLeft"||t.code==="KeyA"||t.key.toUpperCase()==="A")&&(o.moveLeft=!1),(t.code==="ArrowRight"||t.key==="ArrowRight"||t.code==="KeyD"||t.key.toUpperCase()==="D")&&(o.moveRight=!1),(t.code==="ArrowDown"||t.key==="ArrowDown"||t.code==="KeyS"||t.key.toUpperCase()==="S")&&(o.moveDown=!1),(t.code==="ArrowUp"||t.key==="ArrowUp"||t.code==="KeyW"||t.key.toUpperCase()==="W")&&(o.rotateFigure=!1)}}class W{constructor(t){l(this,"canvas");l(this,"_context");l(this,"_gameField");l(this,"_nextFigureField");l(this,"_scoreField");l(this,"_textInfo");l(this,"_secondaryTextInfo");l(this,"_gameSquare");this.canvas=document.querySelector(t),this._context=this.canvas.getContext("2d");const e=Math.round(this.canvas.width/2);this._gameField={positionX:Math.round(this.canvas.width/2)-Math.round(e/2),positionY:Math.round(this.canvas.height/2)-Math.round(e/2)*2,width:e,height:e*2},this._nextFigureField={positionX:this._gameField.positionX+this._gameField.width+Math.round(e/8),positionY:this._gameField.positionY+Math.round(e/8),width:Math.round(e/4),height:Math.round(e/4)*2},this._scoreField={positionX:12,positionY:this._nextFigureField.positionY-20,width:Math.round(this.canvas.width/4)-18,height:this._gameField.height},this._textInfo={positionX:Math.round(this.canvas.width/2),positionY:Math.round(this.canvas.height/2),fontSize:Math.round(this.canvas.width/18),font:"",align:"center"},this._textInfo.font=`bold ${this._textInfo.fontSize}px Cascadia Mono SemiBold`,this._secondaryTextInfo={positionX:Math.round(this.canvas.width/2),positionY:Math.round(this.canvas.height/2)+Math.round(this.canvas.height/5),fontSize:Math.round(this.canvas.width/22),font:"",align:"center"},this._secondaryTextInfo.font=`bold ${this._secondaryTextInfo.fontSize}px Cascadia Mono SemiBold`,this._gameSquare={width:Math.round(e/w)-u,height:Math.round(this._gameField.height/g)-u}}clearGameField(){F(this._context,this._gameField)}cleartNextFigure(){F(this._context,this._nextFigureField)}clearScoreInfo(){F(this._context,this._scoreField)}drawScoreInfo(t,e,r){const i=this._secondaryTextInfo;i.positionX=12,i.positionY=this._nextFigureField.positionY-20,i.font="bold 16px Cascadia Mono SemiBold",i.align="left",_(this._context,i,f,"SCORE:"),i.font="bold 20px Cascadia Mono SemiBold",i.positionY+=40,_(this._context,i,f,`${r}`.padStart(9,"0")),i.positionY+=80,i.font="bold 16px Cascadia Mono SemiBold",_(this._context,i,f,`LEVEL: ${t}`),i.positionY+=80,_(this._context,i,f,`LINES: ${e}`)}drawNextFigureField(){const t=this._secondaryTextInfo;t.positionX=this._nextFigureField.positionX,t.positionY=this._nextFigureField.positionY-20,t.font="bold 16px Cascadia Mono SemiBold",t.align="left",_(this._context,t,f,"N E X T:");for(let e=1;e<3;++e)y(this._context,f,this._nextFigureField.positionX-e,this._nextFigureField.positionY-e,this._nextFigureField.width+e*2,this._nextFigureField.height+e*2)}drawGameField(){for(let t=1;t<4;++t)y(this._context,f,this._gameField.positionX-u-t,this._gameField.positionY-u-t,this._gameField.width+u+t*2,this._gameField.height+u+t*2)}drawNextFigure(t){const e=Math.round(this._nextFigureField.width/5)-1;t.matrix.forEach((r,i)=>{r.forEach((s,h)=>{if(s===1){const a=this._nextFigureField.positionX+(h+1)*(e+1),G=this._nextFigureField.positionY+(i+3)*(e+1);S(this._context,t.color,a,G,e,e)}})})}drawGameFigure(t){t.matrix.forEach((e,r)=>{e.forEach((i,s)=>{i===1&&this.drawGameSquare(t.columnIndex+s,t.rowIndex+r,t.color,t.darkColor,t.lightColor)})})}drawGameSquare(t,e,r,i,s){if(e<0)return;const h=this._gameField.positionX+(this._gameSquare.width+u)*t,a=this._gameField.positionY+(this._gameSquare.height+u)*e;S(this._context,r,h,a,this._gameSquare.width,this._gameSquare.height),T(this._context,i,s,h,a,this._gameSquare.width,this._gameSquare.height)}drawFieldMatrix(t){t.coloredMatrix.forEach((e,r)=>{e.forEach((i,s)=>{(i==null?void 0:i.value)===1&&this.drawGameSquare(s,r,i==null?void 0:i.color,i==null?void 0:i.darkColor,i==null?void 0:i.lightColor)})})}drawInfo(t,e){_(this._context,this._textInfo,e,t)}drawSecondaryInfo(t,e){_(this._context,this._secondaryTextInfo,e,t)}}const m={moveLeft:!1,moveRight:!1,moveDown:!1,rotateFigure:!1};document.addEventListener("keydown",K(m));document.addEventListener("keyup",P(m));const d=new W(Y);let x=new v,n=new v,D=0,L=0;const c=new z,I=1;let C=0,M=0;function k(){if(d.clearGameField(),++L>10){if(m.moveLeft&&n.columnIndex>0&&(n.moveLeft(),c.isCollision(n)&&n.moveRight()),m.moveRight&&n.columnIndex+n.width<w&&(n.moveRight(),c.isCollision(n)&&n.moveLeft()),m.moveDown&&n.rowIndex+n.height<g&&(n.moveDown(),c.isCollision(n)&&(n.moveUp(),p())),m.rotateFigure&&n.rowIndex>=0){const o=n.matrix;for(n.rotate();n.columnIndex+n.width>=w;)n.moveLeft();(n.rowIndex+n.height>=g||c.isCollision(n))&&n.setMatrix(o)}L=0}if(++D>b&&(n.rowIndex+n.height<g&&(n.moveDown(),c.isCollision(n)&&(n.moveUp(),p())),n.rowIndex+n.height>=g&&p(),D=0),d.drawFieldMatrix(c),d.drawGameFigure(n),c.isOver()){V();return}requestAnimationFrame(()=>{k()})}function p(){c.merge(n),n=x,x=new v,d.cleartNextFigure(),d.drawNextFigure(x);const o=c.getFullRowsCount();o>0&&(C+=I*o*10,M+=o,c.removeFullRows(),d.clearScoreInfo(),d.drawScoreInfo(I,M,C))}function V(){d.drawInfo("GAME OVER",q)}d.drawGameField();d.drawNextFigureField();d.drawNextFigure(x);d.drawScoreInfo(I,M,C);k();
