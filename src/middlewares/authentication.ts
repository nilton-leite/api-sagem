import { NextFunction, Request, Response } from 'express'
import { UNAUTHORIZED } from 'http-status'

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
    // if (nodeEnv === 'dev' && method === 'OPTIONS') {
    // return next()
    // }

    if (path.includes('/healthcheck') || path.includes('/api-docs')) {
      return next()
    }

    if (!authorization) {
      console.log('Entrei aqui')
      res.status(UNAUTHORIZED).json({ message: 'Missing authorization header' })
      return
    }

    const userId = getUserIdFromToken(authorization)
    if (userId === null) {
      res.status(UNAUTHORIZED).json({ message: 'Token inválido' })
      return
    }

    req.params.userId = userId
    req.body.userId = userId
    next()
  }
}

function getUserIdFromToken(token: string): string | null {
  const buff = Buffer.from(token.split('.')[1], 'base64')
  try {
    return JSON.parse(buff.toString()).sub
  } catch (_) {
    return null
  }
}

export default AuthenticationMiddleware
