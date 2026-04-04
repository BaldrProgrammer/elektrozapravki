import Image from 'next/image'
import {useRouter} from "next/navigation";
import Link from 'next/link'

export default function Logo(){
    const navigate = useRouter()

    return(
        <Link href={'/'}>
            <Image
                src="/logo/Vector.png"
                alt="Logo"
                width={20}
                height={20}
                priority
                quality={100}
                sizes="(max-width: 768px) 40px, 40px"
            />
        </Link>
    )
}