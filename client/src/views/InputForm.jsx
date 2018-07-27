import React from 'react'


class InputForm extends React.Component{
    render() {
        let { sleep, stress, energy, mood, diet, createdAt, _id } = this.props.metric
        let { handleSubmit, handleChange } = this.props;
    return(
        <div className='center'>
        
    
    <form onSubmit={handleSubmit} onChange={handleChange}>
        <label >
            Sleep: {sleep}
            <br/>
            <input type="range" min='1' max='100' name="sleep" data-id={_id} value={sleep}/>
        </label>
        <br/>
        <br/>
        <label >
            Stress:{stress}
            <br/>
            <input type="range" min='1' max='100' name="stress" data-id={_id} value={stress}/>
        </label>
        <br/>
        <br/>
        <label >
            Energy:{energy}
            <br/>
            <input type="range" min='1' max='100' name="energy" data-id={_id} value={energy}/>
        </label>
        <br/>
        <br/>
        <label >
            Mood:{mood}
            <br/>
            <input type="range" min='1' max='100' name="mood" data-id={_id} value={mood}/>
        </label>
        <br/>
        <br/>
        <label >
            Diet:{diet}
            <br/>
            <input type="range" min='1' max='100' name="diet" data-id={_id} value={diet}/>
        </label>
        <br/>
        <br/>
        <label >
            Date:
            <br/>
            <input type="date" name="createdAt" data-id={_id} value={createdAt} />
        </label>
        <br/>
        <br/>
        <input type="submit" value="Submit" onClick={handleSubmit}/>
    </form>

    </div>
        )
    }
}

export default InputForm