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
    const resultMessage = document.getElementById("resultMessage");
    const error = document.getElementById("error");


    // Reset previous messages

    error.textContent = "";
    result.style.display = "none";
    requiredGrade.textContent = "";
    resultMessage.textContent = "";


    // Validate empty fields

    if (
        isNaN(currentGrade) ||
        isNaN(desiredGrade) ||
        isNaN(examWeight)
    ) {
        error.textContent = "Please enter all three values.";
        return;
    }


    // Validate current grade

    if (currentGrade < 0 || currentGrade > 100) {
        error.textContent =
            "Current grade must be between 0% and 100%.";
        return;
    }


    // Validate desired grade

    if (desiredGrade < 0 || desiredGrade > 100) {
        error.textContent =
            "Desired grade must be between 0% and 100%.";
        return;
    }


    // Validate exam weight

    if (examWeight <= 0 || examWeight > 100) {
        error.textContent =
            "Final exam weight must be greater than 0% and no more than 100%.";
        return;
    }


    // Convert percentage to decimal

    const examWeightDecimal = examWeight / 100;


    /*
        Formula:

        Required Exam Grade =
        (Desired Grade -
        Current Grade × (1 - Exam Weight))
        ÷ Exam Weight
    */

    const required =
        (
            desiredGrade -
            currentGrade * (1 - examWeightDecimal)
        ) / examWeightDecimal;


    // Maximum possible overall grade
    // assuming the student scores 100% on the final.

    const maximumPossibleGrade =
        currentGrade * (1 - examWeightDecimal) +
        100 * examWeightDecimal;


    // Show result

    result.style.display = "block";


    // Student already has enough points

    if (required <= 0) {

        requiredGrade.textContent = "0% or less";

        resultMessage.textContent =
            "You already have enough points to reach your desired grade.";

        return;
    }


    // Required grade is achievable

    if (required <= 100) {

        requiredGrade.textContent =
            `${required.toFixed(2)}%`;

        resultMessage.textContent =
            `You need approximately ${required.toFixed(2)}% on your final exam to reach ${desiredGrade}%.`;

        return;
    }


    // Required grade is above 100%

    requiredGrade.textContent =
        `${required.toFixed(2)}%`;

    resultMessage.textContent =
        `This target is not achievable with the final exam alone. Your maximum possible overall grade is ${maximumPossibleGrade.toFixed(2)}%.`;
}


function resetCalculator() {

    document.getElementById("currentGrade").value = "";
    document.getElementById("desiredGrade").value = "";
    document.getElementById("examWeight").value = "";

    document.getElementById("result").style.display = "none";

    document.getElementById("requiredGrade").textContent = "";

    document.getElementById("resultMessage").textContent = "";

    document.getElementById("error").textContent = "";
}
