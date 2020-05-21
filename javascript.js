let newsList = []
let pageNum = 1
let pageSize = 20
const apiKey = "d5c38ab43f10457fa7d24cd3e56b4296"
let category = 'apple'


if (window.location.href.toString().split("").filter(char => char == "?").length > 0) {
    console.log(window.location.href.toString().split("").filter((char, index) => {
        if (char == "=") {
            let array = window.location.href.toString().split("")
            console.log(index)
            category = array.splice(index + 1, (array.length - index)).join("")
            console.log(category)

        }
    }))
}


const loadNews = async() => {

    let url = `https://newsapi.org/v2/everything?q=${category}&page=${pageNum}&pageSize=${pageSize}&from=2020-05-19&to=2020-05-19&sortBy=popularity&apiKey=${apiKey}`
    console.log(url)
    let data = await fetch(url)
    let result = await data.json();
    newsList = result.articles
    renderArray(newsList)
    document.getElementById("numNews").innerHTML = `No. of Article: ${newsList.length}`
    showSource(newsList)

}
loadNews()




function renderArray(array) {
    function renderElm(elm) {
        return (`
        <div class="collumn">
        <p>${getTime(elm.publishedAt)}</p>
        <div class="head"><span class="headline hl3">${elm.title}</span>
            <p><span class="headline hl4">by ${elm.author}</span></p>
        </div>
        <div class="img-container">
        <img src="${elm.urlToImage}" alt="">
        </div>
       <p>${elm.description}</p><a href=${elm.url}>Read more...</a>
    </div>
`)
    }

    const arrayNode = array.map(renderElm).join("")
    document.getElementById("newsArea").innerHTML = arrayNode


}

function readMore() {
    pageSize += 20
    loadNews()
}

function getTime(time) {
    let newTime = time.toString().split("").splice(0, 10).join("")
    let newTime1 = newTime.replace("-", "")
    let newTime2 = newTime1.replace("-", "")
    return moment(`${newTime2}`, "YYYYMMDD").fromNow()
}


function showSource(list) {
    let newArray = list.map(elm => elm.source.name)
    console.log(newArray)
    let obj1 = {};
    for (let i = 0; i < newArray.length; i++) {
        let name = newArray[i];
        if (!obj1[name]) {
            obj1[name] = 1;
        } else {
            obj1[name]++;
        }
    }
    let myArray = Object.keys(obj1)
    let html = myArray.map((item, index) => `<li>
    <input type="checkbox" id="source-name" onchange="checkboxchange(event,${index})">
    <p>${item}:<span>${obj1[item]}</span></p></li>`).join("")
    document.getElementById("filter-section").innerHTML = html
}

function checkboxchange(event, index) {
    let newArray = newsList.map(elm => elm.source.name)
    console.log(newArray)
    let obj1 = {};
    for (let i = 0; i < newArray.length; i++) {
        let name = newArray[i];
        if (!obj1[name]) {
            obj1[name] = 1;
        } else {
            obj1[name]++;
        }
    }
    let myArray = Object.keys(obj1)
    let checkBoxes = document.querySelectorAll("#filter-section li input")

    if (event.target.checked) {
        let newArray = newsList.filter(elm => elm.source.name == myArray[index])
        renderArray(newArray)
        document.getElementById("numNews").innerHTML = `No. of Article: ${newArray.length}`
        for (let i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i] == checkBoxes[index]) {
                console.log("cho nay dc giuuu", checkBoxes[i])
            } else {
                console.log("eo chay vong for", checkBoxes[i])
                checkBoxes[i].checked = false
            }
        }

    } else {
        renderArray(newsList)
        document.getElementById("numNews").innerHTML = `No. of Article: ${newsList.length}`
    }

}

function prev() {
    pageSize = 20
    pageNum--;
    loadNews()
}

function next() {
    pageSize = 20
    pageNum++;
    loadNews()
}

async function chooseCategory() {
    category = document.getElementById("news-category").value
    let categoryUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
    let data = await fetch(categoryUrl)
    let result = await data.json();
    newsList = result.articles
    renderArray(newsList)
    document.getElementById("numNews").innerHTML = `No. of Article: ${newsList.length}`
    showSource(newsList)



    let url = new URL(window.location.href)
    console.log(url.toString().split(""))
    if (!url.toString().split("").includes(char => char == "c" && "a" && "t" && "e" && "g" && "o" && "r" && "y")) {
        // console.log("run here")
        // url.searchParams.append('category', category);
        // window.location.href = url
        window.history.pushState("object or string", "Page Title", `?category=${category}`);



    } else {
        url.searchParams.set('category', category);
        window.location.href = url
    }

}