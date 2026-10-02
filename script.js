function calculateGrade() {
    const currentGrade = parseFloat(
        document.getElementById("currentGrade").value
    );

    const desiredGrade = parseFloat(
        document.getElementById("desiredGrade").value
    );

    const examWeight = parseFloat(
        document.getElementById("examWeight").value
    );

    const result = document.getElementById("result");
    const requiredGrade = document.getElementById("requiredGrade");
    const error = document.getElementById("error");

    // Clear previous messages
    error.textContent = "";
    result.style.display = "none";

    // Validation
    if (isNaN(currentGrade) || isNaN(desiredGrade) || isNaN(examWeight)) {
        error.textContent = "Please enter all required values.";
        return;
    }

    if (currentGrade < 0 || currentGrade > 100) {
        error.textContent = "Current grade must be between 0 and 100.";
        return;
    }

    if (desiredGrade < 0 || desiredGrade > 100) {
        error.textContent = "Desired grade must be between 0 and 100.";
        return;
    }

    if (examWeight <= 0 || examWeight > 100) {
        error.textContent = "Final exam weight must be greater than 0 and no more than 100%.";
        return;
    }

    // Convert exam percentage to decimal
    const examWeightDecimal = examWeight / 100;

    // Final Grade Formula:
    // Required Exam Grade =
    // (Desired Grade - Current Grade × (1 - Exam Weight)) / Exam Weight

    const required = (
        desiredGrade -
        currentGrade * (1 - examWeightDecimal)
    ) / examWeightDecimal;

    // Maximum possible final course grade
    const maxPossibleGrade =
        currentGrade * (1 - examWeightDecimal) +
        100 * examWeightDecimal;

    // Display result
    if (required <= 0) {
        requiredGrade.textContent =
            "You already have enough points to reach your desired grade.";

    } else if (required <= 100) {
        requiredGrade.textContent =
            `You need ${required.toFixed(2)}% on the final exam.`;

    } else {
        requiredGrade.textContent =
            `You would need ${required.toFixed(2)}%, which is above 100%.`;
    }

    result.style.display = "block";
}


function resetCalculator() {
    document.getElementById("currentGrade").value = "";
    document.getElementById("desiredGrade").value = "";
    document.getElementById("examWeight").value = "";

    document.getElementById("result").style.display = "none";
    document.getElementById("requiredGrade").textContent = "";
    document.getElementById("error").textContent = "";
}
