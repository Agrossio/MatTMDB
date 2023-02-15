async function fetchJson(url, body) {

    try {
        let response = await fetch(url);

        let jsonData = await response.json()
        // console.log(trendingData)

        let fetchResult = jsonData.results

        // console.log(fetchResult)
        return fetchResult

    } catch (error) {
        console.error(error)
    }

}

export { fetchJson }
