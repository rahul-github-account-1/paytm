function Signup(){
    return(
            <div>
                <h1>SignUp</h1>
                <h3>Create New User</h3>
                <InputBox label="First Name"></InputBox>
                <InputBox label="Last Name"></InputBox>
                <InputBox label="Email"></InputBox>
                <InputBox label="Password"></InputBox>
            </div>
    )
}

function InputBox(props){
    let placeholder='';
    placeholder="Enter your ";
    placeholder+=props.label.toLowerCase();
    if(props.label=="First Name"||props.label=="Last Name"){
        return(
            <div>
                <p>{props.label}</p>
                <div>
                    <input type="text" name={props.label} placeholder={placeholder} />
                </div>
            </div>
        )
    }
    else if(props.label=="Email"){
        return(
            <div>
                <p>{props.label}</p>
                <div>
                    <input type="email" name={props.label} placeholder={placeholder} />
                </div>
            </div>
        )

    }
    else{
        return(
            <div>
                <p>{props.label}</p>
                <div>
                    <input type="password" name={props.label} placeholder={placeholder} />
                </div>
            </div>
        )

    }
}
 
export default Signup;