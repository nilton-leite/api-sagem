import Container from '@src/configs/ioc'

export interface IHealthCheckRepository {
  checkDB(): Promise<any>
  checkDW(): Promise<any>
}

export const HealthCheckRepository = ({}: Container): IHealthCheckRepository => {
  return {
    checkDB: async () => {
      console.log('usar')
    },
    checkDW: async () => {
      console.log('usar')
    },
  }
}
