import Image from 'next/image';

export function ProfileLogo({ session }) {
  const img = session.user.image; // string
  // console.log(typeof imm);
  return (
    <Image
      src={img}
      width={180}
      height={180}
      alt={session.user.name}
      style={{ borderRadius: '50%' }}
    />
  );
}
