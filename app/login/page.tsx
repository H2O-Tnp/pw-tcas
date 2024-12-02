import { demos } from '#/lib/demos';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="space-y-1">
      <h1 className="text-center text-xl font-medium text-gray-300">
        เก็บข้อมูล TCAS
      </h1>
      <h2 className="text-l text-center font-medium text-gray-300">
        ประจวบวิทยาลัย
      </h2>

      <div className="space-y-10 text-white">
        {
          <Link
            href={'dd'}
            key={'Sign in with Google'}
            className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
          >
            <div className="font-medium text-gray-200 group-hover:text-gray-50">
              {'Sign in with Google'}
            </div>
          </Link>
        }
      </div>
    </div>
  );
}
