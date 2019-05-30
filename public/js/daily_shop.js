(() => {
    const setupEventListeners = () => {

    }

    const loadShopAndChallenges = () => {
        displayDailyShop()
    }

    const displayDailyShop = () => {
        window.ApiService.searchDailyShop()
            .then(result => displayDailyShopItems(result.items, result.vbucks))
            .catch(() => $('#shop-container').empty().append(
                displayAlert(defaultAlertClasses, 'Sorry, but could not display the shop.')
            ))
    }

    const displayDailyShopItems = (items, vbucks) => $('#shop-container').empty().append(
        items.map(
            element => { return dailyShopElement(element, vbucks) }
        )
    )

    const dailyShopElement = (element, vbucks) => {
        return $('<div></div>').addClass('card shadow p-3 mx-1 my-1 bg-white')
            .append($('<a></a>').attr({ href: element.item.image, alt: element.name })
                .append($('<img/>').addClass('card-img-top').attr({ src: element.item.images.background, alt: element.name }).height(300).width(300)))
            .append($('<div></div>').addClass('card-body')
                .append($('<h5></h5>').addClass('card-title').text(element.name)
                    .append($('<h6></h6>').text(element.item.description)))
                .append($('<p></p>').text(`${element.cost} `).addClass('card-text')
                    .append($('<img/>').attr({ src: vbucks, height: 25 })),
                    $('<span></span>').addClass('text-capitalize').text(`Rarity: ${element.item.rarity}, Type: ${element.item.type}`),
                    $('<ul></ul>').addClass(' text-capitalize')
                        .append($('<li></li>').text(`avgStars: ${element.ratings.avgStars}`),
                            $('<li></li>').text(`avgStars: ${element.ratings.totalPoints}`),
                            $('<li></li>').text(`avgStars: ${element.ratings.numberVotes}`))));
    }

    const init = () => {
        window.ApiService.apiHost('https://fortnite-public-api.theapinetwork.com/prod09/')
        setupEventListeners()
        loadShopAndChallenges()
    }

    window.FortniteSearchController = {
        init
    }
})()