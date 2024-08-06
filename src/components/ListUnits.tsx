import { LocationProps } from '@/api/get-locations'
import { Card, CardBody, CardHeader } from '@nextui-org/react'

interface ListUnitsProps {
  location: LocationProps
}

export function ListUnits({ location }: ListUnitsProps) {
  const schedule = location?.schedules?.map((schedule) => (
    <div className="flex flex-col gap-1" key={schedule.weekdays}>
      <h3 className="font-bold text-xl">{schedule.weekdays}</h3>
      <p className="font-normal text-sm">{schedule.hour}</p>
    </div>
  ))
  return (
    <Card className="bg-zinc-50 border border-zinc-200 shadow-md rounded-lg h-[460px] w-72 p-2">
      <CardHeader>
        <div className="flex flex-col gap-3">
          <span
            className={`font-semibold text-sm ${location.opened === true ? 'text-green' : 'text-red'}`}
          >
            {location.opened === true ? 'Aberto' : 'Fechado'}
          </span>
          <h1 className="font-bold text-xl text-dark-grey">{location.title}</h1>
          <span
            dangerouslySetInnerHTML={{ __html: location.content }}
            className="text-sm text-gray-500 border-b-2 border-b-gray-200 pb-3"
          />
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2">{schedule}</div>
      </CardBody>
    </Card>
  )
}
