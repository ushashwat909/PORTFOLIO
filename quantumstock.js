document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const principalInput = document.getElementById('principal');
    const contributionInput = document.getElementById('contribution');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');

    const principalDisplay = document.getElementById('principal-display');
    const contributionDisplay = document.getElementById('contribution-display');
    const rateDisplay = document.getElementById('rate-display');
    const yearsDisplay = document.getElementById('years-display');

    const maturityValueDisplay = document.getElementById('maturity-value');
    const totalContributionsDisplay = document.getElementById('total-contributions');
    const growthYieldDisplay = document.getElementById('growth-yield');

    // Formatting utilities
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    // Calculate Compound Interest
    const calculateCompoundInterest = () => {
        const principal = parseFloat(principalInput.value);
        const monthlyContribution = parseFloat(contributionInput.value);
        const annualRate = parseFloat(rateInput.value) / 100;
        const years = parseInt(yearsInput.value);

        const months = years * 12;
        const monthlyRate = annualRate / 12;

        let totalValue = principal;
        let totalContributions = principal;

        for (let i = 0; i < months; i++) {
            totalValue += monthlyContribution; // Add contribution at the beginning of the month
            totalValue *= (1 + monthlyRate);   // Apply interest
            totalContributions += monthlyContribution;
        }

        const growthYield = totalValue - totalContributions;

        // Update displays
        maturityValueDisplay.textContent = formatCurrency(totalValue);
        totalContributionsDisplay.textContent = formatCurrency(totalContributions);
        growthYieldDisplay.textContent = formatCurrency(growthYield);
    };

    // Update Input Displays
    const updateInputDisplays = () => {
        principalDisplay.textContent = formatCurrency(parseFloat(principalInput.value));
        contributionDisplay.textContent = formatCurrency(parseFloat(contributionInput.value));
        rateDisplay.textContent = rateInput.value + '%';
        yearsDisplay.textContent = yearsInput.value + ' Years';
    };

    // Event Listeners
    const inputs = [principalInput, contributionInput, rateInput, yearsInput];
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateInputDisplays();
            calculateCompoundInterest();
            
            // Visual slider progress effect (optional enhancement)
            const value = (input.value - input.min) / (input.max - input.min) * 100;
            input.style.background = `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${value}%, #e2e8f0 ${value}%, #e2e8f0 100%)`;
        });
        
        // Initialize gradient background on load
        input.dispatchEvent(new Event('input'));
    });
});
