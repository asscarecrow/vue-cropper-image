webpackJsonp([1],{"5Qkr":function(t,e){},"7lgH":function(t,e,i){t.exports=i.p+"static/img/clock.b2741e9.jpg"},EoUZ:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("7+uW"),s=i("qsei"),r=i("7lgH"),o={name:"App",data:function(){return{src:r}},components:{cropper:s.a},methods:{setSrc:function(t){this.src=t.target.files[0]}}},a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("cropper",{attrs:{src:this.src,aspectRatio:16/9}})],1)},staticRenderFns:[]};var c=i("VU/8")(o,a,!1,function(t){i("UgKV")},null,null).exports;n.a.config.productionTip=!1,new n.a({el:"#app",components:{App:c},template:"<App/>"})},UgKV:function(t,e){},dRbE:function(t,e,i){"use strict";var n=i("woOf"),s=i.n(n),r=i("5SB6");i("VoX6");i("5Qkr");var o=null,a=null,c=null,p={props:{id:{type:String,default:"cropImg"},aspectRatio:Number,minCropBoxWidth:Number,minCropBoxHeight:Number,autoCropArea:Number,cropBoxResizable:Boolean,dragMode:{type:String,default:"crop"},name:{type:String,default:"src"},src:{type:String},url:{type:String,default:""}},data:function(){return{modelTop:0,show:!0,showPreview:!1,wrapperStyle:{width:"100%",height:"100%"},previewStyle:{width:"500px",height:"300px"},isH5:!0}},computed:{config:function(){var t={};return t.dragMode=this.dragMode,"number"==typeof this.aspectRatio&&(t.aspectRatio=this.aspectRatio),"number"==typeof this.minCropBoxWidth&&(t.minCropBoxWidth=this.minCropBoxWidth),"number"==typeof this.minCropBoxHeight&&(t.minCropBoxHeight=this.minCropBoxHeight),"number"==typeof this.autoCropArea&&(t.autoCropArea=this.autoCropArea),"boolean"==typeof this.cropBoxResizable&&(t.cropBoxResizable=this.cropBoxResizable),t}},watch:{src:function(t){if(t&&o){o.replace(t),this.show=!0;try{c.src=t}catch(t){}}else this.show=!1},show:function(t){if(t){var e=this.$refs.bar;this.$nextTick(function(){this.modelTop=e.clientHeight})}}},mounted:function(){document.body.clientWidth>751&&(this.isH5=!1),this.init()},methods:{init:function(){var t=this;a=this.$refs.preview;var e={response:!0,ready:function(e){var i=this.cropper,n=i.getCropBoxData(),s=i.getData();if(null===document.getElementById(t.id+"_clone")){var r=this.cloneNode();r.className="",r.id=t.id+"_clone",r.style.cssText="display: block;width: 100%;min-width: 0;min-height: 0;max-width: none;max-height: none;",a.appendChild(r)}else document.getElementById(t.id+"_clone").setAttribute("src",t.src);t.setPreviewStyle(n,s)},crop:function(e){var i=o.getCropBoxData();t.setPreviewStyle(i,e.detail)}},i=s()({},e,this.config);o=new r.a(document.getElementById(this.id),i),this.setWrapperStyle()},setPreviewStyle:function(t,e){if(c=document.getElementById(this.id+"_clone"),a.style.width=t.width+"px",a.style.height=t.height+"px",a.style.left=t.left+"px",a.style.top=parseInt(t.top)+parseInt(this.modelTop)+"px",!c)return!1;var i=o.getImageData(),n=e.width/t.width;c.style.width=i.naturalWidth/n+"px",c.style.height=i.naturalHeight/n+"px",c.style.marginLeft=-e.x/n+"px",c.style.marginTop=-e.y/n+"px"},setWrapperStyle:function(){var t={width:window.innerWidth+"px",height:window.innerHeight-this.modelTop+"px"};this.wrapperStyle=t},doPreview:function(){null!==o&&(this.showPreview=!0)},yes:function(){var t=o.getCroppedCanvas();this.$emit("croped",t),this.show=!1},cancel:function(){o.reset(),this.show=!1},zoomIn:function(){o.zoom(.1)},zoomOut:function(){o.zoom(-.1)}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"crop-wrapper"},[i("header",{ref:"bar",staticClass:"bar"},[i("div",{staticClass:"btn-wrap"},[i("button",{staticClass:"btn btn-preview",on:{click:t.doPreview}},[i("svg",{staticClass:"crop-icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-sousuo"}})]),t._v("\n      预览")]),t._v(" "),i("button",{staticClass:"btn btn-yes",on:{click:t.yes}},[i("svg",{staticClass:"crop-icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-tupiancaijian"}})]),t._v("\n      确定")]),t._v(" "),i("button",{staticClass:"btn btn-cancel",on:{click:t.cancel}},[i("svg",{staticClass:"crop-icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-cancel"}})]),t._v("\n      取消")])]),t._v(" "),t.isH5?t._e():i("div",{staticClass:"control"},[i("button",{staticClass:"btn btn-enlarge",on:{click:t.zoomIn}},[i("svg",{staticClass:"crop-icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-enlarge"}})]),t._v("\n        放大")]),i("button",{staticClass:"btn btn-reduce",on:{click:t.zoomOut}},[i("svg",{staticClass:"crop-icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-reduce"}})]),t._v("\n        缩小")])])]),t._v(" "),i("div",{staticClass:"core",style:t.wrapperStyle},[i("img",{attrs:{src:t.src,id:t.id,crossOrigin:"anonymous"}})]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showPreview,expression:"showPreview"}],staticClass:"preview-wrap",on:{click:function(e){t.showPreview=!1}}},[i("div",{ref:"preview",staticClass:"preview"})])])},staticRenderFns:[]};var h=i("VU/8")(p,l,!1,function(t){i("EoUZ")},null,null);e.a=h.exports}},["NHnr"]);
//# sourceMappingURL=index.js.map