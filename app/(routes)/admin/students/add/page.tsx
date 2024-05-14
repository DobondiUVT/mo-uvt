"use client"

import * as XLSX from 'xlsx'
import { useState } from "react";
import { columns } from './coldef';
import { DataTable } from '@/components/Admin/Tables/DataTable';
import { buttonVariants } from '@/components/ui/button';
import { saveStudentsFromFile } from '@/actions/student';

export type FileStudent = {
    sn: string
    name: string
    email: string
    faculty: string
    specialization: string
}

export default function AddStudents() {
    const [file, setFile] = useState<any>(null)
    const [students, setStudents] = useState<FileStudent[]>([])
    const handleChange = (e: any) => {
        const file = e.target.files[0]
        setFile(file)

        const reader = new FileReader();
        reader.onload = e => {
            const bstr = e.target?.result;
            const wb = XLSX.read(bstr, { type: "array" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            data.forEach((row: any, index: number) => {
                if (index === 0) return
                const [sn, name, email, faculty, specialization] = row
                setStudents((students) => [...students, {
                    sn, name, email, faculty, specialization
                }])
            })
        };
        reader.readAsArrayBuffer(file);
    }

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold">Add students from file</h1>
            </div>
            <label className='mb-4 block cursor-pointer' htmlFor="excel-upload">
                <div className={buttonVariants({ variant: 'outline' })}>Upload Excel</div>
                <input hidden type="file" name="excel-upload" id="excel-upload" onChange={handleChange} />
            </label>
            {
                students.length > 0 && (
                    <>
                        <div className="mb-6">
                            <DataTable columns={columns} data={students} />
                        </div>
                        <button onClick={() => {
                            saveStudentsFromFile(students)
                        }} className={buttonVariants({ variant: 'default' })}>Save students to database</button>
                    </>
                )
            }
        </div>
    )
}
