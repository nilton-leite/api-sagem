import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import { ISchedulesService } from '@src/services/schedules'
import { IEmployeesService } from '@src/services/employees'
import { IServicesService } from '@src/services/services'
import { Types } from 'mongoose'
import moment from 'moment'
import { parse } from 'date-fns'
import { ICreate, IGet } from '@src/utils/types/models/schedules'

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

  async get(req: Request, res: Response) {
    const { userId } = req.query

    try {
      const retorno = await this.schedulesService.get(
        Types.ObjectId('6116bf9e1c964e29788db56a'.toString())
      )
      return res.status(status.OK).send(retorno)
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }

  async save(req: Request, res: Response) {
    const { employeeId, serviceId, userId, dataSchedule, time } = req.body

    const parameters: ICreate = {
      employeeId,
      serviceId,
      userId,
      dataSchedule,
      time,
    }

    try {
      const retorno = await this.schedulesService.create({ data: parameters })
      return res.status(status.OK).send(retorno)
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
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
      console.log(employee)
      if (employee === null) {
        return res.status(400).send('Não encontramos nenhum funcionário!')
      }

      const employeeService = employee.services.filter(function (item: any) {
        return item.serviceId.toString() === serviceId.toString()
      })

      const service = await this.servicesService.findById({
        data: {
          _id: Types.ObjectId(serviceId.toString()),
          active: true,
        },
      })

      if (employee && service) {
        this.intervalTime(employee, employeeService[0], intervalHours, service)

        const getInterval = intervalDate.map(async (index: any) => {
          intervalFinal.push({ date: index, times: intervalHours })
          return intervalFinal
        })

        await Promise.all(getInterval)

        let teste: any = intervalFinal

        let hours: any = []
        const getHour = intervalFinal.map(
          async (itemInterval: any, indexDate: number) => {
            let schedule = await this.schedulesService.getByDate({
              data: {
                userId: Types.ObjectId('6116bf9e1c964e29788db56a'.toString()),
                employeeId: Types.ObjectId(employeeId.toString()),
                serviceId: Types.ObjectId(serviceId.toString()),
                dataSchedule: itemInterval.date,
              },
            })
            console.log('indice', indexDate)
            if (schedule.length > 0) {
              const PromisseHour = intervalFinal[indexDate].times.map(
                async (itemTime: any, indexTime: number) => {
                  for (var key in schedule) {
                    if (schedule[key].time === itemTime) {
                      let filtered = intervalFinal[indexDate].times.filter(
                        (item: number[]) => !item.includes(itemTime)
                      )
                      intervalFinal[indexDate].times = filtered // Coloca os dados novos no filtro
                    }
                  }
                }
              )

              await Promise.all(PromisseHour)
            }
            return intervalFinal
          }
        )

        await Promise.all(getHour)

        return res.status(status.OK).send([
          {
            intervalFinal,
            fullName: employee.full_name,
            telephone: employee.telephone,
            price: employeeService[0].price,
            execution_time: employeeService[0].execution_time,
            icon: service.icon,
            service: service.title,
          },
        ])
      } else {
        return res
          .status(409)
          .send('Ops.. Não encontramos nenhum serviço disponível')
      }
    } else {
      return res.status(400).send('Ops.. Parâmetros faltantes.')
    }
  }

  private async intervalTime(
    employee: any,
    employeeService: any,
    hours: any[],
    service: any
  ) {
    let startTimeMorning = employee.start_morning_time.split(':')
    let endTimeMorning = employee.end_morning_time.split(':')

    let startTimeAfternoon = employee.start_afternoon_time.split(':')
    let endTimeAfternoon = employee.end_afternoon_time.split(':')
    const locale = 'pt'
    moment.locale(locale)

    for (let hour = startTimeMorning[0]; hour < endTimeMorning[0]; hour++) {
      let minuteMorning: number = 0
      hours.push(moment({ hour }).format('HH:mm'))
      for (let minute = 0; minute < 60; minute++) {
        minuteMorning += employeeService.execution_time
          ? employeeService.execution_time
          : service.execution_time_default
        if (minuteMorning >= 60) break
        hours.push(
          moment({
            hour,
            minute: minuteMorning,
          }).format('HH:mm')
        )
      }
    }

    for (let hour = startTimeAfternoon[0]; hour < endTimeAfternoon[0]; hour++) {
      let minuteAfternoon: number = 0
      hours.push(moment({ hour }).format('HH:mm'))
      for (let minute = 0; minute < 60; minute++) {
        minuteAfternoon += employeeService.execution_time
          ? employeeService.execution_time
          : service.execution_time_default
        if (minuteAfternoon >= 60) break
        hours.push(
          moment({
            hour,
            minute: minuteAfternoon,
          }).format('HH:mm')
        )
      }
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
