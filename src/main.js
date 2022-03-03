const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x) //JSON.parse()变成对象
const hashMap = xObject ||
[
    {
        logo:'x',
        url:'https://xiedaimala.com',
    },
    {
        logo:'B',
        url:'https://www.bilibili.com',
    }
]
const simplifyUrl = (url) => {
    console.log(url)
    return url.replace('https://', '')
      .replace('http://', '')
      .replace('www.', '')
      .replace(/\/.*/,'')//删除 /开头的内容
  }
const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) =>{
        const $li = $(
            `<li>
              <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
              </div>
            </li>`
        ).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()
            let huang = window.confirm('请问确认删除嘛')
            if(huang === true){
                hashMap.splice(index,1)
                render()
            }
        })
    })

}
render()

$('.addButton').on('click',()=>{
    let url= window.prompt('请问你要添加的网址')
    if(url.indexOf('http')!==0){
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType:Text,
        url: url
    });
    render()
});

 window.onbeforeunload = () =>{
     const string = JSON.stringify(hashMap)//JSON.stringify()变成字符串
     localStorage.setItem('x',string)
 }
