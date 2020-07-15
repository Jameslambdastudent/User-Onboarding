import React, { useState, useEffect } from "react"
import * as yup from "yup"
import axios from "axios"

function Form () {
    const defaultState = {
        Name: "",
        Email: "",
        Powers: "",
        Password: "",
        Terms: false,
    }
    const [user, setUser] = useState(defaultState);
    const [disableButton, setDisableButton] = useState(true);
    const [errors, setErrors] = useState({ ...defaultState, terms: "" });
   
    let formSchema = yup.object().shape({
        name: yup.string().required("Add your hero name"),
        superpowers: yup.string().required("Please tell us your super powers "),
        email: yup.string().required("Valid emails only").email("Your Email must be valid"),
        password: yup.string().required("Input valid password").min(6,"Password must be at least 6 characters"),
        terms: yup.string().required("You have to accept our terms").oneOf([true], "Youhave to accept our terms")
    })

    useEffect(() => {
      // formSchema.isValid(formState).then(valid => setButtonDisabled(!valid));
      if (user.terms) {
        setDisableButton(!user.terms);
      }
    }, [user]);

    const formSubmit = e => {
      e.preventDefault();
      axios
        .post("https://reqres.in/api/users", user)
        .then((res) => 
        setUser([...user, res.data]),
        console.log("succes, user"),
        )
        .catch(err => console.log(err));
    };

    
    const validateChange = e => {
      //this allows react to keep the event object to play nice with async op
      e.persist();
      if (e.target.value.length === 0) {
        setErrors({
          ...errors,
          [e.target.name]: `${e.target.name} field is required`
        });
      }
    };

    const inputChange = e => {
      const value =
       e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setUser({
        ...user,
        [e.target.name]: value
      });
      validateChange(e);
    };


    

     

    

    

    return (
        <form onSubmit={formSubmit}>
         
         <label htmlFor="name">Name</label>
            <input
                name="name"
                type="text"
                id="name"
                onChange={inputChange}
                value={user.name}
                error={errors}
            />
            

             <label htmlFor="name">Hero Name</label>
            <input
                name="name"
                type="text"
                id="hero name"
                onChange={inputChange}
                value={user.superpowers}
                error={errors}
            />

            <label htmlFor="email">Email</label>
            <input
                name="email"
                type="text"
                id="email"
                onChange={inputChange}
                value={user.email}
                error={errors}
            />
            <label htmlFor="password">Password</label>
            <input
                name="passsword"
                type="password"
                id="password"
                onChange={inputChange}
                value={user.password}
                error={errors}
            />
      
      <label className="terms" htmlFor="terms">
        <input name="terms" type="checkbox" onChange={inputChange} />
        Terms & Conditions
      </label>
      <button disabled={disableButton}>Submit</button>
        </form>

    )
}

export default Form