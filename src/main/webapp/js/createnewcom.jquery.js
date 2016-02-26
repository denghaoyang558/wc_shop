//$("#modal").on('show.bs.modal', function (){
$("#a1").bind("click",function(){
	var imgNames = [];
	$("#a1").hide();
	var $up = "<input type=\"file\" name=\"uploadify\" id=\"file_upload\" />"+  
      "<button class=\"btn btn-primary\" href=\"javascript:$('#file_upload').uploadify('upload','*')\">开始上传</button>&nbsp;"+     
      "<button class=\"btn btn-primary\" href=\"javascript:$('#file_upload').uploadify('cancel', '*')\">取消上传</button>";
      $up += "<div id=\"uploadfileQueue\"></div>";
	$("#upload").html($up);
	/*<input type="file" name="uploadify" id="file_upload" />  
      <a href="javascript:$('#file_upload').uploadify('upload','*')">开始上传</a>&nbsp;     
      <a href="javascript:$('#file_upload').uploadify('cancel', '*')">取消上传</a>
	*/
	//alert("111");
    $("#file_upload").uploadify({
        //是否自动上传 true or false
        'auto':false,
        //超时时间上传成功后，将等待服务器的响应时间。
        //在此时间后，若服务器未响应，则默认为成功(因为已经上传,等待服务器的响应) 单位：秒
        'successTimeout':99999,
        //附带值 JSON对象数据，将与每个文件一起发送至服务器端。
        //如果为动态值，请在onUploadStart()中使用settings()方法更改该JSON值
        /*
       'formData':{       //可以不写
    	   'user.username':'',
    	   'user.age':''
    	   },  
    	    'onUploadStart': function(file) { 
    	    	var name=$('#username').val();
    	    	var age=$('#age').val();
    	    	$("#file_upload").uploadify(
    	    	"settings", 
    	    	"formData", 
    	    	{'user.username':name,'user.age':age});
    	    	}, 
    	    	*/
        //flash
        'swf': "/wc_shop/uploadify/uploadify.swf",
         //文件选择后的容器div的id值 
        'queueID':'uploadfileQueue',
         //将要上传的文件对象的名称 必须与后台controller中抓取的文件名保持一致    
        'fileObjName':'pic',
        //上传地址
       //'uploader':'/wc_shop/back/upload/uploadImage',
       'uploader':'/wc_shop/test/testupload',
       'buttonText':'选择文件',
        //浏览将要上传文件按钮的背景图片路径
       // 'buttonImage':'/wc_shop/uploadify/background.jpg',
        //浏览按钮的宽度
        'width':'100',
        //浏览按钮的高度
        'height':'32',
        //在浏览窗口底部的文件类型下拉菜单中显示的文本
        'fileTypeDesc':'支持的格式：',
        //允许上传的文件后缀
        'fileTypeExts':'*.jpg;*.jpge;*.gif;*.png' ,// 有哪些？？
        'cancelImg' : '/wc_shop/uploadify/uploadify-cancel.png',
        /*上传文件的大小限制允许上传文件的最大 大小。 这个值可以是一个数字或字 符串。
          如果它是一个字符串，它接受一个单位(B, KB, MB, or GB)。
          默认单位为KB您可以将此值设置为0 ，没有限制, 
          单个文件不允许超过所设置的值 如果超过 onSelectError时间被触发*/
        'fileSizeLimit':'500KB',
        //允许上传的文件的最大数量。当达到或超过这个数字，onSelectError事件被触发。
        'queueSizeLimit' : 3,
        //选择上传文件后调用
        'onSelect' : function(file) {
             // alert("最大只能上传3张 ");    
        },
        //返回一个错误，选择文件的时候触发
        'onSelectError':function(file, errorCode, errorMsg){
            switch(errorCode) {
                case -100:
                    alert("上传的文件数量已经超出系统限制的"
                     +$('#file_upload').uploadify('settings','queueSizeLimit')+"个文件！");
                    break;
                case -110:
                    alert("文件 ["+file.name+"] 大小超出系统限制的"
                     +$('#file_upload').uploadify('settings','fileSizeLimit')+"大小！");
                    break;
                case -120:
                    alert("文件 ["+file.name+"] 大小异常！");
                    break;
                case -130:
                    alert("文件 ["+file.name+"] 类型不正确！");
                    break;
            }
        },
        //上传到服务器，服务器返回相应信息到data里
        'onUploadSuccess':function(file, data, response){
            //alert("上传成功");
            imgNames.push(data);
            $("#imgshow").append("<img id=\"smallimg\" src=\"/wc_shop/upload/image/"+data+"\"></img>");
            //$("#imgshow").append("<p>111</p>");
        },
      //当单个文件上传出错时触发
        'onUploadError': function (file, errorCode, errorMsg, errorString) { 
        	alert("上传失败");
        	} 
    });
});