import React , { useState } from 'react';

import {
  Button,
  StepLabel,
  Stepper,
  Step
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
const defaultState = {
  title: '',
  readyInMinutes: 0,
  servings: 0,
  cuisine: '',
  favorited: false,
  ingredients: [],
  instructions: {},
  collectionName: 'customrecipes',
};

function getSteps() {
  return ['Recipe Details', 'Ingredients', 'Instructions'];
}
function getStepContent(step) {
  const textInput = React.useRef(null);
  const [recipe, getRecipe] = useState(defaultState);
  const _handleTextFieldChange = e => {
    const fieldId = e.target.id;
    const fieldValue = e.target.value;
    getRecipe({
      ...recipe,
      [fieldId]: fieldValue
    });
  };
  const [ingredientList, updateIngredientsList] = useState([]);
  const _handleIngredientButtonClick = (e, textInput) => {
    // console.log(textInput);
    let data = document.getElementById('ingredientEntry').value;
    const newIngredients = [...recipe.ingredients, data];
    // console.log(newIngredients);
    getRecipe({
      ...recipe,
      ingredients: newIngredients,
    });
    // console.log(recipe.ingredients);
    // console.log(newIngredients);
    const tmpIngredientList = [];
    newIngredients.forEach((ingredient) => {
      tmpIngredientList.push(<li key={`${recipe.title}+${ingredient}`}>{ingredient}</li>);
    });
    updateIngredientsList(tmpIngredientList);
    document.getElementById('ingredientEntry').value = '';
  };
  const [instructionList, updateInstructionList] = useState([]);
  const _handleInstructionButtonClick = (e, textInput) => {
    console.log(textInput);
    let data = document.getElementById('instructionEntry').value;
    const numOfInstructions = Object.keys(recipe.instructions).length + 1;
    const newInstruction = { ...recipe.instructions, [numOfInstructions]:data };
    // console.log(newIngredients);
    getRecipe({
      ...recipe,
      instructions: newInstruction,
    });
    // console.log(recipe.instructions);
    // console.log(newInstruction);
    const tmpInstructionList = [];
    for (let i = 1; i < numOfInstructions + 1; i++) {
      tmpInstructionList.push((<li key={`${recipe.title}+${i}`}>{newInstruction[i]}</li>));
    }

    updateInstructionList(tmpInstructionList);
    document.getElementById('instructionEntry').value = '';
  };
  useEffect(() => {
    // console.log(recipe);
  }, [recipe]);
  const handleSendToServer = async () => {
    console.log(recipe);
    const bodyToSend = JSON.stringify({
      title: recipe.title,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      cuisine: recipe.cuisine,
      favorited: false,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      collectionName: 'customrecipes',
    });
    await fetch('/api', {
      method: 'POST',
      body: bodyToSend,
      headers: {
        'Content-type' : 'application/json',
      }
    }).then((resp) => resp.json()).then((json) => console.log(json));
  };
  
  switch (step) {
  case 0:
    return (
      <>
        <h2>Enter Recipe Details</h2>
        <TextField
          fullWidth
          id="title"
          label="Recipe Title"
          defaultValue="Tasty Meal"
          margin="normal"
          variant="filled"
          onChange={_handleTextFieldChange}
        />
        <TextField
          id="servings"
          label="Number of Servings"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          defaultValue='100'
          margin="normal"
          onChange={_handleTextFieldChange}


        />
        <TextField
          id="readyInMinutes"
          label="Enter Total Meal Time in Mins"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          defaultValue='45'
          margin="normal"
          padding="normal"
          onChange={_handleTextFieldChange}

        />
        <TextField
          id="cuisine"
          label="Enter cuisine type"
          type="string"
          defaultValue="BBQ"
          variant="filled"
          margin="normal"
          onChange={_handleTextFieldChange}

        />
      </>
    );
  case 1:
    return (
      <>
        <h2>Enter Ingredients for {recipe.title}</h2>
        <div>
          <TextField
            fullWidth
            id="ingredientEntry"
            label="Enter Next Ingredient"
            margin="normal"
            size="large"
            inputRef={textInput}
          />
          <Button onClick={() => { _handleIngredientButtonClick(textInput); }}>
            Submit Ingredient
          </Button>
        </div>
        <div>
          <ul>
            {ingredientList}
          </ul>
        </div>
      </>
    );
  case 2:
    return (
      <>
        <h2>Enter Recipe Steps for {recipe.title}</h2>
        <div>
          <TextField
            fullWidth
            id="instructionEntry"
            label="Enter Next Step"
            margin="normal"
            size="large"
            inputRef={textInput}
          />
          <Button onClick={() => { _handleInstructionButtonClick(textInput); }}>
              Submit Step
          </Button>
        </div>
        <div>
          <ol>
            {instructionList}
          </ol>

        </div>
        <Button variant="contained" color="primary" onClick={handleSendToServer}>
          {'Send to Server'}
        </Button>
      </>
    );
  default:
    return 'unknown step';
  }
}
const addCustom = props => {
  const [activeStep, setActiveStep] = React.useState(0);
  // const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  // const isStepOptional = step => {
  //   return step === 5;
  // };
  // const isStepSkipped = step => {
  //   return skipped.has(step);
  // };
  const handleNext = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }
    setActiveStep(activeStep + 1);
    // setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     throw new Error('You can\'t skip a step that isn\'t optional.');
  //   }
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  //   setSkipped(prevSkipped => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = 'optional';
          // }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            All steps completed
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {/* {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )} */}
              <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === steps.length-1}>
                {'Next'}
              </Button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default addCustom;