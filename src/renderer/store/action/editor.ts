export type EditorAction = {
  type: string
  payload?: any,
}

export const changeEditor = (option: any): EditorAction => {
  return {
    type: 'changeEditor',
    payload: {
      option
    }
  }
}
