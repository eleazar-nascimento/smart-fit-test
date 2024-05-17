import Image from 'next/image'

export function Guidelines() {
  return (
    <div className="w-full bg-white  pb-12 flex justify-center items-center">
      <div className="flex lg:flex-row min-[320px]:flex-col items-center justify-center gap-10 bg-gray-100 lg:w-[900px] min-[320px]:w-[340px] px-4 py-6">
        <div className="flex flex-col items-center gap-4">
          <div className="text-base font-bold text-dark-grey">Máscara</div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="/images/required-mask.png"
                alt="máscara obrigatório"
                width={52}
                height={52}
              />
              <span>Obrigatório</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="/images/recommended-mask.png"
                alt="máscara Recomendado"
                width={52}
                height={52}
              />
              <span>Recomendado</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="text-base font-bold text-dark-grey">Máscara</div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="/images/required-towel.png"
                alt="máscara obrigatório"
                width={52}
                height={52}
              />
              <span>Obrigatório</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="/images/recommended-towel.png"
                alt="máscara Recomendado"
                width={52}
                height={52}
              />
              <span>Recomendado</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="text-base font-bold text-dark-grey">Bebedouro</div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="/images/partial-fountain.png"
                alt="máscara obrigatório"
                width={52}
                height={52}
              />
              <span>Parcial</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="/images/forbidden-fountain.png"
                alt="máscara Recomendado"
                width={52}
                height={52}
              />
              <span>Proibido</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="text-base font-bold text-dark-grey">Vestiários</div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="/images/required-lockerroom.png"
                alt="máscara obrigatório"
                width={52}
                height={52}
              />
              <span>Liberado</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="/images/partial-lockerroom.png"
                alt="máscara Recomendado"
                width={52}
                height={52}
              />
              <span>Parcial</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="/images/forbidden-lockerroom.png"
                alt="máscara Recomendado"
                width={52}
                height={52}
              />
              <span>Fechado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
