import React from 'react'


class InputForm extends React.Component {

    handleFormSubmit(evt) {
        evt.preventDefault()
        const { handleSubmit } = this.props
        const { id } = evt.target.dataset
        handleSubmit(id)
    }

    render() {
        let { sleep, stress, energy, mood, diet, createdAt, _id } = this.props.metric
        console.log(this.props.metric)
        let { handleSubmit, handleChange } = this.props;
        return (
            <div className='center'>


                <form data-id={_id} onSubmit={this.handleFormSubmit.bind(this)}>
                    <label >
                        Sleep: {sleep}
                        <br />
                        <input type="range" min='1' max='100' name="sleep" data-id={_id} onChange={handleChange} value={sleep} />
                    </label>
                    <br />
                    <br />
                    <label >
                        Stress:{stress}
                        <br />
                        <input type="range" min='1' max='100' name="stress" data-id={_id} onChange={handleChange} value={stress} />
                    </label>
                    <br />
                    <br />
                    <label >
                        Energy:{energy}
                        <br />
                        <input type="range" min='1' max='100' name="energy" data-id={_id} onChange={handleChange} value={energy} />
                    </label>
                    <br />
                    <br />
                    <label >
                        Mood:{mood}
                        <br />
                        <input type="range" min='1' max='100' name="mood" data-id={_id} onChange={handleChange} value={mood} />
                    </label>
                    <br />
                    <br />
                    <label >
                        Diet:{diet}
                        <br />
                        <input type="range" min='1' max='100' name="diet" data-id={_id} onChange={handleChange} value={diet} />
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
                    <input type="submit" value="Submit" />
                </form>

            </div>
        )
    }
}

export default InputForm