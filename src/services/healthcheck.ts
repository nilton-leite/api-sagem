import Container from '@src/configs/ioc'

export interface IHealthCheckService {
  checkDB(): Promise<any>
}

export const HealthCheckService = ({
  healthCheckRepository,
}: Container): IHealthCheckService => {
  return {
    checkDB: async () => {
      return true
    },
  }
}
