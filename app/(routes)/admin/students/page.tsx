import {columns} from './coldef'
import {DataTable} from '@/components/Admin/Tables/DataTable'
import {getStudents} from '@/actions/student'
import Link from 'next/link'

export const revalidate = 0

const TopHeader = () => (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Students</h1>
        <Link href={'/admin/students/add'}>
            <div className="btn btn-primary">Add Student</div>
        </Link>
    </div>
)

const StudentsTable = async () => {
    const students = await getStudents()
    return <DataTable columns={columns} data={students}/>
}

export default function StudentsAdmin() {
    return (
        <>
            <TopHeader/>
            <StudentsTable/>
        </>
    )
}
