
let $buttons = $('#buttonWrapper > button')
let $slides = $('#slides')
let $images = $slides.children('img')
let $firstCopy = $images.eq(0).clone(true)
let $lastCopy = $images.eq($images.length-1).clone(true)
let current = 0 // 当前是第几张，从 0 开始

makeFakeSlides() //生成假的
$slides.css({transform: 'translateX(-400px)'})
bindEvents()
$(next).on('click', function(){ // 下一张
    goToSlide(current+1)
})
$(previous).on('click', function(){ // 上一张
    goToSlide(current-1)
})

let timer = setInterval(function(){ // 轮播定时器
    goToSlide(current+1)
},2000)

$('.container').on('mouseenter', function(){
    clearInterval(timer)
}).on('mouseleave', function(){
    timer = setInterval(function(){ // 轮播定时器
        goToSlide(current+1)
    },2000)
})



function bindEvents(){
    $('#buttonWrapper').on('click', 'button',function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })
}

function goToSlide(index){ //去第几张，从 0 开始
    if(index >$buttons.length-1){
        index = 0
    }else if(index < 0){
        index = $buttons.length - 1
    }
    if(current === $buttons.length -1 && index === 0){ // current 当前的，index 要去的。从最后一张到第一张
        $slides.css({transform: `translateX(${-(current+2) *400}px)`})
            .one('transitionend', function(){
                $slides.hide()
                    .offset() //加这个可解决不 show
                $slides.css({transform: `translateX(${-(index+1) *400}px)`})
                    .show()
            })
        current = index
    }else if(current === 0 && index === $buttons.length -1){ // 从第一张到最后一张
        $slides.css({transform: `translateX(${-current *400}px)`})
            .one('transitionend', function(){
                $slides.hide()
                    .offset()
                $slides.css({transform: `translateX(${-(index+1) *400}px)`})
                    .show()
            })
        current = index
    }else{
        $slides.css({transform: `translateX(${-(index+1) *400}px)`})
        current = index
    }
}

function makeFakeSlides(){
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}
    // $buttons.eq(0).on('click', function(){
    //     if(current === 4){ // 从最后一张到第一张
    //         $slides.css({transform: 'translateX(-2400px)'})
    //             .one('transitionend', function(){
    //                 $slides.hide()
    //                     .offset() //加这个可解决不 show
    //                 $slides.css({transform: 'translateX(-400px)'})
    //                     .show()
    //             })
    //     }else{
    //         $slides.css({transform: 'translateX(-400px)'})
    //     }
    //     current = 0
    // })
    // $buttons.eq(1).on('click', function()
    // {
    //     $slides.css({transform: 'translateX(-800px)'})
    //     current = 1
    // })
    // $buttons.eq(2).on('click', function()
    // {
    //     $slides.css({transform: 'translateX(-1200px)'})
    //     current = 2
    // })
    // $buttons.eq(3).on('click', function()
    // {
    //     $slides.css({transform: 'translateX(-1600px)'})
    //     current = 3
    // })
    // $buttons.eq(4).on('click', function()
    // {
    //     if(current === 0){ // 从第一张到最后一张
    //         $slides.css({transform: 'translateX(0px)'})
    //             .one('transitionend', function(){
    //                 $slides.hide()
    //                     .offset()
    //                 $slides.css({transform: 'translateX(-2000px)'})
    //                     .show()
    //             })
    //     }else{
    //         $slides.css({transform: 'translateX(-2000px)'})
    //     }
    //     current = 4
    // })

