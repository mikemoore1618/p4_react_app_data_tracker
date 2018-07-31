import React from 'react'
import { Button } from 'semantic-ui-react'


class InputForm extends React.Component {

    handleFormSubmit(evt) {
        evt.preventDefault()
        const { handleSubmit } = this.props
        const { id } = evt.target.dataset
        handleSubmit(id)
    }

    render() {
        let { sleep, stress, energy, mood, diet, meditation, exercise, createdAt, _id } = this.props.metric
        // console.log(this.props.metric)
        let { handleChange } = this.props;
        return (
            <div className='center'>
                <form data-id={_id} onSubmit={this.handleFormSubmit.bind(this)}>
                    <label >
                        Sleep: {sleep}
                        <br />
                        <input type="range" min='1' max='10' name="sleep" step="0.1" data-id={_id} onChange={handleChange} value={sleep} />
                    </label>
                    <br />
                    <br />

                    <label >
                        Stress: {stress}
                        <br />
                        <input type="range" min='1' max='10' name="stress" step="0.1" data-id={_id} onChange={handleChange} value={stress} />
                    </label>
                    <br />
                    <br />

                    <label >
                        Mood: {mood}
                        <br />
                        <input type="range" min='1' max='10' name="mood" step="0.1" data-id={_id} onChange={handleChange} value={mood} />
                    </label>
                    <br />
                    <br />

                    <label >
                        Meditation: {meditation}
                        <br />
                        <input type="range" min='1' max='10' name="meditation" step="0.1" data-id={_id} onChange={handleChange} value={meditation} />
                    </label>
                    <br />
                    <br />

                    <label >
                        Energy: {energy}
                        <br />
                        <input type="range" min='1' max='10' name="energy" step="0.1" data-id={_id} onChange={handleChange} value={energy} />
                    </label>
                    <br />
                    <br />

                    <label >
                        Diet: {diet}
                        <br />
                        <input type="range" min='1' max='10' name="diet" step="0.1" data-id={_id} onChange={handleChange} value={diet} />
                    </label>
                    <br />
                    <br />

                    <label >
                        Exercise: {exercise}
                        <br />
                        <input type="range" min='1' max='10' name="exercise" step="0.1" data-id={_id} onChange={handleChange} value={exercise} />
                    </label>
                    <br />
                    <br />

                    <label >
                        Date:
                        <br />
                        <input type="date" name="createdAt" data-id={_id} onChange={handleChange} value={createdAt} />
                    </label>
                    <br />
                    <br />
                    <Button type="submit" value="Submit">Submit</Button>
                </form>
            </div>
        )
    }
}

export default InputForm