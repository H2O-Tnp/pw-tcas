import { option } from '#/lib/option';
import Link from 'next/link';

export default async function Page() {
  return (
    <div className="space-y-8">
      {/* <h1 className="text-xl font-medium text-gray-300">สถานะ</h1> */}
      <div className="space-y-10 text-white">
        <div className="space-y-5">
          <h1 className="text-xl font-semibold text-gray-300">สถานะ</h1>
          <div className="">
            <Link
              href={`/student/score-form`}
              // key={item.name}
              className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800 text-center"
            >
              <div className="font-medium text-gray-200 group-hover:text-gray-50">
                {"ยังไม่บันทึก"}
              </div>

              <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
                {""}
              </div>
            </Link>
          </div>
        </div>
        <div className="space-y-5">

        <h1 className="text-xl font-semibold text-gray-300">บันทึกข้อมูล</h1>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-2">
          <Link
            href={`/student/form/score`}
            // key={item.name}
            className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
          >
            <div className="font-medium text-gray-200 group-hover:text-gray-50">
              {"คะแนนสอบ"}
            </div>

            <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
              {"TGAT TPAT A-Level"}
            </div>
          </Link>
          <Link
            href={`/student/form/university`}
            // key={item.name}
            className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
          >
            <div className="font-medium text-gray-200 group-hover:text-gray-50">
              {"มหาวิทยาลัย"}
            </div>

            <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
              {"รอบ 1-4"}
            </div>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
