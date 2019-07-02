(() => {
    const setupEventListeners = () => {

    }

    const loadShopAndChallenges = () => {
        displayWeapons()
    }

    const displayWeapons = () => {
        window.ApiService.searchWeapons()
            .then(result => displayWeaponsItems(result.data.entries))
        // .catch(() => $('#weapons-container').empty().append(
        //     displayAlert(defaultAlertClasses, 'Sorry, but could not display the Battle Royale news.')
        // ))
    }

    const displayWeaponsItems = (entries) => $('#weapons-container').empty().append(
        entries.map(
            element => { return weaponsElement(element) }
        )
    )


    const weaponsElement = (element) => {

        return $('<div></div>').addClass('card shadow p-3 mx-1 my-1 bg-white').height('80%').width('30%')
            .append($('<a></a>').attr({ href: element.image, alt: element.name })
                .append($('<img/>').addClass('card-img-top').attr({ src: element.image, alt: element.name }).height('100%').width('100%')))
            .append($('<div></div>').addClass('card-body')
                .append($('<h5></h5>').addClass('card-title').text(element.name)
                    .append($('<h6></h6>').text(element.rarity)))
                .append(
                    $('<ul></ul>').addClass(' text-capitalize')
                        .append(
                            $('<li></li>').text(`DPS: ${element.stats.dps}`),
                            $('<li></li>').text(`Hit Body: ${element.stats.hit_body}`),
                            $('<li></li>').text(`Hit Head: ${element.stats.hit_head}`),
                            $('<li></li>').text(`Firerate: ${element.stats.firerate}`),
                            $('<li></li>').text(`Magazine Size: ${element.stats.magazinesize}`),
                            $('<li></li>').text(`Reload Time: ${element.stats.reloadtime}`),
                            $('<li></li>').text(`Ammo Cost: ${element.stats.ammocost}`)
                        )
                )
            );
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