import { produce } from 'immer'
import { useState } from 'react'
const useImmer = (state: any) => {
  const [newState, setNewState] = useState(state)
  const setState = (fn: Function) => {
    setNewState(produce(newState, fn))
  }
  return [newState, setState]
}

export default useImmer;