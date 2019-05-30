(() => {
    const setupEventListeners = () => {
        const platformDropdown = $('#choose-platform')
        const searchName = $('#search-name')
        const searchButton = $('#search-button')

        // CHOOSE PLATFORM
        platformDropdown.change(function () {
            let selectedPlatform = $(this).find("option:selected").val()
            platformDropdown.attr('value', selectedPlatform)
        })

        searchName.bind('input', () => searchButton.prop('disabled', !searchName.val()))

        searchButton.click(
            () => {
                let username = searchName.val()
                let platform = platformDropdown.val()
                const season = "alltime"
                getUserID(username, platform, season)
            }
        )

        const getUserID = (username, platform, season) => {
            window.ApiService.searchUserID({ 'username': username })
                .then(result => getStats(result.uid, platform, season))
                .catch(() => $('#username-container').empty().append(
                    displayAlert(defaultAlertClasses,
                        'This user does not exist or is not available.')
                ))
        }

        const getStats = (uid, platform, season) => {
            window.ApiService.searchStats_v1({ 'user_id': uid, 'platform': platform, 'window': season })
                .then(result => displayUsernameAndStats(result))
                .catch(() => $('#username-container').empty().append(
                    displayAlert('col-md-6 offset-md-3 col-sm-8 offset-sm-2 alert alert-danger text-center',
                        'Could not find this user. Please make sure you entered the correct Epic Games username ' +
                        'and chose the correct platform.')
                ))
        }

        // SEARCH VIA ENTER KEY
        searchName.keypress(function (e) {
            e.which === 13 && searchName.val().length > 0 ? searchButton.click() : jQuery.noop()
        })

    }

    const defaultAlertClasses = 'col alert alert-danger text-center'
    const displayAlert = (classes, alertMessage) => {
        return $('<div></div>').addClass(classes).text(alertMessage)
    }

    // USERNAME AND STATS
    const displayUsernameAndStats = usernameAndStats => {
        removeSearchBarBottomMargin()
        displayUsername(usernameAndStats.username)
        displayStatsTot(usernameAndStats.totals)
        displayStatsSolo(usernameAndStats.stats)
        displayStatsDuo(usernameAndStats.stats)
        displayStatsSquad(usernameAndStats.stats)
    }

    const removeSearchBarBottomMargin = () => $('#searchbar-container').removeClass('mb-5').children().removeClass('mb-3')

    const displayUsername = username => $('#username-container').empty()
        .append($('<div></div>').addClass('justify-content-center')
            .append($('<h2></h2>').addClass('h4').attr({ id: 'username' }).text('Username: ')
                .append($('<span></span>').text(username).addClass('h2'))))

    // Display total Stats
    const displayStatsTot = totalStats => $('#stats-tot-container').addClass('mx-2 my-2 bg-white')
        .append($('<div></div>').addClass('card-container')
            .append($('<div></div>').addClass('row')
                .append($('<ul></ul>').addClass('nav nav-pills nav-fill').empty()
                    .append($('<h5></h5>').addClass('h5 nav-link').text('Total Stats All Time'))
                    .append($('<li></li>').addClass('nav-item')
                        .append($('<div></div>').addClass('stats nav-link').html(`Total matches: ${totalStats.matchesplayed}`)))
                    .append($('<li></li>').addClass('nav-item')
                        .append($('<div></div>').addClass('stats nav-link').html(`Total score: ${totalStats.score}`)))
                    .append($('<li></li>').addClass('nav-item')
                        .append($('<div></div>').addClass('stats nav-link').html(`Total kills: ${totalStats.kills}`)))
                    .append($('<li></li>').addClass('nav-item')
                        .append($('<div></div>').addClass('stats nav-link ').html(`Total wins: ${totalStats.wins}`)))
                    .append($('<li></li>').addClass('nav-item')
                        .append($('<div></div>').addClass('stats nav-link').html(`Win rate: ${totalStats.winrate}`)))
                    .append($('<li></li>').addClass('nav-item')
                        .append($('<div></div>').addClass('stats nav-link').html(`K/D: ${totalStats.kd}`)))))
        )
    // Display Solo Stats
    const displayStatsSolo = stats => $('#stats-solo-container').addClass('shadow mx-2 my-2 bg-white')
        .append($('<div></div>').addClass('card-container')
            .append($('<h5></h5>').addClass('card-header h5').text('Solo Stats'))
            .append($('<ul></ul>').addClass('list-group list-group-flush').empty()
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total matches: ${stats.matchesplayed_solo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Wins: ${stats.placetop1_solo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Top 10: ${stats.placetop10_solo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Top 25: ${stats.placetop25_solo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total score: ${stats.score_solo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total kills: ${stats.kills_solo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Win rate: ${stats.winrate_solo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`K/D: ${stats.kd_solo}`))))
        )

    // Display Duo Stats
    const displayStatsDuo = stats => $('#stats-duo-container').addClass('shadow mx-2 my-2 bg-white')
        .append($('<div></div>').addClass('card-container')
            .append($('<h5></h5>').addClass('card-header h5').text('Duo Stats'))
            .append($('<ul></ul>').addClass('list-group list-group-flush').empty()
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total matches: ${stats.matchesplayed_duo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Wins: ${stats.placetop1_duo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Top 5: ${stats.placetop5_duo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Top 12: ${stats.placetop12_duo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total score: ${stats.score_solo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total kills: ${stats.kills_duo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Win rate: ${stats.winrate_duo}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`K/D: ${stats.kd_duo}`))))
        )

    // Display Squad Stats
    const displayStatsSquad = stats => $('#stats-squad-container').addClass('shadow mx-2 my-2 bg-white')
        .append($('<div></div>').addClass('card-container')
            .append($('<h5></h5>').addClass('card-header h5').text('Squad Stats'))
            .append($('<ul></ul>').addClass('list-group list-group-flush').empty()
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total matches: ${stats.matchesplayed_squad}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Wins: ${stats.placetop1_squad}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Top 3: ${stats.placetop3_squad}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Top 6: ${stats.placetop6_squad}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total score: ${stats.score_squad}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total kills: ${stats.kills_squad}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Win rate: ${stats.winrate_squad}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`K/D: ${stats.kd_squad}`))))
        )

    const init = () => {
        window.ApiService.apiHost('https://fortnite-public-api.theapinetwork.com/prod09/')
        setupEventListeners()
    }

    window.FortniteSearchController = {
        init
    }
})()