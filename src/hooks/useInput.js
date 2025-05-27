import { useReducer } from "react";

const defaultInputState = {
  enteredValue: "",
  wasTouched: false,
};

const inputStateReducer = (prevState, action) => {
  if (action.type === "NEW_VALUE") {
    return {
      enteredValue: action.value,
      wasTouched: prevState.wasTouched,
    };
  }

  if (action.type === "WAS_TOUCHED") {
    return {
      enteredValue: prevState.enteredValue,
      wasTouched: true,
    };
  }

  return defaultInputState;
};

const useInput = (validValueFunc) => {
  const [inputState, dispatchInputAction] = useReducer(
    inputStateReducer,
    defaultInputState
  );

  const inputValueValid = validValueFunc(inputState.enteredValue);
  const isInputValueInvalid = !inputValueValid && inputState.wasTouched;

  const inputValueChangeHandler = (event) => {
    dispatchInputAction({ type: "NEW_VALUE", value: event.target.value });
  };

  const inputLostFocusHandler = () => {
    dispatchInputAction({ type: "WAS_TOUCHED" });
  };

  const resetValues = () => {
    dispatchInputAction({ type: "RESET_VALUES" });
  };

  return {
    value: inputState.enteredValue,
    isValid: inputValueValid,
    hasError: isInputValueInvalid,
    inputValueChangeHandler,
    inputLostFocusHandler,
    resetValues,
  };
};

export default useInput;
