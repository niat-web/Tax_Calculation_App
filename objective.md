# Tax_Calculation_App

## Objective
This project implements a tax calculation application using JavaScript, HTML, and CSS. The application allows users to input their salary, bonus, deductions (80C and medical expenses), and country of residence, and then calculates their total income, taxable income, tax liability, and net income after tax. The application uses JavaScript for the core calculation logic, including country-specific tax slab implementations for the US, India, and the UK. It incorporates features like real-time input validation, dark/light mode toggle, and a download summary functionality using jsPDF.

## Output
<iframe src="https://niat-web.github.io/Tax_Calculation_App/" height="1000" width="300" title="Tax_Calculation_App"></iframe>

## Project Requirements
**Technologies:** HTML, CSS, JavaScript, jsPDF

## Features to Implement
- Input fields for salary, bonus, 80C deductions, and medical expenses.
- Country selection dropdown (US, India, UK).
- Real-time form validation for salary input.

## UI Enhancements
- Dark/Light mode toggle with persistent theme storage.
- Display of calculated values: Total Income, Taxable Income, Tax Liability, and Net Income.

## Project Tasks & Expected Outcomes
| Task | Expected Outcome |
|------|------------------|
| Implement input form | A form with input fields for salary, bonus, deductions, and country selection. |
| Calculate total income | Total income is calculated by summing salary and bonus inputs. |
| Calculate taxable income | Taxable income is calculated by subtracting total deductions from total income, ensuring it is not negative. |
| Calculate tax liability | Tax liability is calculated based on the selected country's tax slabs and taxable income. |
| Display results | Calculated values (total income, taxable income, tax liability, and net income) are displayed on the UI. |
| Implement Download Summary | A button that generates and downloads a PDF summary of the tax calculation. |
| Implement Dark/Light Mode | A toggle that switches between dark and light modes, changing the CSS theme. |
| Implement reset functionality | The form is reset and all values cleared when the reset button is clicked. |

## JavaScript Concepts
| Concept | Implementation |
|---------|----------------|
| DOM Manipulation | Used to access and modify HTML elements, add event listeners, and update content. |
| Event Handling | Used to respond to user interactions like form submission, button clicks, and input changes. |
| Form Validation | Used to ensure user inputs are valid before calculations. |
| Conditional Logic | Used to implement country-specific tax calculation logic. |
| Array Methods | Used `map` to create a list of tax optimization tips. Also used filter and reduce to simulate calculation of deductible expenses. |
| `jsPDF` Library | Used to generate PDF document for download. |

## API Details
| API | Endpoint | Description |
|-----|----------|-------------|
| jsPDF | `new jsPDF()` | Creates a new jsPDF document instance. |
| jsPDF | `doc.text(text, x, y)` | Adds text to the PDF document at the specified coordinates. |
| jsPDF | `doc.save(filename)` | Saves the PDF document with the specified filename. |