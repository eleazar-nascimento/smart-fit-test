import Image from 'next/image'

export function Header() {
  return (
    <div className="flex items-center justify-center h-full py-8 bg-black w-full">
      <Image src="./images/logo.svg" alt="logo" width={200} height={200} />
    </div>
  )
}
