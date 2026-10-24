import { LocationProps } from '@/api/get-locations'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import Image from 'next/image'

interface ListUnitsProps {
  location: LocationProps
}

const MASK_ICONS: Record<string, { src: string; alt: string }> = {
  required: {
    src: '/images/required-mask.png',
    alt: 'Máscara obrigatória',
  },
  recommended: {
    src: '/images/recommended-mask.png',
    alt: 'Máscara recomendada',
  },
}

const TOWEL_ICONS: Record<string, { src: string; alt: string }> = {
  required: {
    src: '/images/required-towel.png',
    alt: 'Toalha obrigatória',
  },
  recommended: {
    src: '/images/recommended-towel.png',
    alt: 'Toalha recomendada',
  },
}

const FOUNTAIN_ICONS: Record<string, { src: string; alt: string }> = {
  partial: {
    src: '/images/partial-fountain.png',
    alt: 'Bebedouro parcial',
  },
  not_allowed: {
    src: '/images/forbidden-fountain.png',
    alt: 'Bebedouro proibido',
  },
}

const LOCKER_ROOM_ICONS: Record<string, { src: string; alt: string }> = {
  allowed: {
    src: '/images/required-lockerroom.png',
    alt: 'Vestiário liberado',
  },
  partial: {
    src: '/images/partial-lockerroom.png',
    alt: 'Vestiário parcial',
  },
  closed: {
    src: '/images/forbidden-lockerroom.png',
    alt: 'Vestiário fechado',
  },
}

function getUnitIcons(location: LocationProps) {
  return [
    location.mask ? MASK_ICONS[location.mask] : undefined,
    location.towel ? TOWEL_ICONS[location.towel] : undefined,
    location.fountain ? FOUNTAIN_ICONS[location.fountain] : undefined,
    location.locker_room
      ? LOCKER_ROOM_ICONS[location.locker_room]
      : undefined,
  ].filter((icon): icon is { src: string; alt: string } => Boolean(icon))
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
  const icons = getUnitIcons(location)

  // Unidades que ainda vão abrir não têm `content`, apenas os campos de endereço.
  const address = [location.street, location.region, location.city_name]
    .filter(Boolean)
    .join(' - ')

  return (
    <Card className="bg-zinc-50 border border-zinc-200 shadow-md rounded-lg h-[460px] w-72 p-2">
      <CardHeader>
        <div className="flex flex-col gap-3 w-full">
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
      <CardBody className="flex flex-col gap-4">
        {icons.length > 0 && (
          <div className="flex items-center gap-2">
            {icons.map((icon) => (
              <Image
                key={icon.src}
                src={icon.src}
                alt={icon.alt}
                width={52}
                height={52}
              />
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
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
