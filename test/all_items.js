(() => {
    const setupEventListeners = () => {

    }

    const loadShopAndChallenges = () => {
        displayAllItems()
    }

    const displayAllItems = () => {
        window.ApiService.searchAllItems()
            .then(result => displayAllItemsList(result.items))
            .catch(() => $('.#all-items-container').empty().append(
                displayAlert(defaultAlertClasses, 'Sorry, but could not display the shop.')
            ))
    }

    const displayAllItemsList = (items) => $('#all-items-container').empty().append(
        items.map(
            element => { return allItemsElement(element) }
        )
    )

    const allItemsElement = (element) => $('<div></div>').addClass('card shadow p-3 mb-5 bg-white').append(
        $('<a></a>').text(element.name).attr({
            href: element.item.image,
            alt: element.name
        })
    )

    const init = () => {
        window.ApiService.apiHost('https://fortnite-public-api.theapinetwork.com/prod09/')
        setupEventListeners()
        loadShopAndChallenges()
    }

    window.FortniteSearchController = {
        init
    }
})()