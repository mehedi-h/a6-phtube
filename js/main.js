// Declare a Global Variable-=========================>
let totalview =[];

// Fetch All Category-================================>
const allCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()
    const categoriesData = data.data
    singleCategory(categoriesData)
}

//  Show Content By Single Categories Button Wise-================================>
const singleCategory = (SingleCategoriesData) => {
    SingleCategoriesData.forEach(categorie => {
        const mainMenuSec = document.getElementById('main-menu-sec')
        const mainMenuDiv = document.createElement('div')

        mainMenuDiv.innerHTML = `
            <a onclick = "loadByCategorie('${categorie?.category_id}')" class="tab text-base md:text-lg font-medium md:font-semibold rounded-md hover:bg-red-500 hover:text-white">${categorie.category}</a>`;
        mainMenuSec.appendChild(mainMenuDiv)
    })
}

// Fetch All Data By Id Wise-================================>
const loadByCategorie = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const datas = await  res.json()
    const data = datas.data

    categorieLoad(data)
}

const categorieLoad = (items) => {
    // console.log(items)
    const mainContainer = document.getElementById('main-container')
    const errorContainer = document.getElementById('error-container')

    mainContainer.innerHTML = '';
    errorContainer.innerHTML = '';
    
    totalview = items;
    console.log(totalview)

    // if there is no content
    if (items.length === 0) {
        const div = document.createElement('div')
        div.innerHTML = 
        `
        <div class="flex flex-col justify-center items-center">
            <img class="w-32" src="./images/Icon.png" alt="" srcset="">
            <h3 class=" lg:w-[400px] text-gray-700 text-xl font-semibold md:text-2xl md:font-bold text-center">Oops!!Sorry, There is no content here</h3>
        </div>
        `
        errorContainer.appendChild(div)
    }

    for (const data of items) {
        const mainContentDiv = document.createElement('div')
        
        mainContentDiv.innerHTML = `
            <div class=" md:mb-12">
                <div>
                    <img src="${data?.thumbnail}" alt="" class="h-[200px] w-[320px] lg:h-[250px] lg:w-[400px] rounded-xl"/>
                </div>

                <div class="relative" >${data?.others?.posted_date?`
                    <div class=" px-2.5 py-1.5 flex justify-center items-center text-xs md:text-sm absolute bottom-2 left-2 bg-[#171717] bg-opacity-50 text-white  rounded-md" >${Math.round((Math.round(data.others.posted_date/60))/60)}hr ${(Math.round(data.others.posted_date/60))%60}min ago
                    </div>`:''}
                </div>

                <div class="flex flex-row gap-x-2 md:gap-x-3 mt-2 md:mt-4">
                    <img src="${data?.authors[0]?.profile_picture}" alt="" class="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full"/>
                    <h3 class="text-base md:text-xl font-semibold md:font-bold">${data?.title}</h3>
                </div>
                <div class="pb-5 px-8 md:px-10">
                    <h6 class="text-gray-500 text-sm lg:text-base font-light md:font-medium">${data?.authors[0]?.profile_name}<span>${data?.authors[0]?.verified ? "<img class='inline' src='./images/security.png'>" : ''}</span></h6>
                    <p class="text-gray-500 text-xs md:text-sm">${data?.others?.views}<span> views</span></p>
                </div>
                
            </div>
        `
        mainContainer.appendChild(mainContentDiv) 
    }
}

// linked Another Page-===========================>
document.getElementById('btn-blog').addEventListener('click', function(){
    window.location.href = 'blog.html';
})

// Sort By Views-=================================>
const sortByView = () =>{
    let arr = totalview.sort((a,b) =>{
        let arr1 = a.others.views.slice(0,3);
        let arr2 = b.others.views.slice(0,3);
        let arr3 = parseFloat(arr1);
        let arr4 = parseFloat(arr2);
        return arr4-arr3;
    })
    categorieLoad(arr);
    return arr;
}



allCategories()
loadByCategorie('1000')
