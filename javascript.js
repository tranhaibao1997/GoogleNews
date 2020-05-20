let newsList = []
let pageNum = 1
let pageSize = 20
const apiKey = "d5c38ab43f10457fa7d24cd3e56b4296"

const loadNews = async() => {

    let url = `https://newsapi.org/v2/everything?q=apple&page=${pageNum}&pageSize=${pageSize}&from=2020-05-19&to=2020-05-19&sortBy=popularity&apiKey=${apiKey}`
    console.log(url)
    let data = await fetch(url)
    let result = await data.json();
    newsList = result.articles
    renderArray(newsList)
    console.log(newsList)
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
    let html = myArray.map(item => `<li>
    <input type="checkbox" id="source-name" check>
    <p>${item}:<span>${obj1[item]}</span></p></li>`).join("")
    document.getElementById("filter-section").innerHTML = html
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
    let category = document.getElementById("news-category").value
    let newUrl = new URL(`https://newsapi.org/v2/everything?q=${category}&page=${pageNum}&pageSize=${pageSize}&from=2020-05-19&to=2020-05-19&sortBy=popularity&apiKey=${apiKey}`);
    let data = await fetch(newUrl)
    let result = await data.json();
    newsList = result.articles
    renderArray(newsList)
    console.log(newsList)
    document.getElementById("numNews").innerHTML = `No. of Article: ${newsList.length}`
    showSource(newsList)


    // let url = new URL(window.location.href)
    // url.searchParams.append('category', category);
    // console.log(url)
    // window.location.href = url





    // // If your expected result is "http://foo.bar/?x=1&y=2&x=42"


    // // If your expected result is "http://foo.bar/?x=42&y=2"
    // url.searchParams.set('x', 42);
}