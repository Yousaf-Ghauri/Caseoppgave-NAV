import fetch from 'node-fetch'

async function fetchBlackjack () {
    const response = await fetch("https://blackjack.labs.nais.io/shuffle")
    return await response.json()
}

const kortstokk = await fetchBlackjack()

const marit = []
const yousaf = []

let sum_marit = 0
let sum_yousaf = 0

function trekk_to_kort (spiller_kortstokk) {
    spiller_kortstokk.push(kortstokk[0])
    spiller_kortstokk.push(kortstokk[1])
    kortstokk.splice(0, 2)
}

function summer (spiller_kortstokk) {
    let sum = 0

    for (const s of spiller_kortstokk) {
        if (s.value == "A") {
            sum = sum + 11
        } else if (s.value == "J" || s.value == "Q" || s.value == "K") {
            sum = sum + 10
        }
        else {
            sum = sum + parseInt(s.value)
        }
    }

    return sum
}

function sjekk_sum (spiller_navn, spiller_sum) {
    if (spiller_sum == 21) {
        console.log("Vinner: " + spiller_navn)
        vis_poeng()
        process.exit()
    }
}

function vis_poeng () {

    let yousaf_tekst = "Yousaf | " + sum_yousaf + " | "

    for (const kort of yousaf) {
        if (kort.suit == "DIAMONDS") {
            yousaf_tekst = yousaf_tekst + "D" + kort.value + ","
        }
        else if (kort.suit == "HEARTS") {
            yousaf_tekst = yousaf_tekst + "H" + kort.value + ","
        }
        else if (kort.suit == "SPADES") {
            yousaf_tekst = yousaf_tekst + "S" + kort.value + ","
        }
        else if (kort.suit == "CLUBS") {
            yousaf_tekst = yousaf_tekst + "C" + kort.value + ","
        }
    }

    let marit_tekst = "Marit | " + sum_marit + " | "

    for (const kort of marit) {
        if (kort.suit == "DIAMONDS") {
            marit_tekst = marit_tekst + "D" + kort.value + ","
        }
        else if (kort.suit == "HEARTS") {
            marit_tekst = marit_tekst + "H" + kort.value + ","
        }
        else if (kort.suit == "SPADES") {
            marit_tekst = marit_tekst + "S" + kort.value + ","
        }
        else if (kort.suit == "CLUBS") {
            marit_tekst = marit_tekst + "C" + kort.value + ","
        }
    }

    console.log(yousaf_tekst)
    console.log(marit_tekst)
}

function trekk_flere_kort_yousaf () {
    while (sum_yousaf < 17) {
        yousaf.push(kortstokk[0])
        kortstokk.splice(0, 1)
        sum_yousaf = summer(yousaf)
    }

    if (sum_yousaf > 21) {
        console.log("Vinner: Marit")
        vis_poeng()
        process.exit()
    }
    else if (sum_yousaf == 21) {
        console.log("Vinner: Yousaf")
        vis_poeng()
        process.exit()
    }
}

function trekk_flere_kort_marit () {
    while (sum_marit <= sum_yousaf) {
        marit.push(kortstokk[0])
        kortstokk.splice(0, 1)
        sum_marit = summer(marit)
    }

    if (sum_marit > 21) {
        console.log("Vinner: Yousaf")
        vis_poeng()
        process.exit()
    }
    else if (sum_marit == 21) {
        console.log("Vinner: Marit")
        vis_poeng()
        process.exit()
    }
}

function sjekk_vinner () {
    if ((21 - sum_marit) < (21 - sum_yousaf)) {
        console.log("Vinner: Marit")
        vis_poeng()
        process.exit()
    }
    else {
        console.log("Vinner: Yousaf")
        vis_poeng()
        process.exit()
    }
}

console.clear()

trekk_to_kort(yousaf)
trekk_to_kort(marit)

sum_yousaf = summer(yousaf)
sum_marit = summer(marit)

sjekk_sum("Yousaf", sum_yousaf)
sjekk_sum("Marit", sum_marit)

trekk_flere_kort_yousaf()
trekk_flere_kort_marit()

sjekk_vinner()