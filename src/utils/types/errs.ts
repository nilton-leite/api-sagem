export interface Err {
  code: string
  message: string
  parameter?: string
  data?: any[]
}

export const mkMissing = (parameter: string, data?: any[]): Err => ({
  code: 'missing',
  message: `Parameter ${parameter} is required`,
  parameter,
  data,
})

export const mkInvalid = (
  parameter: string,
  message?: string,
  data?: any[]
): Err => ({
  code: 'invalid',
  message: message ? message : `Parameter ${parameter} is invalid`,
  parameter,
  data,
})

export const mkErr = (
  code: string,
  message: string,
  data?: any[],
  parameter?: string
): Err => ({ code, message, data, parameter })

export const hasErr = (errs: Err[], code: string) =>
  !!errs.find((e) => e.code === code)

export const hasErrs = (errs: Err[]) => !!errs.length

export const isMissing = (errs: Err[], parameter: string) =>
  !!errs.find((e) => e.code === 'missing' && e.parameter === parameter)

export const isInvalid = (errs: Err[], parameter: string) =>
  !!errs.find((e) => e.code === 'invalid' && e.parameter === parameter)

export const noErrs = (errs: Err[]) => !errs.length

export const retOk = <T>(val: T): [Err[], T] => [[], val]

export type ErrT<T> = {
  code: string
  message: string
  parameter?: string
  data?: T
}

export const mkMissingT = <T>(parameter: string, data: T): ErrT<T> => {
  return {
    code: 'missing',
    parameter,
    message: `Parâmetro ${parameter} é obrigatório`,
    data,
  }
}

export const mkInvalidT = <T>(parameter: string, data: T): ErrT<T> => {
  return {
    code: 'invalid',
    parameter,
    message: `Parâmetro ${parameter} é inválido`,
    data,
  }
}

export const mkErrT = <T>(code: string, message: string, data?: T): ErrT<T> => {
  return { code, message, data }
}
