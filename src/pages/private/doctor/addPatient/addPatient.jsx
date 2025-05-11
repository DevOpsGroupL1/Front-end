import { GButton, GDatePicker, GTextField, GTimePicker } from '../../../../components'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom';
import { useApiSend } from '../../../../hooks/useApi';
import { scheduleMedication } from '../../../../urls/doctor';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const AddPatient = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)

    const [dosages, setDosages] = useState([{ id: Date.now() }]);

    const {
        control,
        register,
        handleSubmit,
    } = useForm({})

    const { mutate, isPending } = useApiSend(
        scheduleMedication,
        () => {
            toast.success("Prescription Added Successfully")
            navigate(-1)
        },
        () => {

        }
    )

    const addDosage = () => {
        setDosages([...dosages, { id: Date.now() }]);
    };


    const removeDosage = (id) => {
        if (dosages.length > 1) {
            setDosages(dosages.filter(dosage => dosage.id !== id));
        }
    };

    const onSubmit = (formData) => {
        const combineDateTime = (date, time) => {
            if (!date || !time) return null;

            const fullDateTime = new Date(date);

            const [hours, minutes, seconds] = typeof time === "string"
                ? time.split(":").map(Number)
                : [new Date(time).getHours(), new Date(time).getMinutes(), new Date(time).getSeconds()];

            fullDateTime.setHours(hours);
            fullDateTime.setMinutes(minutes);
            fullDateTime.setSeconds(seconds);

            const year = fullDateTime.getFullYear();
            const month = String(fullDateTime.getMonth() + 1).padStart(2, '0');
            const day = String(fullDateTime.getDate()).padStart(2, '0');
            const hr = String(fullDateTime.getHours()).padStart(2, '0');
            const min = String(fullDateTime.getMinutes()).padStart(2, '0');
            const sec = String(fullDateTime.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day}T${hr}:${min}:${sec}`;
        };


        const dosagesArray = dosages.map(dosage => ({
            description: formData[`dosageDescription-${dosage.id}`],
            intakeTime: formData[`intakeTime-${dosage.id}`],
            dosage: formData[`dosage-${dosage.id}`],
            dateCreated: new Date().toISOString()
        }));

        const payload = {
            user: null,
            userId: state?.id,
            doctor: null,
            doctorId: user?.user?.id,
            drugName: formData.drugName,
            description: formData.medicalDescription,
            prescription: formData.prescription,
            startDate: combineDateTime(formData.startDate, formData.startTime),
            endDate: combineDateTime(formData.endDate, formData.endTime),
            ailment: formData.ailment,
            completed: false,
            dateCreated: new Date().toISOString(),
            dosages: dosagesArray
        };

        mutate(payload)
        console.log("payload", payload);
    }

    return (
        <div className="w-full flex max-h-[93vh] h-full items-start justify-center !overflow-y-auto pt-8">
            <form className='w-[30%] flex flex-col gap-4 !py-8 my-8'>
                <h2 className={"text-2xl text-center !text-[#0F2D6B] font-bold !mb-10"}>
                    {`Add Prescription for ${state?.name}`}
                </h2>
                <GTextField
                    label="Patient Name"
                    name="patientName"
                    register={register}
                    placeholder={"Patient Name"}
                />

                <GTextField
                    label={"Drug Name"}
                    name="drugName"
                    register={register}
                    placeholder={"Drug Name"}
                />

                <GTextField
                    label={"Prescription"}
                    name="prescription"
                    register={register}
                    placeholder={"Prescription"}
                />

                <GTextField
                    label={"Medical Description"}
                    name="medicalDescription"
                    register={register}
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
                        control={control}
                    />
                </div>

                <GTextField
                    label={"Ailment"}
                    name="ailment"
                    placeholder={"Sickness"}
                    register={register}
                />

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
                        control={control}
                    />
                </div>

                <div className='flex w-full flex-col gap-4 items-center'>
                    <div className='flex items-center justify-between w-full'>
                        <p className='text-lg font-medium !text-[#0F2D6B]'>Dosages</p>
                        <p className='!text-green-500 !text-sm cursor-pointer' onClick={addDosage}>Add more</p>
                    </div>

                    {dosages.map((dosage, index) => (
                        <div key={dosage.id} className='w-full p-4 rounded-md mb-2'>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='font-medium text-xs !mb-2 !text-[#0F2D6B]'>Dosage {index + 1}</p>
                                {dosages.length > 1 && (
                                    <p className='cursor-pointer !text-red-500 text-sm' onClick={()=>removeDosage(dosage.id)}>Remove</p>

                                )}
                            </div>
                            <GTextField
                                label={"Dosage"}
                                name={`dosage-${dosage.id}`}
                                placeholder={"Dosage"}
                                register={register}
                                className="!mb-2 !w-full"
                            />


                            <GTextField
                                label={"Dosage Description"}
                                name={`dosageDescription-${dosage.id}`}
                                placeholder={"Morning Dosage"}
                                register={register}
                                className="!mb-2 !w-full"
                            />
                            <div className='w-full'>
                                <GTimePicker
                                    label={"Intake Time"}
                                    name={`intakeTime-${dosage.id}`}
                                    placeholder={"Intake Time"}
                                    control={control}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <GButton
                    type='submit'
                    label={"Add Prescription"}
                    onClick={handleSubmit(onSubmit)}
                    isLoading={isPending}
                />
            </form>
        </div>
    )
}