import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from "./academicManagement.type"

export type TStudent = {
    profileImg: string
    _id: string
    id: string
    user: TUser
    name: TName
    gender: string
    dateOfBirth: string
    email: string
    contactNo: string
    emergencyContactNo: string
    bloodGroup: string
    presentAddress: string
    permanentAddress: string
    guardians: TGuardians
    localGuardians: TLocalGuardians
    profileImage: string
    admissionSemester: TAcademicSemester
    academicDepartment: TAcademicDepartment
    academicFaculty: TAcademicFaculty
    isDeleted: boolean
    fullName: string
}

export type TUser = {
    needsPasswordChange: boolean
    _id: string
    id: string
    email: string
    needPasswordChange: boolean
    role: string
    status: string
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type TName = {
    firstName: string
    middleName: string
    lastName: string
    _id: string
}

export type TGuardians = {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
    _id: string
}

export type TLocalGuardians = {
    name: string
    occupation: string
    contactNumber: string
    address: string
    _id: string
}
