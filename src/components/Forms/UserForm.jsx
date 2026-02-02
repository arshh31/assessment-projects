import React,{useState} from 'react'
import "./UserForm.css"

const UserForm = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [id,setId] = useState("")
    const [password,setPassword] = useState("")
    const [toggle,setToggle] = useState(false)

    const [errors,setErrors] = useState({})
    const [submittedData, setSubmittedData]= useState(null)

    const onChangeName = (event)=>{
        setName(event.target.value)
    }

    const onChangeEmail = (event)=>{
        setEmail(event.target.value)
    }
    const onChangeId = (event)=>{
        setId(event.target.value)
    }
    const onChangePassword = (event) =>{
        setPassword(event.target.value)
    }

    const showPassword = () =>{
        setToggle((prevState)=>!prevState)
    }

    const validate = () =>{
        const newErrors = {}
        if(!name.trim()) newErrors.name="Name is required"
        if(!email.trim()){
            newErrors.email="Invalid Email"
        }else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
        if(!id.trim()) newErrors.id="Id is required"
        if(!password.trim()) newErrors.password="Password is required"

        return newErrors
    }

    const onSubmitForm =(event)=>{
          event.preventDefault();

          const validationErrors = validate()

          if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors)
            return
          }

          setSubmittedData({
            name,email,id,password
          })

          setEmail("")
          setId("")
          setErrors({})
          setName("")
          setToggle(false)
          setPassword("")
    }

  return (
    <>
    <div className='headingContainer'>
    <h1>User Registration Form</h1>
    <form className="wholeContainer" onSubmit={onSubmitForm}> 
        <label htmlFor="nameInput" className='labelHeading'>Name</label>
        <input className="inputElement" type="text" id="nameInput" onChange={onChangeName} value={name}/> 
        {errors.name && <p className='error'>{errors.name}</p>}

        <label htmlFor="emailInput" className='labelHeading'>Email</label>
        <input className="inputElement" type="email" id="emailInput" onChange={onChangeEmail} value={email}/> 
        {errors.email && <p className='error'>{errors.email}</p>}

        <label htmlFor="Id" className='labelHeading'>Id</label>
        <input className="inputElement" type="text" id="Id" onChange={onChangeId} value={id}/> 
        {errors.id && <p className="error">{errors.id}</p>}

        <label htmlFor="inputPassword" className='labelHeading'>Password</label>
        <div>
        <input className="inputElement" type={toggle?"text":"password"} id="inputPassword" onChange={onChangePassword} value={password}/> 
        <button type="button" onClick={showPassword}>{toggle ? "Hide" : "Show"}</button>
        </div>
        

        <button type="submit">submit</button>
    </form>
    {submittedData && (
        <div>
            <h3>Submitted Data</h3>
            <p>Name :{submittedData.name}</p>
            <p>Email :{submittedData.email}</p>
            <p>Id:{submittedData.id}</p>
           
        </div>
    )}
    </div>
    </>
  )
}

export default UserForm
