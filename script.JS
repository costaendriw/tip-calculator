// ========================================
// TIP CALCULATOR - MAIN FUNCTIONALITY
// ========================================

// DOM Elements
const billAmountInput = document.getElementById('billAmount');
const customTipInput = document.getElementById('customTip');
const numPeopleInput = document.getElementById('numPeople');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsDiv = document.getElementById('results');
const tipAmountDisplay = document.getElementById('tipAmount');
const totalBillDisplay = document.getElementById('totalBill');
const perPersonDisplay = document.getElementById('perPerson');
const tipButtons = document.querySelectorAll('.tip-btn');
const decreaseBtn = document.getElementById('decreasePeople');
const increaseBtn = document.getElementById('increasePeople');

// State
let selectedTipPercentage = 18; // Default 18%

// ========================================
// EVENT LISTENERS
// ========================================

// Tip percentage buttons
tipButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        tipButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get tip percentage
        selectedTipPercentage = parseInt(this.getAttribute('data-tip'));
        
        // Clear custom tip input
        customTipInput.value = '';
        
        // Calculate if bill amount exists
        if (billAmountInput.value) {
            calculateTip();
        }
    });
});

// Custom tip input
customTipInput.addEventListener('input', function() {
    if (this.value) {
        // Remove active class from all preset buttons
        tipButtons.forEach(btn => btn.classList.remove('active'));
        
        // Update selected tip percentage
        selectedTipPercentage = parseFloat(this.value) || 0;
        
        // Calculate if bill amount exists
        if (billAmountInput.value) {
            calculateTip();
        }
    }
});

// Bill amount input - auto calculate on input
billAmountInput.addEventListener('input', function() {
    if (this.value) {
        calculateTip();
    }
});

// People control buttons
decreaseBtn.addEventListener('click', function() {
    let currentValue = parseInt(numPeopleInput.value);
    if (currentValue > 1) {
        numPeopleInput.value = currentValue - 1;
        if (billAmountInput.value) {
            calculateTip();
        }
    }
});

increaseBtn.addEventListener('click', function() {
    let currentValue = parseInt(numPeopleInput.value);
    if (currentValue < 50) {
        numPeopleInput.value = currentValue + 1;
        if (billAmountInput.value) {
            calculateTip();
        }
    }
});

// Calculate button
calculateBtn.addEventListener('click', calculateTip);

// Reset button
resetBtn.addEventListener('click', resetCalculator);

// Enter key to calculate
billAmountInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateTip();
    }
});

customTipInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateTip();
    }
});

// ========================================
// MAIN CALCULATION FUNCTION
// ========================================

