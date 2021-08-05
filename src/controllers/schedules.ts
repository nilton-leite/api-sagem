import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import { ISchedulesService } from '@src/services/schedules'
import { ICreate } from '@src/utils/types/models/schedules'

export class SchedulesController {
  private logger: Logger
  private schedulesService: ISchedulesService

  constructor({ logger, schedulesService }: Container) {
    this.logger = logger
    this.schedulesService = schedulesService
  }

  public async find(req: Request, res: Response) {
    const { employeeId, userId, serviceId, dataSchedule, time } = req.body

    let parameters: ICreate = {
      employeeId: employeeId,
      userId: userId,
      serviceId: serviceId,
      dataSchedule: dataSchedule,
      time: time,
    }

    const retorno = await this.schedulesService.create({ data: parameters })
    return res.status(status.OK).send(retorno)
  }
}
