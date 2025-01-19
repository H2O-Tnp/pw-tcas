export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const option: { name: string; items: Item[] }[] = [
  {
    name: 'สถานะ',
    items: [
      
      {
        name: 'Nested Layouts',
        slug: 'layouts',
        description: 'Create UI',
      },
    ],
  },
  {
    name: 'บันทึกข้อมูล',
    items: [
      {
        name: 'ผลการสอบ',
        slug: 'layouts',
        description: 'TGAT TPAT A-Level',
      },
      {
        name: 'มหาวิทยาลัย',
        slug: 'layouts',
        description: 'รอบ 1-4',
      },
    ],
  },
];
