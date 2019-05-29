(() => {
    const setupEventListeners = () => {

    }

    const loadShopAndChallenges = () => {
        displayBrNews()
    }

    const displayBrNews = () => {
        window.ApiService.searchNews()
            .then(result => displayBrNewsItems(result.entries))
            .catch(() => $('#br-news-container').empty().append(
                displayAlert(defaultAlertClasses, 'Sorry, but could not display the Battle Royale news.')
            ))
    }

    const displayBrNewsItems = (entries) => $('#br-news-container').empty().append(
        entries.map(
            element => { return brNewsElement(element) }
        )
    )

    const brNewsElement = (element) => {
        return $('<div></div>').addClass('card shadow p-3 mb-5 bg-white').append($('<a></a>').text(element.name).attr({
            href: element.image,
            alt: element.title
        })).append($('<img/>').addClass('card-img-top').attr({
            src: element.image,
            alt: element.title
        }).width(512)).append($('<div></div>').addClass('card-body').append($('<div></div>').addClass('text-wrap').append($('<h5></h5>').addClass('card-title text-primary').text(element.title)).append($('<p></p>').text(element.body))));
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