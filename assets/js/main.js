let loadBtn = document.querySelector('#load')
let addCard = document.querySelector('#cardAdd')
let page = 1;
load(page)

// function products(proid,procount){
//     this.Id = proid;
//     this.Count = procount;
// } this func for btn

let basketitemStr = localStorage.getItem('basket');
let basket;

if(!basketitemStr){
    basket=[];
}
else{
    basket= JSON.parse(basketitemStr)    
        
}
let wishCount = document.getElementById('wishCount')
wishCount.innerText = basket.length; 

loadBtn.addEventListener('click',function(){
    
    page++;
    load(page)
})

function load(page){

    fetch(`https://dummyjson.com/products?skip=${(page-1)*10}&limit=10`)
        .then(response=>response.json())
        .then(data=>{
            data.products.forEach(post => {

                let isAdded = basket.some(x=>x==post.id)
                let card =
                 `<div class="card" style="width: 18rem;">
                <img src="${post.images[0]}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${post.price}</p>
                  <p class="card-text">id:${post.id}</p>
                  <a href="#" class="btn btn-primary btnId" >Go somewhere</a>
                  <i class="fa-${isAdded?"solid":"regular"} fa-heart wish-list" style="font-size: 20px; cursor: pointer; color:${isAdded?"red":"black"}" data-id='${post.id}'></i>
                </div>
              </div>`
              addCard.innerHTML += card
            });
        })
        .then(()=>{
            let wishList = document.querySelectorAll('.wish-list')

            wishList.forEach(wishItem =>{
                
                wishItem.addEventListener('click',function(e){
                    
                    let wistId = wishItem.getAttribute('data-id')


                    let itemIndex = basket.indexOf(wistId)

                    if(itemIndex == -1){
                        basket.push(wistId)
                        this.classList.remove('fa-regular')
                        this.classList.add('fa-solid')
                        this.style.color='red'
                    }
                    else{
                     basket.splice(itemIndex,1)
                     this.classList.remove('fa-solid')
                     this.classList.add('fa-regular')
                     this.style.color='black'

                    }
                    
                    localStorage.setItem('basket',JSON.stringify(basket))
                    wishCount.innerText = basket.length;
                    

                })
                
            })



        })
}
 let input = document.getElementById('getInput')
 let listItem = document.querySelector('.list-group')
 input.addEventListener('input',function(){
   
    if(input.value ){
        fetch(`https://dummyjson.com/products/search?q=${input.value}`)
        .then(response=>response.json())
        .then(data=>{
            
            data.products.forEach(x=>{
                console.log(x);
                let li = document.createElement('li')
                li.classList.add('list-group-item')
                li.innerText=x.title;
                listItem.appendChild(li)
                
            })
            
        })
    }else{
        listItem.innerHTML='';
    }
   

 })






