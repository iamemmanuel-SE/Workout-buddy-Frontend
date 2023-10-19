import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

//date fns

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

//components
import Modal from './Modal'


const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const {user} = useAuthContext()
    

const handleClick = async () => {

    if(!user){
        return
    }
    const response = await fetch('/api/workouts/' + workout._id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`

        }
    })
    const json = await response.json()

    if ( response.ok){
        dispatch({type:'DELETE_WORKOUT', payload: json})
    }

}

    return (  
        <div className="workout-details">
            <h4>{ workout.title }</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <div className='updateTime'>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })} <Modal title={workout.title} load={workout.load} reps={workout.reps} id={workout._id}/></div>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
           
            


        </div>
      );
}
 
export default WorkoutDetails; 
