export type SettingAction = {
  type: string
  payload?: any,
}

export const changeEditor = (option: any): SettingAction => {
  return {
    type: 'changeEditor',
    payload: {
      option
    }
  }
}

export const changeCurrent = (option: any): SettingAction => {
  return {
    type: 'changeSetting',
    payload: {
      option
    }
  }
}

export const setSetting= (option: any): SettingAction => {
  return {
    type: 'setSetting',
    payload: {
      option
    }
  }
}
