
loadWishlist()
document.addEventListener('visibilitychange',function(){
    if(document.visibilityState === 'visible'){
        loadWishlist()
    }
})


function loadWishlist() {

let basketitemStr = localStorage.getItem('basket');
let basket;
let listItem = document.querySelector('.list-group')
if(!basketitemStr){
    basket=[];
}
else{
    basket= JSON.parse(basketitemStr)    
        
}
listItem.innerHTML='';
    basket.forEach(id => {
        fetch(`https://dummyjson.com/products/${id}`)
        .then(response=>response.json())
        .then(data=>{
            let li = document.createElement('li')
            li.classList.add('list-group-item')
            li.innerText=data.title;
            listItem.appendChild(li)
        })
        
    });
}
