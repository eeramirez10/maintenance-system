import React, { useState } from 'react'
import { Step } from '../interface/equipment.type'

const stepState: Step = {
    stepDescription: '',
    routineType: 'preventivo',
    criteria: {
        name: '',
        type: 'date',
        currentValue: '',
        minValue: 0,
        maxValue: 0,
    },
    // Preventivo
    priorityPercentage: 0,
    estimatedTime: 0,
    actualTime: 0,
    plannedDowntime: 0,
    actualDowntime: 0,
    // Correctivo
    failureCategory: '',
    failureDescription: '',
    repairCost: 0,
    repairTime: 0,
    failureStartDate: '',
    failureEndDate: '',
    // Fotos
    photoBefore: '',
    photoAfter: '',
}


export const useStep = () => {

    const [step, setStep] = useState<Step>(stepState)

    const resetStepValues = () => {
        setStep({
            stepDescription: '',
            routineType: 'preventivo',
            criteria: {
                name: '',
                type: 'date',
                currentValue: '',
                minValue: 0,
                maxValue: 0,
            },
            // Preventivo
            priorityPercentage: 0,
            estimatedTime: 0,
            actualTime: 0,
            plannedDowntime: 0,
            actualDowntime: 0,
            // Correctivo
            failureCategory: '',
            failureDescription: '',
            repairCost: 0,
            repairTime: 0,
            failureStartDate: '',
            failureEndDate: '',
            // Fotos
            photoBefore: '',
            photoAfter: '',
        })
    }


    const handleStepChange = (
        field: string,
        value: string | number
    ) => {
        setStep((prev) => {
            const updated = { ...prev };
            console.log(field)
            if (
                field === 'stepDescription' ||
                field === 'routineType' ||
                field === 'priorityPercentage' ||
                field === 'estimatedTime' ||
                field === 'actualTime' ||
                field === 'plannedDowntime' ||
                field === 'actualDowntime' ||
                field === 'failureCategory' ||
                field === 'failureDescription' ||
                field === 'repairCost' ||
                field === 'repairTime' ||
                field === 'failureStartDate' ||
                field === 'failureEndDate' ||
                field === 'photoBefore' ||
                field === 'photoAfter'
            ) {
                (updated as any)[field] = value;
            } else {
                // Campo de criteria (name, type, currentValue, minValue, maxValue)
                if (!updated.criteria) {
                    updated.criteria = {
                        name: '',
                        type: 'number',
                        currentValue: 0,
                    };
                }
                updated.criteria[field] = value;
            }
            return updated;
        });
    };

    const onSave = (step: Step) => {
        console.log(step)
    }



    return {
        step,
        resetStepValues,
        handleStepChange,
        onSave
    }


}
