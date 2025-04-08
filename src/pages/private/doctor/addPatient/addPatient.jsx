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
                    label={"Drug Name"}
                    name="drugName"
                    placeholder={"Drug Name"}
                />

                <GTextField
                    label={"Prescription"}
                    name="prescription"
                    placeholder={"Prescription"}
                />

                <GTextField
                    label={"Medical Description"}
                    name="medicalDescription"
                    placeholder={"Medical Description"}
                />

                <div className='flex gap-4 items-center'>
                    <GDatePicker
                        label={"Start Date"}
                        name="startDate"
                        placeholder={"Start Date"}
                        control={control}
                    />
                    <GTimePicker
                        label={"Time"}
                        name="startTime"
                        placeholder={"Start Time"}
                    />
                </div>

                <div className='flex gap-4 items-center'>
                    <GDatePicker
                        label={"End Date"}
                        name="endDate"
                        placeholder={"End Date"}
                        control={control}
                    />
                    <GTimePicker
                        label={"End Time"}
                        name="endTime"
                        placeholder={"End Time"}
                    />
                </div>

                <div className='flex w-full flex-col gap-4 items-center'>
                    <p>Dosage</p>
                    <GTextField
                        label={"Dosage"}
                        name="dosage"
                        placeholder={"Dosage"}
                    />
                    <GTextField
                        label={"description"}
                        name="description"
                        placeholder={"description"}
                    />
                    <div className='!w-full'>
                        <GTimePicker
                            label={"Intake Time"}
                            name="intakeTime"
                            placeholder={"Intake Time"}
                        />
                    </div>

                </div>


                <GButton type='submit' label={"Add Patient"} />
            </form>
        </div>

    )
}
