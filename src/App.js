import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Results from "./components/TableResult/Results";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];

  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    console.log({
      currentSavings,
      yearlyContribution,
      expectedReturn,
      duration,
    }); // log pour déboguer

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  console.log(yearlyData); // log pour déboguer

  return (
    <div>
      <Header />
      <Form onCalculate={calculateHandler} />
      {!userInput && <p>No investement calculated yet.</p>}
      {userInput && (
        <Results
          data={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;