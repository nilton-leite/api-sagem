import { NextFunction, Request, Response } from 'express'
import { UNAUTHORIZED } from 'http-status'
import jsonwebtoken from 'jsonwebtoken'

export interface IAuthenticatedUserInterface {
  userId: string
}

function AuthenticationMiddleware(nodeEnv: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const {
      path,
      headers: { authorization },
      method,
    } = req

    if (
      (path.includes('/login') ||
        path.includes('/users') ||
        path.includes('/user/validate')) &&
      method === 'POST'
    ) {
      return next()
    }

    if (!authorization) {
      res.status(UNAUTHORIZED).json({ message: 'Missing authorization header' })
      return
    }

    const id = getUserIdFromToken(authorization)
    if (id === null) {
      res.status(UNAUTHORIZED).json({ message: 'Token inválido' })
      return
    }

    req.params.id = id
    req.body.id = id
    next()
  }
}

function getUserIdFromToken(token: string): string | null {
  try {
    var decoded: any = jsonwebtoken.verify(token, `${process.env.SECRET}`)

    return decoded.id
  } catch (_) {
    return null
  }
}

export default AuthenticationMiddleware
