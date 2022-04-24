export type CodeAction = {
  type: string
  payload?: any,
}

export const setCode= (code: any): CodeAction => {
  return {
    type: 'setCode',
    payload: {
      code
    }
  }
}

