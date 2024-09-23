import { EnumValues } from "zod";

export type optionType = {
  id:string,
  label:string
}

export const JOBTYPES: EnumValues = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Intership",
];

export const JOB_LISTING_COLUMN: string[] = [
  "Roles",
  "Status",
  "Date Posted",
  "Due Date",
  "Job-type",
  "Applicants",
  "Needs",
];

export const JOB_LISTING_DATA = [
  {
    roles: "Software Engineer",
    status: "Live",
    datePosted: "12 Aug 2023",
    dueDate: "12 Sep 2023",
    jobType: "Full-Time",
    applicants: 1,
    needs: 10,
  },
];

export const JOB_APPLICANT_COLUMS: string[] = ["Name"];

export const JOB_APPLICANT_DATA = [
  {
    name: "Wildan Fajar",
    appliedDate: "15 Aug 2023",
  },
];

export const LOCATION_OPTIONS: optionType[] = [
  {
    id: 'Indonesia',
    label: 'Indonesia'
  },
  {
    id: 'Malaysia',
    label: 'Malaysia'
  },
  {
    id: 'Singapura',
    label: 'Singapura'
  },
  {
    id: 'Thailand',
    label: 'Thailand'
  },
]

export const EMPLOYEE_OPTIONS: optionType[] = [
  {
    id: '1-50',
    label:"1-50"
  },
  {
    id: '51-100',
    label:"51-100"
  },
  {
    id: '101-150',
    label:"101-150"
  },
  {
    id: '151-200',
    label:"151-200"
  },
  {
    id: '201-above',
    label:"201-above"
  },
]
