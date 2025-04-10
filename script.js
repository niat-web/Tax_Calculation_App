// script.js
document.addEventListener('DOMContentLoaded', function () {
    const taxForm = document.getElementById('taxForm');
    const salaryInput = document.getElementById('salary');
    const bonusInput = document.getElementById('bonus');
    const deductions80CInput = document.getElementById('deductions80C');
    const medicalExpensesInput = document.getElementById('medicalExpenses');
    const countrySelect = document.getElementById('country');

    const totalIncomeDisplay = document.getElementById('totalIncomeDisplay');
    const taxableIncomeDisplay = document.getElementById('taxableIncomeDisplay');
    const taxLiabilityDisplay = document.getElementById('taxLiabilityDisplay');
    const netIncomeDisplay = document.getElementById('netIncomeDisplay');
    const taxSlabBreakdown = document.getElementById('taxSlabBreakdown');

    const downloadSummaryButton = document.getElementById('downloadSummary');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme); //set the theme attribute
        darkModeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode'; //change the text of the button
    });

    // Form Validation (Real-time)
    salaryInput.addEventListener('input', () => {
        if (salaryInput.value === '' || isNaN(salaryInput.value)) {
            salaryInput.classList.add('is-invalid');
        } else {
            salaryInput.classList.remove('is-invalid');
        }
    });

    taxForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        if (salaryInput.value === '' || isNaN(salaryInput.value)) {
            salaryInput.classList.add('is-invalid');
            return;
        }

        // Get Input Values
        const salary = parseFloat(salaryInput.value) || 0;
        const bonus = parseFloat(bonusInput.value) || 0;
        const deductions80C = parseFloat(deductions80CInput.value) || 0;
        const medicalExpenses = parseFloat(medicalExpensesInput.value) || 0;
        const country = countrySelect.value;

        // Calculate Total Income
        const totalIncome = salary + bonus;

        // Calculate Taxable Income
        const totalDeductions = deductions80C + medicalExpenses;
        let taxableIncome = totalIncome - totalDeductions;
        taxableIncome = Math.max(0, taxableIncome); // Ensure taxable income is not negative

        // Tax Calculation Logic (Based on Country)
        let taxLiability = 0;
        let taxSlabDetails = '';

        if (country === 'US') {
            // US Tax Slabs (Example)
            const taxSlabs = [
                { rate: 0.10, max: 10275 },
                { rate: 0.12, max: 41775 },
                { rate: 0.22, max: 89075 },
                { rate: 0.24, max: 170050 },
                { rate: 0.32, max: 215950 },
                { rate: 0.35, max: 539900 },
                { rate: 0.37, max: Infinity }
            ];

            let remainingIncome = taxableIncome;
            taxSlabDetails = '<p><strong>Tax Slab Breakdown (US):</strong></p><ul>';
            for (const slab of taxSlabs) {
                const applicableIncome = Math.min(remainingIncome, slab.max - (taxSlabs[taxSlabs.indexOf(slab) - 1]?.max || 0));
                if (applicableIncome > 0) {
                    const tax = applicableIncome * slab.rate;
                    taxLiability += tax;
                    taxSlabDetails += `<li>$${applicableIncome.toFixed(2)} @ ${slab.rate * 100}% = $${tax.toFixed(2)}</li>`;
                    remainingIncome -= applicableIncome;
                }
            }
            taxSlabDetails += '</ul>';


        } else if (country === 'India') {
            // India Tax Slabs (Example) - Assuming Old Regime
            const taxSlabs = [
                { rate: 0.00, max: 250000 },
                { rate: 0.05, max: 500000 },
                { rate: 0.20, max: 1000000 },
                { rate: 0.30, max: Infinity }
            ];

            let remainingIncome = taxableIncome;
            taxSlabDetails = '<p><strong>Tax Slab Breakdown (India):</strong></p><ul>';
            for (const slab of taxSlabs) {
                const slabMax = slab.max;
                const prevSlabMax = taxSlabs[taxSlabs.indexOf(slab) - 1]?.max || 0;
                const applicableIncome = Math.min(remainingIncome, slabMax - prevSlabMax);
                if (applicableIncome > 0) {
                    const tax = applicableIncome * slab.rate;
                    taxLiability += tax;
                    taxSlabDetails += `<li>₹${applicableIncome.toFixed(2)} @ ${slab.rate * 100}% = ₹${tax.toFixed(2)}</li>`;
                    remainingIncome -= applicableIncome;
                }
            }
            taxSlabDetails += '</ul>';
        } else if (country === 'UK') {
            // UK Tax Slabs (Example)
            const taxSlabs = [
                { rate: 0.00, max: 12570 }, // Personal Allowance
                { rate: 0.20, max: 50270 }, // Basic Rate
                { rate: 0.40, max: 150000 }, // Higher Rate
                { rate: 0.45, max: Infinity }  // Additional Rate
            ];
            let remainingIncome = taxableIncome;
            taxSlabDetails = '<p><strong>Tax Slab Breakdown (UK):</strong></p><ul>';
            for (const slab of taxSlabs) {
                const slabMax = slab.max;
                const prevSlabMax = taxSlabs[taxSlabs.indexOf(slab) - 1]?.max || 0;
                const applicableIncome = Math.min(remainingIncome, slabMax - prevSlabMax);
                if (applicableIncome > 0) {
                    const tax = applicableIncome * slab.rate;
                    taxLiability += tax;
                    taxSlabDetails += `<li>£${applicableIncome.toFixed(2)} @ ${slab.rate * 100}% = £${tax.toFixed(2)}</li>`;
                    remainingIncome -= applicableIncome;
                }
            }
            taxSlabDetails += '</ul>';

        }

        // Calculate Net Income After Tax
        const netIncomeAfterTax = totalIncome - taxLiability;

        // Display Results
        totalIncomeDisplay.textContent = `$${totalIncome.toFixed(2)}`;
        taxableIncomeDisplay.textContent = `$${taxableIncome.toFixed(2)}`;
        taxLiabilityDisplay.textContent = `$${taxLiability.toFixed(2)}`;
        netIncomeDisplay.textContent = `$${netIncomeAfterTax.toFixed(2)}`;
        taxSlabBreakdown.innerHTML = taxSlabDetails;
    });

    taxForm.addEventListener('reset', function(){
        //Clear all the input fields
        salaryInput.value = "";
        bonusInput.value = "";
        deductions80CInput.value = "";
        medicalExpensesInput.value = "";
        countrySelect.value = "US";

        //Clear the display
        totalIncomeDisplay.textContent = "$0.00";
        taxableIncomeDisplay.textContent = "$0.00";
        taxLiabilityDisplay.textContent = "$0.00";
        netIncomeDisplay.textContent = "$0.00";
        taxSlabBreakdown.innerHTML = "";
    })

    downloadSummaryButton.addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text('Tax Calculation Summary', 10, 10);
        doc.text(`Total Income: $${parseFloat(totalIncomeDisplay.textContent.replace('$', '')).toFixed(2)}`, 10, 20);
        doc.text(`Taxable Income: $${parseFloat(taxableIncomeDisplay.textContent.replace('$', '')).toFixed(2)}`, 10, 30);
        doc.text(`Tax Liability: $${parseFloat(taxLiabilityDisplay.textContent.replace('$', '')).toFixed(2)}`, 10, 40);
        doc.text(`Net Income After Tax: $${parseFloat(netIncomeDisplay.textContent.replace('$', '')).toFixed(2)}`, 10, 50);
        doc.save('tax_summary.pdf');
    });

    // Real-time Calculation (Optional - can add to input fields)
    // Example:
    // salaryInput.addEventListener('input', calculateTax);

    // Example array usage
    const taxOptimizationTips = [
        "Invest in tax-saving schemes",
        "Maximize your deductions",
        "Consider tax-loss harvesting",
        "Consult a tax advisor"
    ];

    // Example of using map() to display optimization tips.
    const optimizationTipsList = document.getElementById("taxOptimizationSuggestions");
    taxOptimizationTips.map(tip => {
        const li = document.createElement("li");
        li.textContent = tip;
        optimizationTipsList.appendChild(li);
    });

    // Example of using filter and reduce (hypothetical)
    const expenseList = [
        {name: "Rent", amount: 1500, deductible: false},
        {name: "Medical Expenses", amount: 500, deductible: true},
        {name: "Charity", amount: 200, deductible: true}
    ];

    const deductibleExpensesTotal = expenseList
    .filter(expense => expense.deductible)
    .reduce((acc, expense) => acc + expense.amount, 0);

    console.log("Total Deductible Expenses:", deductibleExpensesTotal);
});