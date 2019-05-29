(() => {
    const setupEventListeners = () => {
        const chooseChallenge = $('#choose-challenge')

        // CHANGE WEEKLY CHALLENGE
        chooseChallenge.change(function () {
            let sIndex = chooseChallenge.val().indexOf('s')
            let wIndex = chooseChallenge.val().indexOf('w')
            let season = chooseChallenge.val().substring(sIndex + 1, wIndex)
            let chosenWeek = chooseChallenge.val().substring(wIndex + 1)
            window.ApiService.searchChallenges({ 'season': season })
                .then(result => filterChallenges(result.challenges, chosenWeek, result.star))
                .catch(() => $('#challenge-container').empty().append(
                    displayAlert(defaultAlertClasses,
                        'Sorry, but could not display challenges.')
                ))
        })
    }

    const defaultAlertClasses = 'col alert alert-danger text-center'
    const displayAlert = (classes, alertMessage) => {
        return $('<div></div>').addClass(classes).text(alertMessage)
    }

    const loadShopAndChallenges = () => {
        displayChallenges()
    }


    // CHALLENGES
    const displayChallenges = () => {
        window.ApiService.searchChallenges({ 'season': 'current' })
            .then(result => {
                loadChallengesAndSelect(result.challenges, result.season, result.currentweek, result.star)
            }).catch(() => {
                $('#challenge-container').empty().append(
                    displayAlert(defaultAlertClasses,
                        'Sorry, but could not display challenges.')
                )
            })
    }

    const loadChallengesAndSelect = (challenges, season, currentWeek, star) => {
        loadChallengeSelect(season, currentWeek)
        filterChallenges(challenges, currentWeek, star)
    }

    const loadChallengeSelect = (season, currentWeek) => {
        let currentSeason = true
        for (let s = season; s > 2; s--) {
            for (let c = 10; c > 0; c--) {
                if (currentSeason) {
                    c = currentWeek
                    currentSeason = false
                }
                if (c === 10 && s !== season) {
                    addChallengeDivider()
                }
                addChallengeToSelect(s, c)
            }
        }
    }

    const chooseChallenge = $('#choose-challenge')
    const addChallengeToSelect = (season, currentWeek) => {
        chooseChallenge.append(
            $('<option></option>').attr({
                value: `s${season}w${currentWeek}`
            }).text(`Season ${season} Week ${currentWeek}`)
        )
    }

    const addChallengeDivider = () => chooseChallenge.append(
        $('<option></option>').attr({
            disabled: true
        }).text('──────────')
    )

    const cleanChallenges = (challenges) => {
        for (let week in challenges) {
            if (challenges[week].length === 0) {
                delete challenges[week]
            }
        }
        return challenges
    }

    const filterChallenges = (challenges, currentWeek, star) => {
        const availableChallenges = cleanChallenges(challenges)
        const cws = "week" + currentWeek
        displayChallengeItems(availableChallenges[cws], star)
    }

    const displayChallengeItems = (week, star) => {
        $('#challenge-container').empty().append(
            Object.entries(week).map(entry => {
                return challengeElement(entry[1], star)
            })
        )
    }

    const challengeElement = (entry, star) => {
        return $('<div></div>').addClass('challenge my-2').append(
            $('<span></span>').text(entry.challenge)
        ).append($('<br>')).append(
            $('<span></span>').text(`0 / ${entry.total} - ${entry.stars}`)
        ).append(
            $('<img/>').attr({
                src: star,
                height: 25
            }).addClass('mb-1 ml-2')
        )
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