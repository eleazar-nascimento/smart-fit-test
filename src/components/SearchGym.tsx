import {
  Card,
  CardHeader,
  CardBody,
  CheckboxGroup,
  Checkbox,
  CardFooter,
  Button,
  Radio,
  RadioGroup,
} from '@nextui-org/react'
import Image from 'next/image'

export function SearchGym() {
  return (
    <div className="w-full bg-white h-full flex items-center justify-center pb-12">
      <Card className="bg-white w-[900px] h-full rounded-md border-4 border-gray-200">
        <CardHeader className="flex gap-3 items-center">
          <Image
            src="/images/icon-hour.png"
            alt="icone de hora"
            width={25}
            height={25}
          />
          <p className="text-tiny text-gray-500 font-light text-sm">Horário</p>
        </CardHeader>
        <CardBody>
          <h2 className="text-gray-500 font-light text-2xl pl-4 pb-2">
            Qual período quer treinar?
          </h2>

          <CheckboxGroup defaultValue={['morning']}>
            <div className="flex items-center justify-between border-y-2  border-gray-200">
              <Checkbox
                radius="full"
                className="text-gray-500 w-full pt-5 pb-5"
                value="morning"
              >
                Manhã
              </Checkbox>
              <span className="text-gray-500">6:00 às 12:00</span>
            </div>
            <div className="flex items-center justify-between border-y-2  border-gray-200">
              <Checkbox
                radius="full"
                className="text-gray-500 w-full pt-5 pb-5"
                value="afternoon"
              >
                Tarde
              </Checkbox>
              <span className="text-gray-500">12:01 às 18:00</span>
            </div>
            <div className="flex items-center justify-between border-y-2  border-gray-200">
              <Checkbox
                radius="full"
                className="text-gray-500 w-full pt-5 pb-5"
                value="night"
              >
                Noite
              </Checkbox>
              <span className="text-gray-500">18:01 às 23:00</span>
            </div>
          </CheckboxGroup>

          <div className="w-full flex justify-between items-center pt-8">
            <Checkbox
              size="md"
              className="text-dark-grey"
              value="showCompanies"
            >
              Exibir unidades fechadas
            </Checkbox>

            <span className="text-dark-grey">
              Resultados encontrados:{' '}
              <span className="text-dark-grey font-bold">0</span>
            </span>
          </div>
        </CardBody>
        <RadioGroup>
          <Radio value="1">radio</Radio>
        </RadioGroup>
        <CardFooter className="flex items-center justify-center gap-8 w-full">
          <Button
            className="bg-yellow text-dark-grey font-bold rounded-md h-12"
            fullWidth
          >
            ENCONTRAR UNIDADE
          </Button>
          <Button
            className="bg-white text-dark-grey font-bold border-2 border-gray-200 rounded-md h-12"
            fullWidth
          >
            LIMPAR
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
