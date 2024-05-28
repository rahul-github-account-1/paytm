function SubmitButton(props){
    return (
        <div>
            <button onClick={props.onClick}>{props.value}</button>
        </div>
    )
}

export default SubmitButton