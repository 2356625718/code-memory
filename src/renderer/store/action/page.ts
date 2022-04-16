export type PageAction = {
  type: string
  payload?: any,
}

export const changePage = (pathName: string): PageAction => {
  return {
    type: 'changePage',
    payload: {
      pathName
    }
  }
}
