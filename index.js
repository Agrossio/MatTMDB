

document.addEventListener('DOMContentLoaded', async () => {

let trendingArray = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=e65c4db5bae2b9b0565c97b1e317145e&sort_by=popularity.desc')

let data = await trendingArray.json()

console.log(data)

})

