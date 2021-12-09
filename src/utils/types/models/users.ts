export interface ICreate {
  full_name: string
  telephone: string
  email: string
  token_firebase_messaging?: string
  token_firebase?: string
  token_facebook?: string
  token_google?: string
}

export interface IUpdate {
  full_name: string
  telephone: string
}
export interface IFindOne {
  email: string
}
export interface IFindOneLogin {
  email: string
  token_firebase: string
}
