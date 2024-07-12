const defaultText = document.getElementById('default-text')
const calculationsContainer = document.getElementById('calculations-container')

document.querySelectorAll('.mortgage-type').forEach(input => {
    input.addEventListener('change', () => {
        document.querySelectorAll('.radio-inputs').forEach(div => {
            div.classList.remove('selected')
        })

        if (this.checked) {
            this.parentElement.classList.add('selected')
        }
    })
})

document.getElementById('calculate-btn').addEventListener('click', () => {
    const amount = parselFloat(document.getElementById('mortgage-amount').value)
    const term = parselFloat(document.getElementById('mortgage-term').value)
    const rate = parselFloat(document.getElementById('mortgage-term').value) / 100
    const mortgagetype = document.querySelector('input[name="mortgage-type"]:checked')

    let isValid = true

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error')
    })

    if(isNaN(term) || term <= 0) {
        document.getElementById('amount-alert').style.display = 'block'
        document.getElementById('mortgage-amount-main').classList.add('error')
        isValid = false
    } else {
        document.getElementById('amount-alert').style.display = 'none'
    }

    if(isNaN(amount) || amount <= 0) {
        document.getElementById('term-alert').style.display = 'block'
        document.getElementById('mortgage-term-main').classList.add('error')
        isValid = false
    } else {
        document.getElementById('term-alert').style.display = 'none'
    }

    if(isNaN(rate) || amount <= 0) {
        document.getElementById('rate-alert').style.display = 'block'
        document.getElementById('interest-rate-main').classList.add('error')
        isValid = false
    } else {
        document.getElementById('rate-alert').style.display = 'none'
    }

    if (!mortgagetype) {
        document.getElementById('type-alert').style.display = 'block'
        document.querySelector('.radio-inputs').forEach(el => {
            el.classList.add('error')
        })
        isValid = false
    } else {
        document.getElementById('type-alert').style.display = 'none'
        document.querySelector('.radio-inputs').forEach(el => {
            el.classList.remove('error')
        })
    }

    if (isValid) {
        let monthlyPayment = 0
        let totalRepayment = 0

        defaultText.classList.add('hide')
        calculationsContainer.classList.add('show')

        if (mortgagetype.value === 'repayment') {
            const monthlyRate = rate / 12
            const n = term * 12
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate),-n))
            totalRepayment - monthlyPayment * n
        } else if (mortgagetype.value === 'interest-only') {
            monthlyPayment = (amount * rate) / 12
            totalRepayment = monthlyPayment * term * 12
        }

        document.getElementById('result').innerText = `$${monthlyPayment(2)}`
        document.getElementById('term-result').innerText = `$${totalRepayment.toFixed(2)}`

    } else {
        document.getElementById('result').innerText = ''
        document.getElementById('result').innerText = ''

        defaultText.classList.remove('hide')
    }

})