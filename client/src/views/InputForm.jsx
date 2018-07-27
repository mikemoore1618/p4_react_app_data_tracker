import React from 'react'


class InputForm extends React.Component{
    render() {
        let { sleep, stress, energy, mood, diet, createdAt } = this.props.metric
        let { handleSubmit, handleChange } = this.props;
    return(
        <div className='center'>
        
    
    <form onSubmit={handleSubmit}>
        <label >
            Sleep: {sleep}
            <br/>
            <input onChange={handleChange} type="range" min='1' max='100' name="sleep" value={sleep}/>
        </label>
        <br/>
        <br/>
        <label >
            Stress:{stress}
            <br/>
            <input onChange={handleChange} type="range" min='1' max='100' name="stress" value={stress}/>
        </label>
        <br/>
        <br/>
        <label >
            Energy:{energy}
            <br/>
            <input onChange={handleChange} type="range" min='1' max='100' name="energy" value={energy}/>
        </label>
        <br/>
        <br/>
        <label >
            Mood:{mood}
            <br/>
            <input onChange={handleChange} type="range" min='1' max='100' name="mood" value={mood}/>
        </label>
        <br/>
        <br/>
        <label >
            Diet:{diet}
            <br/>
            <input onChange={handleChange} type="range" min='1' max='100' name="diet" value={diet}/>
        </label>
        <br/>
        <br/>
        <label >
            Date:
            <br/>
            <input onChange={handleChange} type="date" name="createdAt" value={createdAt} />
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