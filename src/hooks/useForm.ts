import { useState } from 'react'

type TuseForm = {values: {[name: string]: string}; handleChange; setValues: Function};

export function useForm(inputValues: {[name: string]: string}): TuseForm {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}