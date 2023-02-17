async function fetchJson(url, body = null) {

    try {
        let response = await fetch(url);

        let jsonData = await response.json()
        // console.log("JSON DATA", jsonData)

        if (Array.isArray(jsonData.results)){

            let fetchResult = await jsonData.results
            // console.log("FETCH RESULT", fetchResult)
            
            return fetchResult;
        
        } else {
            return jsonData;
        }


    } catch (error) {
        console.error(error)
    }

}

export { fetchJson }
