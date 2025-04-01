import React from 'react'
import { GButton, GDatePicker, GTextField, GTimePicker } from '../../../../components'
import { useForm } from 'react-hook-form'

export const AddPatient = () => {

    const {
        control,
    } = useForm({
    
    })

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form className='w-[30%] flex flex-col gap-4'>
                <h2 className={"text-2xl text-center !text-[#0F2D6B] font-bold !mb-10"}>
                    Add Patient
                </h2>
                <GTextField
                    label="Paitent Name"
                    name="patientName"
                    placeholder={"Patient Name"}
                />

                <GTextField
                    label={"Medical Description"}
                    name="medicalDescription"
                    placeholder={"Medical Description"}
                />

                <div className='flex gap-4 items-center'>
                    <GDatePicker
                        label={"Medication Date"}
                        name="medicationDate"
                        placeholder={"Medication Date"}
                        control={control}
                    />
                    <GTimePicker
                        label={"Time"}
                        name="medicationTime"
                        placeholder={"Medication Time"}
                    />
                </div>


                <GButton type='submit' label={"Add Patient"} />
            </form>
        </div>

    )
}
