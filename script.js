const feedbackDisplayTime = 3000

// Element Selectors
const textInputArea = document.getElementById('text-input-area')
const summaryLengthContainer = document.querySelector('.slider-row')
const summaryLengthInput = document.getElementById('summary-length-input')
const summaryLengthText = document.getElementById('summary-length-text')
const summarizeButton = document.getElementById('summarize-button')
const summaryOutputArea = document.getElementById('summary-output-area')
const summaryContent = summaryOutputArea
const copyButton = document.getElementById('copy-button')
const clearButton = document.getElementById('clear-button')
const loadingSection = document.getElementById('loading-section')
const errorSection = document.getElementById('error-section')
const errorMessage = document.getElementById('error-message')
const dismissErrorButton = document.getElementById('dismiss-error-button')
const copiedBadge = document.getElementById('copied-badge')

// Button Event Listeners
summarizeButton.addEventListener('click', summarize)
copyButton.addEventListener('click', copy)
clearButton.addEventListener('click', clear)
dismissErrorButton.addEventListener('click', dismissError)

// Other Event Listeners
document.addEventListener('DOMContentLoaded', focusOnTextInputArea)
textInputArea.addEventListener('input', scrollTextAreaToTopAndEnableControls)
summaryLengthInput.addEventListener('input', updateSummaryLengthText)

// Button Event Handlers
async function summarize() {
    startLoading()
    const text = textInputArea.value
    const summaryLength = summaryLengthInput.value

    try {
        const response = await fetch('http://localhost:8026/v1/api/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, summaryLength }),
        })

        if (!response.ok) {
            const { error } = await response.json()
            throw new Error(error)
        }

        const { summary } = await response.json()
        endLoading()
        summaryOutputArea.value = summary
        enableSummaryOutputArea()
        enableCopyButton()
        focusOnCopyButton()
    } catch (error) {
        handleError(error)
    }
}

async function copy() {
    try {
        await navigator.clipboard.writeText(summaryOutputArea.value)
        showCopyFeedback('😄 Copied', 'success')
    } catch (err) {
        showCopyFeedback('😔 Failed', 'failure')
    }
}

function clear() {
    clearTextInputArea()
    clearSummaryOutputArea()
    enableTextInputArea()
    focusOnTextInputArea()
    disableAllControls()
}

function dismissError() {
    hideErrorSection()
    displaySummaryContent()
    clear()
}

// Other Event Handlers
function focusOnTextInputArea() {
    textInputArea.focus()
}

function scrollTextAreaToTopAndEnableControls() {
    scrollTextAreaToTop()
    enableControls()
}

function updateSummaryLengthText() {
    const value = Number(summaryLengthInput.value)
    const wordLabel = value === 1 ? 'word' : 'words'
    summaryLengthText.textContent = `${value} ${wordLabel}`
}

// Helper Functions
function scrollTextAreaToTop() {
    setTimeout(() => {
        textInputArea.scrollTop = 0
    }, 0)
}

function enableControls() {
    if (textInputArea.value.trim() !== '') {
        enableSummaryLengthContainer()
        enableSummaryLengthInput()
        enableSummarizeButton()
        enableClearButton()
    } else {
        disableAllControls()
    }
}

function disableAllControls() {
    disableSummaryLengthContainer()
    disableSummaryLengthInput()
    disableSummarizeButton()
    disableSummaryOutputArea()
    disbaleClearButton()
    disableCopyButton()
}

function startLoading() {
    hideSummaryContent()
    displayLoadingSection()
}

function endLoading() {
    hideLoadingSection()
    displaySummaryContent()
}

function handleError(error) {
    endLoading()
    disableTextInputArea()
    disableAllControls()
    hideSummaryContent()
    setErrorMessageText(`There was an error processing the text: ${error.message}`)
    displayErrorSection()
}

function showCopyFeedback(message, status) {
    const feedbackClass = status === 'success' ? 'copied' : 'failed'
    addClassToCopyButton(feedbackClass)
    setCopyButtonText(message)
    setTimeout(() => {
        removeClassFromCopyButton(feedbackClass)
        setCopyButtonText('Copy')
    }, feedbackDisplayTime)
}

function focusOnCopyButton() {
    copyButton.focus()
}

function displaySummaryContent() {
    if (!summaryContent) return
    summaryContent.style.display = 'block'
}

function displayLoadingSection() {
    loadingSection.style.display = 'flex'
}

function displayErrorSection() {
    errorSection.style.display = 'flex'
}

function hideLoadingSection() {
    loadingSection.style.display = 'none'
}

function hideErrorSection() {
    errorSection.style.display = 'none'
}

function hideSummaryContent() {
    if (!summaryContent) return
    summaryContent.style.display = 'none'
}

function enableTextInputArea() {
    textInputArea.disabled = false
}

function enableSummaryLengthContainer() {
    if (!summaryLengthContainer) return
    summaryLengthContainer.classList.remove('disabled')
}

function enableClearButton() {
    clearButton.disabled = false
}

function enableSummarizeButton() {
    summarizeButton.disabled = false
}

function enableSummaryLengthInput() {
    summaryLengthInput.disabled = false
}

function enableCopyButton() {
    copyButton.disabled = false
}

function enableSummaryOutputArea() {
    summaryOutputArea.disabled = false
}

function disableCopyButton() {
    copyButton.disabled = true
}

function disbaleClearButton() {
    clearButton.disabled = true
}

function disableSummaryOutputArea() {
    summaryOutputArea.disabled = true
}

function disableSummarizeButton() {
    summarizeButton.disabled = true
}

function disableSummaryLengthInput() {
    summaryLengthInput.disabled = true
}

function disableSummaryLengthContainer() {
    if (!summaryLengthContainer) return
    summaryLengthContainer.classList.add('disabled')
}

function disableTextInputArea() {
    textInputArea.disabled = true
}

function setErrorMessageText(text) {
    errorMessage.textContent = text
}

function setCopyButtonText(text) {
    copyButton.textContent = text
}

function addClassToCopyButton(className) {
    copyButton.classList.add(className)
}

function removeClassFromCopyButton(className) {
    copyButton.classList.remove(className)
}

function showCopiedBadge(message) {
    if (!copiedBadge) return
    copiedBadge.textContent = message
    copiedBadge.classList.add('active')
    setTimeout(() => {
        copiedBadge.classList.remove('active')
    }, feedbackDisplayTime)
}

function clearTextInputArea() {
    textInputArea.value = ''
}

function clearSummaryOutputArea() {
    summaryOutputArea.value = ''
}
