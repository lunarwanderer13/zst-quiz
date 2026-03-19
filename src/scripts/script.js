const questions = [
    document.getElementById("q1"),
    document.getElementById("q2"),
    document.getElementById("q3"),
    document.getElementById("q4"),
    document.getElementById("q5"),
    document.getElementById("q6"),
    document.getElementById("q7")
]

const answers = [
    document.getElementById("q1-answer"),
    document.getElementById("q2-answer"),
    document.getElementById("q3-answer"),
    document.getElementById("q4-answer"),
    document.getElementById("q5-answer"),
    document.getElementById("q6-answer"),
    document.getElementById("q7-answer")
]

const button_container = document.getElementById("buttons")
const button_prev = document.getElementById("button-prev")
const button_next = document.getElementById("button-next")
const button_reset = document.getElementById("button-reset")

const result_screen = document.getElementById("result-screen")
const career_text = document.getElementById("career")
const career_explanation = document.getElementById("career-explanation")

let current = 0

function log(message = "") {
    const now = new Date()

    const hour = String(now.getHours()).padStart(2, "0")
    const minute = String(now.getMinutes()).padStart(2, "0")
    const second = String(now.getSeconds()).padStart(2, "0")

    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const year = String(now.getFullYear()).slice(-2)

    console.log(`[${hour}:${minute}:${second} | ${month}/${day} ${year}] ${message}`)
}

function hideQuestion(question = 0) {
    questions[question].className = "question-hidden"
    log(`Question ${question + 1} hidden.`)
}

function showQuestion(question) {
    questions[question].className = "question"
    log(`Question ${question + 1} shown.`)
}

function calculateResults() {
    let score = 0 // computer-engi < 0 < programming-engi

    answers.forEach((answer, index) => {
        if (answer.hasAttribute("programming-engineer")) {
            score += Number(answer.value)
            log(`Question ${index + 1}: ${answer.value}`)
        }
        if (answer.hasAttribute("computer-engineer")) {
            score -= Number(answer.value)
            log(`Question ${index + 1}: ${answer.value}`)
        }
    })

    return score
}

function displayResults(score) {
    log(`Result: ${score}`)

    if (score >= 0) {
        career_text.innerText = "Technik Programista"
        career_explanation.innerText = "Programisci specjalizuja sie w wielu dziedzinach, ale najpopularniejsze to projektowanie stron internetowych, zarzadzanie bazami danych oraz analiza danych. Zadna aplikacja, strona czy serwis nie moglby istniec bez programistow."
    } else {
        career_text.innerText = "Technik Informatyk"
        career_explanation.innerText = "Informatycy specjalizuja sie w niezwykle waznych rzeczach jak montaz komputerow, zarzadzanie sieciami oraz serwerami. Dzieki nim, wszystko co ma zwiazek z internetem i elektronika dziala."
    }

    hideQuestion(questions.length - 1)
    button_container.className = "button-container-hidden"
    result_screen.className = "results"
}

button_prev.addEventListener("click", () => {
    if (current > 0) {
        hideQuestion(current)
        current -= 1
        showQuestion(current)
    }
})

button_next.addEventListener("click", () => {
    if (current < questions.length - 1) {
        hideQuestion(current)
        current += 1
        showQuestion(current)
    } else {
        const score = calculateResults()
        displayResults(score)
    }
})

button_reset.addEventListener("click", () => {
    answers.forEach(answer => {
        answer.value = 0
    })

    current = 0
    showQuestion(current)
    button_container.className = "button-container"
    result_screen.className = "results-hidden"
    career_text.innerText = ""
    career_explanation.innerText = ""
    log("\n\n Reset \n\n")
})
