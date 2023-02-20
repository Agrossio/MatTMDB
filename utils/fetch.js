async function fetchJson(url, method = 'GET', body) {

    try {
        
        let response;

        if(method === 'GET'){

            response = await fetch(url);
        } else {

           response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            })

        }
        
        let jsonData = await response.json()
        // console.log("JSON DATA", jsonData)

        if (Array.isArray(jsonData.results)){

            let fetchResult = await jsonData.results
            // console.log("FETCH RESULT", fetchResult)
            
            return fetchResult;
        
        } else {
            console.log(jsonData);
            return jsonData;
        }

    } catch (error) {
        //console.error(error)
    }

}

export { fetchJson }
