import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"



const Modal = (props) => {

const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState(props.title);
    const [load, setLoad] = useState(props.load);
    const [reps, setReps] = useState(props.reps);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])



const [modal, setModal] = useState(false)

//default input values for update forms


const toggleModal = () => {
    setModal(!modal)
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const workout = {title, load, reps}

    //Patch request
    const response = await fetch(`/api/workouts/${props.id}`, {
        method: 'PATCH',
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()

    if(!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if(response.ok){
        // setTitle('')
        // setLoad('')
        // setReps('')
        setError(null)
        setEmptyFields([])
        // console.log('workout updated', json)
        dispatch({type: 'UPDATE_WORKOUT', payload: json})
        setModal(!modal)
    }

}
    return ( 
        <>
        <button className="btn-modal edit" onClick={toggleModal}>edit</button>
    
        {modal && (<div className="Modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="Update_Modal">
                
                 
                 <form className="update">
                 <h3>Update Workout</h3>

                 <label>Exercize Title:</label>
                 <input type="text" 
                 onChange={(e) => setTitle(e.target.value)}
                 value={title}
                 className={emptyFields.includes('title') ? 'error' : ''}
                 />
                 
                 <label>Load (in kg):</label>
                 <input type="number" 
                 onChange={(e) => setLoad(e.target.value)}
                 value={load}
                 className={emptyFields.includes('load') ? 'error' : ''}

                 />
                 
                 <label>Reps:</label>
                 <input type="Number" 
                 onChange={(e) => setReps(e.target.value)}
                 value={reps}
                 className={emptyFields.includes('reps') ? 'error' : ''}

                 />
                <div className="buttons">
                <button onClick={handleSubmit}>update</button>
                 <button onClick={toggleModal} className="cancle">cancle</button>
                </div>
               
                 {error && <div className="error">{error}</div>}
             </form>
       
            </div>
        
           
        </div>
        ) }

        
        </>
     );
}
 
export default Modal;