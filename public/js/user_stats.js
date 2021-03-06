(() => {
    const setupEventListeners = () => {
        const searchName = $('#search-name')
        const searchButton = $('#search-button')

        //searchName.bind('input', () => searchButton.prop('disabled', !searchName.val()))

        searchButton.click(
            () => {
                let username = searchName.val()
                const platform = "pc"
                const season = "allSeasons"
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
            window.ApiService.searchStats_v2({ 'user_id': uid, 'platform': platform, 'seasonWindow': season })
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
        displayUsername(usernameAndStats.epicName)
        displayStatsTot(usernameAndStats.overallData)
        // displayStatsSolo(usernameAndStats.stats)
        // displayStatsDuo(usernameAndStats.stats)
        // displayStatsSquad(usernameAndStats.stats)
    }

    const removeSearchBarBottomMargin = () => $('#searchbar-container').removeClass('mb-5').children().removeClass('mb-3')

    const displayUsername = epicName => $('#username-container').empty()
        .append($('<div></div>').addClass('justify-content-center')
            .append($('<h2></h2>').addClass('h4').attr({ id: 'epicName' }).text('Username: ')
                .append($('<span></span>').text(epicName).addClass('h2'))))



    //Display total Stats
    // const displayStatsTot = totalStats => $('#stats-tot-container').addClass('mx-2 my-2 bg-white')
    //     // .append(
    //     //     Object.keys(obj).forEach(function(totalStats){
    //     //         var value = obj[totalStats];
    //     //         return totalStats + ':' + value;
    //     //     }).append($('<p></p>'))
    //     // )
    //     .append($('<div></div>').addClass('card-container')
    //         .append($('<div></div>').addClass('row')
    //             .append($('<ul></ul>').addClass('nav nav-pills nav-fill').empty()
    //                 .append($('<h5></h5>').addClass('h5 nav-link').text('Total Stats Default Modes'))
    //                 .append($('<li></li>').addClass('nav-item')
    //                     .append($('<div></div>').addClass('stats nav-link').html(`Total matches: ${totalStats.defaultModes.matchesplayed}`)))
    //                 .append($('<li></li>').addClass('nav-item')
    //                     .append($('<div></div>').addClass('stats nav-link').html(`Total score: ${totalStats.score}`)))
    //                 .append($('<li></li>').addClass('nav-item')
    //                     .append($('<div></div>').addClass('stats nav-link').html(`Total kills: ${totalStats.kills}`)))
    //                 .append($('<li></li>').addClass('nav-item')
    //                     .append($('<div></div>').addClass('stats nav-link ').html(`Total wins: ${totalStats.wins}`)))
    //                 .append($('<li></li>').addClass('nav-item')
    //                     .append($('<div></div>').addClass('stats nav-link').html(`Win rate: ${totalStats.winrate}`)))
    //                 .append($('<li></li>').addClass('nav-item')
    //                     .append($('<div></div>').addClass('stats nav-link').html(`Wins: ${totalStats.defaultModes.placetop1}`)))))
    //     )

    // Display Solo Stats
    const displayStatsTot = totalStats => $('#stats-solo-container').addClass('shadow mx-2 my-2 bg-white')
        .append($('<div></div>').addClass('card-container')
            .append($('<h5></h5>').addClass('card-header h5').text('Total Stats Default Modes'))
            .append($('<ul></ul>').addClass('list-group list-group-flush').empty()
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total matches: ${totalStats.defaultModes.matchesplayed}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Wins: ${totalStats.defaultModes.placetop1}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Kills: ${totalStats.defaultModes.kills}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Totale Score: ${totalStats.defaultModes.score}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total Player Outlived: ${totalStats.defaultModes.playersoutlived}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Playlists: ${totalStats.defaultModes.includedPlaylists}`)))
            )
        ).append($('<div></div>').addClass('card-container')
            .append($('<h5></h5>').addClass('card-header h5').text('Total Stats LTM Modes'))
            .append($('<ul></ul>').addClass('list-group list-group-flush').empty()
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total matches: ${totalStats.ltmModes.matchesplayed}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Wins: ${totalStats.ltmModes.placetop1}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Kills: ${totalStats.ltmModes.kills}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Totale Score: ${totalStats.ltmModes.score}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total Player Outlived: ${totalStats.ltmModes.playersoutlived}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Playlists: ${totalStats.ltmModes.includedPlaylists}`)))
            )
        ).append($('<div></div>').addClass('card-container')
            .append($('<h5></h5>').addClass('card-header h5').text('Total Stats Large Team Modes'))
            .append($('<ul></ul>').addClass('list-group list-group-flush').empty()
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total matches: ${totalStats.largeTeamModes.matchesplayed}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Wins: ${totalStats.largeTeamModes.placetop1}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Kills: ${totalStats.largeTeamModes.kills}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Totale Score: ${totalStats.largeTeamModes.score}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Total Player Outlived: ${totalStats.largeTeamModes.playersoutlived}`)))
                .append($('<li></li>').addClass('list-group-item')
                    .append($('<div></div>').addClass('stats').html(`Playlists: ${totalStats.largeTeamModes.includedPlaylists}`)))
            )
        )

   

    // // Display Duo Stats
    // const displayStatsDuo = stats => $('#stats-duo-container').addClass('shadow mx-2 my-2 bg-white')
    //     .append($('<div></div>').addClass('card-container')
    //         .append($('<h5></h5>').addClass('card-header h5').text('Duo Stats'))
    //         .append($('<ul></ul>').addClass('list-group list-group-flush').empty()
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Total matches: ${stats.matchesplayed_duo}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Wins: ${stats.placetop1_duo}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Top 5: ${stats.placetop5_duo}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Top 12: ${stats.placetop12_duo}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Total score: ${stats.score_solo}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Total kills: ${stats.kills_duo}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Win rate: ${stats.winrate_duo}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`K/D: ${stats.kd_duo}`))))
    //     )

    // // Display Squad Stats
    // const displayStatsSquad = stats => $('#stats-squad-container').addClass('shadow mx-2 my-2 bg-white')
    //     .append($('<div></div>').addClass('card-container')
    //         .append($('<h5></h5>').addClass('card-header h5').text('Squad Stats'))
    //         .append($('<ul></ul>').addClass('list-group list-group-flush').empty()
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Total matches: ${stats.matchesplayed_squad}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Wins: ${stats.placetop1_squad}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Top 3: ${stats.placetop3_squad}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Top 6: ${stats.placetop6_squad}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Total score: ${stats.score_squad}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Total kills: ${stats.kills_squad}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`Win rate: ${stats.winrate_squad}`)))
    //             .append($('<li></li>').addClass('list-group-item')
    //                 .append($('<div></div>').addClass('stats').html(`K/D: ${stats.kd_squad}`))))
    //     )

    const init = () => {
        window.ApiService.apiHost('https://fortnite-public-api.theapinetwork.com/prod09/')
        setupEventListeners()
    }

    window.FortniteSearchController = {
        init
    }
})()