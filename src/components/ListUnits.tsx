import { LocationProps } from '@/api/get-locations'
import { Card, CardBody, CardHeader } from '@nextui-org/react'

interface ListUnitsProps {
  location: LocationProps
}

function getStatus(opened: boolean | undefined) {
  if (opened === true) {
    return { label: 'Aberto', className: 'text-green' }
  }

  if (opened === false) {
    return { label: 'Fechado', className: 'text-red' }
  }

  return { label: 'Em breve', className: 'text-gray-500' }
}

export function ListUnits({ location }: ListUnitsProps) {
  const status = getStatus(location.opened)

  // Unidades que ainda vão abrir não têm `content`, apenas os campos de endereço.
  const address = [location.street, location.region, location.city_name]
    .filter(Boolean)
    .join(' - ')

  return (
    <Card className="bg-zinc-50 border border-zinc-200 shadow-md rounded-lg h-[460px] w-72 p-2">
      <CardHeader>
        <div className="flex flex-col gap-3">
          <span className={`font-semibold text-sm ${status.className}`}>
            {status.label}
          </span>
          <h1 className="font-bold text-xl text-dark-grey">{location.title}</h1>
          {location.content ? (
            <span
              dangerouslySetInnerHTML={{ __html: location.content }}
              className="text-sm text-gray-500 border-b-2 border-b-gray-200 pb-3"
            />
          ) : (
            <span className="text-sm text-gray-500 border-b-2 border-b-gray-200 pb-3">
              {address || 'Endereço não informado'}
            </span>
          )}
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2">
          {location.schedules?.length ? (
            location.schedules.map((schedule, index) => (
              <div
                className="flex flex-col gap-1"
                key={`${schedule.weekdays}-${schedule.hour}-${index}`}
              >
                <h3 className="font-bold text-xl">{schedule.weekdays}</h3>
                <p className="font-normal text-sm">{schedule.hour}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 col-span-2">
              Horários ainda não divulgados.
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
