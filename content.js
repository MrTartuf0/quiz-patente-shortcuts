// content.js
document.addEventListener('keydown', function(event) {
  // Check if we're in a quiz page (look for elements that are only on quiz pages)
  const quizElements = document.querySelectorAll('.vedidomanda');
  if (quizElements.length === 0) return;
  
  // Don't capture keypresses when user is typing in input fields
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;
  
  switch (event.key) {
    // Original shortcuts
    case 'ArrowLeft':
    case 'h': // Vim-style: left/previous
      // Go to previous question
      const prevButton = document.querySelector('img[title="Domanda Precedente"]');
      if (prevButton) {
        prevButton.click();
        event.preventDefault(); // Prevent default browser behavior
      }
      break;
      
    case 'ArrowRight':
    case 'Space':
    case 'l': // Vim-style: right/next
      // Go to next question
      const nextButton = document.querySelector('img[title="Domanda Successiva"]');
      if (nextButton) {
        nextButton.click();
        event.preventDefault(); // Prevent default browser behavior
      }
      break;
      
    case 'v':
    case 'j': // Vim-style: down/true (Vero)
      // Select "Vera" (True) answer
      const currentQuestionDiv = getCurrentVisibleQuestion();
      if (currentQuestionDiv) {
        const questionNumber = getQuestionNumber(currentQuestionDiv);
        const trueRadio = document.querySelector(`#risposta${questionNumber}_1`);
        if (trueRadio) {
          trueRadio.click();
          event.preventDefault();
        }
      }
      break;
      
    case 'f':
    case 'k': // Vim-style: up/false (Falso)
      // Select "Falsa" (False) answer
      const currentDiv = getCurrentVisibleQuestion();
      if (currentDiv) {
        const qNumber = getQuestionNumber(currentDiv);
        const falseRadio = document.querySelector(`#risposta${qNumber}_0`);
        if (falseRadio) {
          falseRadio.click();
          event.preventDefault();
        }
      }
      break;
      
    case 'Enter':
      // Find the "Correggi" button
      const correggiButton = document.querySelector('input[value="Correggi"].correggi');
      if (correggiButton) {
        correggiButton.click();
        event.preventDefault(); // Prevent default browser behavior
      }
      break;
  }
});

/**
 * Gets the currently visible question div
 * @returns {Element|null} The visible question div or null if not found
 */
function getCurrentVisibleQuestion() {
  const visibleQuestions = Array.from(document.querySelectorAll('.vedidomanda'))
    .filter(div => {
      const style = window.getComputedStyle(div);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
  
  return visibleQuestions.length > 0 ? visibleQuestions[0] : null;
}

/**
 * Extracts the question number from the question div's ID
 * @param {Element} questionDiv - The question div element
 * @returns {string} The question number
 */
function getQuestionNumber(questionDiv) {
  // The ID is in the format "vedidomandaX" where X is the question number
  return questionDiv.id.replace('vedidomanda', '');
}
