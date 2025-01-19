// 'use client'

import Form from 'next/form'
import { db } from "#/lib/db";
import { StudentForm } from './scoreForm';
import { auth } from '#/auth';

export default async function Page() {
  return (
    <div>
      <StudentForm/>
    </div>
  );
}