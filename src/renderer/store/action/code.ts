export type CodeAction = {
  type: string
  payload?: any,
}

export const changeTitleChoosed = (id: string): CodeAction => {
  return {
    type: 'changeTitleChoosed',
    payload: {
      id
    }
  }
}

export const ischangeTitle= (id: string, ischange: boolean = true, title?: string): CodeAction => {
  return {
    type: 'ischangeTitle',
    payload: {
      id,
      ischange,
      title
    }
  }
}

export const addCode= (): CodeAction => {
  return {
    type: 'addCode',
    payload: {
      
    }
  }
}

export const deleteCode= (id: string): CodeAction => {
  return {
    type: 'deleteCode',
    payload: {
      id
    }
  }
}

export const changeCode= (id: string, code: string): CodeAction => {
  return {
    type: 'changeCode',
    payload: {
      id,
      code
    }
  }
}


export const setCode= (code: any): CodeAction => {
  return {
    type: 'setCode',
    payload: {
      code
    }
  }
}