function calculateTip() {
    // Get values
    const billAmount = parseFloat(billAmountInput.value);
    const tipPercentage = selectedTipPercentage;
    const numPeople = parseInt(numPeopleInput.value);
    
    // Validate inputs
    if (!billAmount || billAmount <= 0) {
        showError('Please enter a valid bill amount');
        return;
    }
    
    if (!tipPercentage || tipPercentage < 0) {
        showError('Please select or enter a valid tip percentage');
        return;
    }
    
    if (!numPeople || numPeople < 1) {
        showError('Number of people must be at least 1');
        return;
    }
    
    // Calculate tip and totals
    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalBill = billAmount + tipAmount;
    const perPerson = totalBill / numPeople;
    
    // Display results
    tipAmountDisplay.textContent = formatCurrency(tipAmount);
    totalBillDisplay.textContent = formatCurrency(totalBill);
    perPersonDisplay.textContent = formatCurrency(perPerson);
    
    // Show results section
    resultsDiv.style.display = 'block';
    
    // Smooth scroll to results on mobile
    if (window.innerWidth < 768) {
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

function showError(message) {
    // You can enhance this with a better error display
    alert(message);
}

function resetCalculator() {
    // Clear all inputs
    billAmountInput.value = '';
    customTipInput.value = '';
    numPeopleInput.value = '1';
    
    // Reset to default tip (18%)
    tipButtons.forEach(btn => {
        if (btn.getAttribute('data-tip') === '18') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    selectedTipPercentage = 18;
    
    // Hide results
    resultsDiv.style.display = 'none';
    
    // Clear results
    tipAmountDisplay.textContent = '$0.00';
    totalBillDisplay.textContent = '$0.00';
    perPersonDisplay.textContent = '$0.00';
}

// ========================================
// INPUT VALIDATION
// ========================================

// Prevent negative numbers in bill amount
billAmountInput.addEventListener('input', function() {
    if (this.value < 0) {
        this.value = 0;
    }
});

// Prevent invalid tip percentages
customTipInput.addEventListener('input', function() {
    if (this.value < 0) {
        this.value = 0;
    }
    if (this.value > 100) {
        this.value = 100;
    }
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to calculate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        calculateTip();
    }
    
    // Escape to reset
    if (e.key === 'Escape') {
        resetCalculator();
    }
});

// ========================================
// AUTO-FOCUS ON LOAD
// ========================================

window.addEventListener('load', function() {
    // Focus on bill amount input when page loads
    billAmountInput.focus();
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// ANALYTICS TRACKING (Optional)
// ========================================

function trackCalculation(billAmount, tipPercentage, tipAmount) {
    // Add Google Analytics event tracking here if needed
    // Example:
    // gtag('event', 'calculate_tip', {
    //     'bill_amount': billAmount,
    //     'tip_percentage': tipPercentage,
    //     'tip_amount': tipAmount
    // });
    
    console.log('Calculation tracked:', {
        billAmount,
        tipPercentage,
        tipAmount
    });
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for auto-calculation
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to auto-calculation
const debouncedCalculate = debounce(calculateTip, 300);

// Replace direct auto-calculation with debounced version
billAmountInput.removeEventListener('input', calculateTip);
billAmountInput.addEventListener('input', function() {
    if (this.value) {
        debouncedCalculate();
    }
});

// ========================================
// PRINT FUNCTIONALITY (Optional)
// ========================================

function printResults() {
    if (resultsDiv.style.display === 'block') {
        window.print();
    } else {
        alert('Please calculate first before printing');
    }
}

// ========================================
// LOCAL STORAGE (Save last used settings)
// ========================================

function saveSettings() {
    const settings = {
        tipPercentage: selectedTipPercentage,
        numPeople: numPeopleInput.value
    };
    localStorage.setItem('tipCalculatorSettings', JSON.stringify(settings));
}

function loadSettings() {
    const savedSettings = localStorage.getItem('tipCalculatorSettings');
    if (savedSettings) {
        try {
            const settings = JSON.parse(savedSettings);
            
            // Restore tip percentage
            if (settings.tipPercentage) {
                selectedTipPercentage = settings.tipPercentage;
                
                // Activate corresponding button
                tipButtons.forEach(btn => {
                    if (parseInt(btn.getAttribute('data-tip')) === settings.tipPercentage) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                
                // If custom percentage, show in custom input
                const isPresetButton = Array.from(tipButtons).some(
                    btn => parseInt(btn.getAttribute('data-tip')) === settings.tipPercentage
                );
                if (!isPresetButton) {
                    customTipInput.value = settings.tipPercentage;
                    tipButtons.forEach(btn => btn.classList.remove('active'));
                }
            }
            
            // Restore number of people
            if (settings.numPeople) {
                numPeopleInput.value = settings.numPeople;
            }
        } catch (e) {
            console.error('Error loading settings:', e);
        }
    }
}

// Load settings on page load
window.addEventListener('load', loadSettings);

// Save settings on change
tipButtons.forEach(button => {
    button.addEventListener('click', saveSettings);
});

customTipInput.addEventListener('input', saveSettings);
decreaseBtn.addEventListener('click', saveSettings);
increaseBtn.addEventListener('click', saveSettings);

// ========================================
// PWA SUPPORT (Optional - for future)
// ========================================

// Register service worker if available
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you create a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Announce results to screen readers
function announceResults(tipAmount, totalBill, perPerson) {
    const announcement = `Tip calculated: Tip amount is ${formatCurrency(tipAmount)}, 
                         Total bill is ${formatCurrency(totalBill)}, 
                         Amount per person is ${formatCurrency(perPerson)}`;
    
    // Create live region for screen readers
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = announcement;
    document.body.appendChild(liveRegion);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(liveRegion);
    }, 1000);
}

// Add to calculate function
const originalCalculate = calculateTip;
calculateTip = function() {
    originalCalculate();
    
    if (resultsDiv.style.display === 'block') {
        const tipAmount = parseFloat(tipAmountDisplay.textContent.replace('$', ''));
        const totalBill = parseFloat(totalBillDisplay.textContent.replace('$', ''));
        const perPerson = parseFloat(perPersonDisplay.textContent.replace('$', ''));
        
        announceResults(tipAmount, totalBill, perPerson);
    }
};

// ========================================
// CONSOLE LOG (Development)
// ========================================

console.log('✅ Tip Calculator loaded successfully');
console.log('💡 Keyboard shortcuts: Ctrl/Cmd+Enter to calculate, Esc to reset');