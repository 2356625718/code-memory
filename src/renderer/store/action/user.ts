export type UserAction = {
  type: string
  payload?: any,
}

export const setUser = (user: any): UserAction => {
  return {
    type: 'setUser',
    payload: {
      user
    }
  }
}
