import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import { ISchedulesService } from '@src/services/schedules'
import { IEmployeesService } from '@src/services/employees'
import { IServicesService } from '@src/services/services'
import { IFindById } from '@src/utils/types/models/employees'
import { Types } from 'mongoose'
import moment from 'moment'

export class SchedulesController {
  private logger: Logger
  private schedulesService: ISchedulesService
  private employeesService: IEmployeesService
  private servicesService: IServicesService

  constructor({
    logger,
    schedulesService,
    employeesService,
    servicesService,
  }: Container) {
    this.logger = logger
    this.schedulesService = schedulesService
    this.employeesService = employeesService
    this.servicesService = servicesService
  }

  public async find(req: Request, res: Response) {
    const { start_date, end_date, serviceId, employeeId } = req.query

    const intervalDate: any[] = []
    const intervalHours: any[] = []
    const intervalFinal: any[] = []
    if (employeeId && serviceId && start_date && end_date) {
      let init_date: any = start_date
      let end_dates: any = end_date

      let startDate = moment(init_date).format('DD/MM/YYYY')
      let endDate = moment(end_dates).format('DD/MM/YYYY')

      this.intervalDate(startDate, endDate, intervalDate)

      const employee = await this.employeesService.findById({
        data: {
          _id: Types.ObjectId(employeeId.toString()),
        },
      })

      const service = await this.servicesService.findById({
        data: {
          _id: Types.ObjectId(serviceId.toString()),
          active: true,
        },
      })

      console.log('employe', employee)
      console.log('service', service)

      if (employee && service) {
        this.intervalTime(employee, intervalHours, service)

        const getInterval = intervalDate.map(async (index: any) => {
          intervalFinal.push({ date: index, times: intervalHours })
          return intervalFinal
        })

        await Promise.all(getInterval)

        return res.status(status.OK).send(intervalFinal)
      } else {
        return res
          .status(409)
          .send('Ops.. Não encontramos nenhum serviço disponível')
      }
    } else {
      return res.status(400).send('Ops.. Parâmetros faltantes.')
    }
  }

  private intervalTime(employee: any, hours: any[], service: any) {
    let startTimeMorning = employee.start_morning_time.split(':')
    let endTimeMorning = employee.end_morning_time.split(':')

    let startTimeAfternoon = employee.start_afternoon_time.split(':')
    let endTimeAfternoon = employee.end_afternoon_time.split(':')
    const locale = 'pt'

    moment.locale(locale)

    for (let hour = startTimeMorning[0]; hour < endTimeMorning[0]; hour++) {
      hours.push(moment({ hour }).format('HH:mm'))
      hours.push(
        moment({
          hour,
          minute: service.execution_time_default,
        }).format('HH:mm')
      )
    }

    for (let hour = startTimeAfternoon[0]; hour < endTimeAfternoon[0]; hour++) {
      hours.push(moment({ hour }).format('HH:mm'))
      hours.push(
        moment({
          hour,
          minute: service.execution_time_default,
        }).format('HH:mm')
      )
    }
  }

  private intervalDate(start_date: any, end_date: any, intervalos: any[]) {
    let startDate = this.toDate(start_date)
    let endDate = this.toDate(end_date)

    intervalos.push(this.toString(startDate))

    while (startDate < endDate) {
      startDate.setDate(startDate.getDate() + 1)
      intervalos.push(this.toString(startDate))
    }
  }

  private toDate(texto: any) {
    let partes = texto.split('/')
    return new Date(partes[2], partes[1] - 1, partes[0])
  }

  private toString(date: any) {
    return (
      ('0' + date.getDate()).slice(-2) +
      '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      date.getFullYear()
    )
  }
}
