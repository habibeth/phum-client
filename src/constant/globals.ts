export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const gender = ['Male', 'Female', 'Other'];

export const bloodGroup = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
];


export const monthsName = months?.map(item => ({
    label: item,
    value: item,
}))

export const genderOptions = gender?.map(item => ({
    label: item,
    value: item.toLowerCase(),
}))

export const bloodGroupOptions = bloodGroup?.map(item => ({
    label: item,
    value: item,
}))