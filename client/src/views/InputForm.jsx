import React from 'react'

import { formattedDate } from '../helpers'


class InputForm extends React.Component{
    state = {
        sleep:'',
        stress:'',
        energy: '',
        mood: '',
        diet: '',
        createdAt: formattedDate(new Date(), 'YYYY-MM-DD')
    }

    render() {
        let { metric, sleep, stress, energy, mood, diet, createdAt } = this.state
        if(!metric) return <h1>Loading...</h1>
    return(
        <div>
        
    
    <form onSubmit={this.handleSubmit}>
        <label >
            Sleep: {sleep}
            <input onChange={this.handleChange} type="range" min='1' max='10' name="sleep"/>
        </label>
        <label >
            Stress: {stress}
            <input onChange={this.handleChange} type="range" min='1' max='10' name="stress"/>
        </label>
        <label >
            Energy: {energy}
            <input onChange={this.handleChange} type="range" min='1' max='10' name="energy"/>
        </label>
        <label >
            Mood: {mood}
            <input onChange={this.handleChange} type="range" min='1' max='10' name="mood"/>
        </label>
        <label >
            Diet: {diet}
            <input onChange={this.handleChange} type="range" min='1' max='10' name="diet"/>
        </label>
        <label >
            Date: <input onChange={this.handleChange} type="date" name="createdAt" value={createdAt} />
        </label>
      <button>Record</button>
    </form>

    </div>
        )
    }
}

export default InputForm