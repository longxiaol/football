$(function(){
     var $slide_0 = $("#slide_0"),$slide_1=$("#slide_1"),$slide_2=$("#slide_2");
     var IScroll_0=null,IScroll_1=null,IScroll_2=null;
     var upTag_0 = $("#upTag_0"),upTag_1 = $("#upTag_1"),upTag_2 = $("#upTag_2");
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
     	       //第二个参数一定是对象
            // $("$slide_"+index)

                // 把html放到滑动层
               var html = template("list_temp",data);

              if (index == 0) {
                  $slide_0.find(".content").html(html);
                   if (IScroll_0) {
                     IScroll_0.destroy()
                   };
                   IScroll_0 = isroll('#slide_0',upTag_0);
              }else if(index==1){
            	  //$slide_1.html(html);
                  $slide_1.find(".content").html(html);
                    if (IScroll_1) {
                      IScroll_1.destroy()
                    };
                   IScroll_1 = isroll('#slide_1',upTag_1);
                   
            	}else if(index==2){
            	    $slide_2.find(".content").html(html);
                  if (IScroll_2) {
                     IScroll_2.destroy()
                   };
                   IScroll_2 = isroll('#slide_2',upTag_2);
            	};
     	    
         });
	 }


       function isroll(slide,upTag){
              var maxScrollY_0 = 0,flag_0 = "",more = 0 ,isroll_0 = null; 
               isroll_0 = new IScroll(slide,{
                     probeType:2
               }); 
               //网里面放了东西的，需要重新计算滚动高度
               
               maxScrollY_0 = isroll_0.maxScrollY =  isroll_0.maxScrollY + 40

               isroll_0.on('scroll', function(){
                       if(this.directionY&&!flag_0&&this.y < maxScrollY_0-40){
                            flag_0 = "up";
                            upTag.html("释放加载...");
                            this.maxScrollY = maxScrollY_0-40;
                       }else if(this.directionY==-1&&flag_0=="up"&&this.y>maxScrollY_0-40){
                            flag_0="";
                            upTag.html("上拉");
                            this.maxScrollY = maxScrollY_0;
                       };
                  }); 

                  isroll_0.on('scrollEnd', function(){
                      if(flag_0=="up"){
                          upTag.html("加载中...");
                          fetchMore($(slide),more,function(){
                               upTag.html("上拉");
                               flag_0="";
                               isroll_0.refresh();
                               maxScrollY_0 = isroll_0.maxScrollY = isroll_0.maxScrollY+40
                               more++;
                          });
                       }
                  }); 

           return isroll_0
   };


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