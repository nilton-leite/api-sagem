export interface ICreate {
  full_name: string
  telephone: string
  email: string
  token_firebase?: string
  token_facebook?: string
  token_google?: string
}

export interface IFindOne {
  email: string
}
