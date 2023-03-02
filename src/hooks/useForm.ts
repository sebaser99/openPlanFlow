import { useState,ChangeEvent, FormEvent } from "react";



export const useForm  = (initialValue = {text: ''})  => {
  const [formValue, setFormValue] = useState(initialValue)
  const [submit, setSubmit] = useState(false)

  const handleChangeInput = ({target}: ChangeEvent<HTMLInputElement> ) =>{
    setFormValue({
        ...formValue,
        [target.name ] : target.value
        })
     
    }  
    const reset = ()=>{
        setFormValue(initialValue)
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(formValue)
        setSubmit(true)
        
    }

    return {
        formValue,
        handleChangeInput,
        reset,
        handleSubmit,
        submit
    }
}