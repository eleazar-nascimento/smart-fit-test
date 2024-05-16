import Image from 'next/image'

export function Footer() {
  return (
    <div className="bg-dark-grey w-full flex flex-col items-center justify-center gap-5 pt-12 pb-20">
      <Image
        src="/images/logo.svg"
        width={100}
        height={100}
        alt="logo do cabeçalho"
      />
      <span className="text-white">Todos os direitos reservados - 2024</span>
    </div>
  )
}
