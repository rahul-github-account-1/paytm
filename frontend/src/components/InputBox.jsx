function InputBox(props){
    let placeholder='';
    placeholder="Enter your ";
    placeholder+=props.label.toLowerCase();
    if(props.label=="First Name"||props.label=="Last Name"){
        return(
            <div>
                <p>{props.label}</p>
                <div>
                    <input type="text" onChange={props.onChange} name={props.label} placeholder={placeholder} />
                </div>
            </div>
        )
    }
    else if(props.label=="Email"){
        return(
            <div>
                <p>{props.label}</p>
                <div>
                    <input type="email" onChange={props.onChange} name={props.label} placeholder={placeholder} />
                </div>
            </div>
        )

    }
    else{
        return(
            <div>
                <p>{props.label}</p>
                <div>
                    <input type="password" onChange={props.onChange} name={props.label} placeholder={placeholder} />
                </div>
            </div>
        )

    }
}


export default InputBox;