$(function(){
     var $slide_0 = $("#slide_0"),$slide_1=$("#slide_1"),$slide_2=$("#slide_2");
     //var isroll_0 = null,maxScrollY_0=0,flag_0="",more_1=0;
     var upTag_0 = $("#upTag_0"),upTag_1 = $("#upTag_1");
     template.helper("sex",function(gender){
           if (gender==0) {
           	  return "男"  //一定要有返回值
           }else{
           	  return "女"
           };
     });
   //确定3个包裹层的高度
   $(".swiper-slide").height($("section").height());

   fetchList(0);

	 var mySwiper = new Swiper('.swiper-container', {
	    pagination : '.swiper-pagination',
	    paginationClickable: true,
	    onSlideChangeStart:function(swiper){
          fetchList(swiper.activeIndex)
	    },
		  paginationBulletRender: function (swiper, index, className) {
			   var arr = ["足球现场","足球生活","足球美女"];
		     return '<span class="' + className + '">' + arr[index] + '</span>';
		  }
	  });


	 function fetchList(index){

         $.get('/api/leftList',{pages:index}, function(data) {
     	     //console.log(data);
     	       //var html = template("list_temp",data); //第二个参数一定是对象
            // $("$slide_"+index)
               if (index == 0) {

                  iscroll('#slide_0',upTag_0,data)

              }else if(index==1){
            	  //$slide_1.html(html);
                  iscroll('#slide_1',upTag_1,data)
            	}else{
            	  $slide_2.html(html);
            	};
     	    
         });
	 }

   function iscroll(slide,upTa,data){
            var isroll_0,maxScrollY_0,flag_0,more_1=0;

            var  isroll_0 = new IScroll(slide,{
                                probeType:2
                 }); 
          var html = template("list_temp",data);
               $(slide).find(".content").html(html);

               isroll_0.refresh();

              maxScrollY_0 = isroll_0.maxScrollY =  isroll_0.maxScrollY+40

               //isroll_0.refresh();
               isroll_0.on('scroll', function(){
                       if(this.directionY&&!flag_0&&this.y < maxScrollY_0-40){
                            flag_0 = "up";
                            upTa.html("释放加载...");
                            this.maxScrollY = maxScrollY_0-40;
                       }else if(this.directionY==-1&&flag_0=="up"&&this.y>maxScrollY_0-40){
                            flag_0="";
                            upTa.html("上拉");
                            this.maxScrollY = maxScrollY_0;
                       };
                  }); 

                  isroll_0.on('scrollEnd', function(){
                      if(flag_0=="up"){
                          upTa.html("加载中...");
                          fetchMore($(slide),more_1,function(){
                               upTa.html("上拉");
                               flag_0="";
                               isroll_0.refresh();
                               maxScrollY_0 = isroll_0.maxScrollY = isroll_0.maxScrollY+40
                               more_1++;
                          });
                       }
                  }); 
   }

   function fetchMore($slide,more,callback){
        $.get('/api/live',{index:more},function(data) {
            if (data.error==0) {
                 var html = template("list_temp",data);
                 $slide.find(".content").append(html);
                 callback();
            };
        });
   };


document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
})