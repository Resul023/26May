let loadBtn = document.querySelector('#load')

let addCard = document.querySelector('#cardAdd')



function products(proid,procount){
    this.Id = proid;
    this.Count = procount;
}

let page = 1;
load(page)
loadBtn.addEventListener('click',function(){
    
    page++;
    load(page)
})


function load(page){

    fetch(`https://dummyjson.com/products?skip=${(page-1)*10}&limit=10`)
        .then(response=>response.json())
        .then(data=>{
            data.products.forEach(post => {
                // console.log(post);
                let card =
                 `<div class="card" style="width: 18rem;">
                <img src="${post.images[0]}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${post.price}</p>
                  <p class="card-text">id:${post.id}</p>
                  <a href="#" class="btn btn-primary btnId" data-id='${post.id}'>Go somewhere</a>
                  <i class="fa-regular fa-heart" style="font-size: 20px;"></i>
                </div>
              </div>`
              addCard.innerHTML += card
            });
        })
        .then(function(){
            let cardbtn = document.querySelectorAll('.btnId')

            cardbtn.forEach(card =>{
                
                card.addEventListener('click',function(e){
                    e.preventDefault();
                    let cardId = card.getAttribute('data-id')
                    
                    let basketitemStr = localStorage.getItem('basket');
                    let basket;

                    if(!basketitemStr){
                        basket=[];
                    }
                    else{
                        basket= JSON.parse(basketitemStr)           
                    }

                    let product= basket.find(x=>x.Id == cardId)

                    if(product){
                        product.Count++;
                    }
                    else{
                     product = new products(cardId,1)
                     basket.push(product)

                    }
                    let span = document.querySelector('.proCount')
                    span.innerText = basket.length;
                    localStorage.setItem('basket',JSON.stringify(basket))

                   

                })
                
            })



        })
}







