(() => {
    let api = 'https://fortnite-public-api.theapinetwork.com/prod09/'

    const apiHost = host => { api = host }
    const urlFor = resource => `${api}${resource}`
    
    const HTTP_OK = 200

    const throwResponseError = response => {
        const error = new Error(response.statusText)
        error.response = response
        throw error
    }

    const emitNariveError = error => {
        throw error
    }

    const statusCheck = successStatuses => response => {
        if(successStatuses.includes(response.status)) {
            return response
        } else {
            throwResponseError(response)
        }
    }

    const okCheck = statusCheck([HTTP_OK])

    const paramsWithApiKey = params => {
        const result = new URLSearchParams(params)
        for(let key in params) {
            if(params.hasOwnProperty(key)) {
                result.set(key, params[key])
            }
        }
        return result
    }

    const query = (resource, params) => fetch(`${urlFor(resource)}?${paramsWithApiKey(params)}`)
        .then(okCheck, emitNariveError)
        .then(response => response.json())

    const searchAllItems = params => query('items/list', params)
    const searchNews = params => query('br_motd/get', params)
    const searchChallenges = params => query('challenges/get', params)
    const searchDailyShop = params => query('store/get', params)
    const searchSpecificItem = params => query('item/get', params)
    const searchUpcomingItems = params => query('upcoming/get', params)
    const searchUserID = params => query('users/id', params)  
    const searchStats = params => query('users/public/br_stats_v2', params)

    window.ApiService = {
        apiHost,
        searchAllItems,
        searchNews,
        searchChallenges,
        searchDailyShop,
        searchSpecificItem,
        searchUpcomingItems,
        searchUserID,
        searchStats
    }
})()