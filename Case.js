
import fetch from 'node-fetch'

// 1. henter funkjsonen fetch fra biblioteket "node-fetch"


async function fetchBlackjack () {
    const response = await fetch("https://blackjack.labs.nais.io/shuffle")
    return await response.json()
}

// 2. Henter data fra ekstern Black Jack API
// 3. Bruker "async await fuction" for å garantere at all datta fra API er hentet før prosessen fortsettes


const kortstokk = await fetchBlackjack()

// 4. lager kortstokk

const marit = []
const yousaf = []

// 5. Definerer tomme array for hver spiller


let sum_marit = 0
let sum_yousaf = 0

// 6. Definerer sum lik 0 for hver spiller

function trekk_to_kort (spiller_kortstokk) {
    spiller_kortstokk.push(kortstokk[0])
    spiller_kortstokk.push(kortstokk[1])
    kortstokk.splice(0, 2)
}

// 7. Oppretter function for å trekke de to første kortene i kortstokken per spiller.


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

// 8. Opretter "function" som summerer verdiene av alle kortene som er hånden.
// 9. Benyttet "for loop" for å gå igjennom hvert kort i hånden og summerer opp verdien.
// 10. bruker "parseInt" for å konvertere tekst til hele tall.
// 11. Til slutt returneres summen.


function sjekk_sum (spiller_navn, spiller_sum) {
    if (spiller_sum == 21) {
        console.log("Vinner: " + spiller_navn)
        vis_poeng()
        process.exit()
    }
}

// 12. Oppretter "function" for å sjekke summen.
// 13. Bruker "if" for å sjekke om summen er 21.
// 14. Hvis summen er 21. Printes det ut tekst "vinner" og spiller navn
// 15. Prosessen avsluttes

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

    // 16. Oppretter "function" for å vise poengsum til spilleren (Marit).
    // 17. Bruker "for loop" for å gå igjrnnom hver kort i hånden.
    // 18. Skriver ut poengsum tekst for hver spiller


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

// 19. Opretter "function" for å trekke flere kort.
// 20. Benytter "While loop" som kjører så lenge summen er under 17, stopper når summen er over 17.
// 21. Er summen til Yousaf over 21, vinner Marit.
// 22. Er summen 21, vinner yousaf.

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

// 22. Marit slutter å trekke kort når poengsummen er høyere enn yousaf.
// 23. Resten er samme som over.

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

// 24. Opretter "function" som sjekker vinner.
// 25. Den som er nærmest 21 vinner.


console.clear()

// 26. renser terminalen

trekk_to_kort(yousaf)
trekk_to_kort(marit)

sum_yousaf = summer(yousaf)
sum_marit = summer(marit)

sjekk_sum("Yousaf", sum_yousaf)
sjekk_sum("Marit", sum_marit)

trekk_flere_kort_yousaf()
trekk_flere_kort_marit()

sjekk_vinner()