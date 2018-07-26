import React from 'react'

// import { formattedDate } from '../helpers'


class InputForm extends React.Component{
    // state = this.props.metric || {
    //     sleep:'',
    //     stress:'',
    //     energy: '',
    //     mood: '',
    //     diet: '',
    //     createdAt: formattedDate(new Date(), 'YYYY-MM-DD')
    // }

    render() {
        let { sleep, stress, energy, mood, diet, createdAt } = this.props.metric
        let { onInputChange } = this.props
        
    return(
        <div>
        
    
    <form onSubmit={this.handleSubmit}>
        <label >
            Sleep: {sleep}
            <br/>
            <input onChange={onInputChange} type="range" min='1' max='10' name="sleep" value={sleep}/>
        </label>
        <br/>
        <br/>
        <label >
            Stress:{stress}
            <br/>
            <input onChange={onInputChange} type="range" min='1' max='10' name="stress" value={stress}/>
        </label>
        <br/>
        <br/>
        <label >
            Energy:{energy}
            <br/>
            <input onChange={onInputChange} type="range" min='1' max='10' name="energy" value={energy}/>
        </label>
        <br/>
        <br/>
        <label >
            Mood:{mood}
            <br/>
            <input onChange={onInputChange} type="range" min='1' max='10' name="mood" value={mood}/>
        </label>
        <br/>
        <br/>
        <label >
            Diet:{diet}
            <br/>
            <input onChange={onInputChange} type="range" min='1' max='10' name="diet" value={diet}/>
        </label>
        <br/>
        <br/>
        <label >
            Date:
            <br/>
            <input onChange={onInputChange} type="date" name="createdAt" value={createdAt} />
        </label>
        <br/>
        <br/>
      <button>Submit</button>
    </form>

    </div>
        )
    }
}

export default InputForm