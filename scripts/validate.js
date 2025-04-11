import * as yup from 'yup';

// Define the validation schema for each field
const schema = yup.object().shape({
    profile: yup.object().shape({
        // descriptor
        profileName: yup.string().max(50).required('Profile name is required'),
        cartridgeName: yup.string().max(50).required('Cartridge name is required'),
        bulletName: yup.string().max(50).required('Bullet name is required'),
        shortNameTop: yup.string().max(8).required('Short name top is required'),
        shortNameBot: yup.string().max(8).required('Short name bottom is required'),
        caliber: yup.string().max(50).required('Caliber is required'),
        deviceUuid: yup.string().max(50).notRequired(),
        userNote: yup.string().max(1024).notRequired(),

        // zeroing
        zeroX: yup.number().min(-200000).max(200000).integer().required('Zero X is required'),
        zeroY: yup.number().min(-200000).max(200000).integer().required('Zero Y is required'),

        // lists
        distances: yup.array().of(yup.number().min(100).max(300000).integer().required()).min(1).max(200),
        switches: yup.array().of(
            yup.object().shape({
                // cIdx: yup.number().min(0).max(201).integer().required(),
                cIdx: yup.number().min(0).max(255).integer().required(),
                distanceFrom: yup.mixed().oneOf(['INDEX', 'VALUE']).required(),
                distance: yup.number().min(100).max(300000).integer().required(),
                reticleIdx: yup.number().min(0).max(255).integer().required(),
                zoom: yup.number().min(0).max(255).integer().required(),
            })
        ).min(4),

        // rifle
        scHeight: yup.number().min(-5000).max(5000).integer().required(),
        rTwist: yup.number().min(0).max(10000).integer().required(),
        twistDir: yup.mixed().oneOf(['RIGHT', 'LEFT']).required(),

        // cartridge
        cMuzzleVelocity: yup.number().min(100).max(30000).integer().required(),
        cZeroTemperature: yup.number().min(-100).max(100).integer().required(),
        cTCoeff: yup.number().min(0).max(5000).integer().required(),

        // zero params
        cZeroDistanceIdx: yup.number().min(0).max(255).integer().required(),
        cZeroAirTemperature: yup.number().min(-100).max(100).integer().required(),
        cZeroAirPressure: yup.number().min(3000).max(15000).integer().required(),
        cZeroAirHumidity: yup.number().min(0).max(100).integer().required(),
        cZeroWPitch: yup.number().min(-90).max(90).integer().required(),
        cZeroPTemperature: yup.number().min(-100).max(100).integer().required(),

        // bullet
        bDiameter: yup.number().min(1).max(50000).integer().required(),
        bWeight: yup.number().min(10).max(65535).integer().required(),
        bLength: yup.number().min(1).max(50000).integer().required(),

        // drag model
        bcType: yup.mixed().oneOf(['G1', 'G7', 'CUSTOM']).required(),
        coefRows: yup.array().of(
            yup.object().shape({
                bccd: yup.number().when('bcType', {
                    is: 'G1',
                    then: yup.number().min(0).max(100000).integer().required('bccd must be between 0 and 10 for G1'),
                    is: 'G7',
                    then: yup.number().min(0).max(100000).integer().required('bccd must be between 0 and 5 for G7'),
                    is: 'CUSTOM',
                    then: yup.number().min(0).max(100000).integer().required('bccd must be between 0 and 15 for CUSTOM'),
                }),
                v: yup.number().when('bcType', {
                    is: 'G7',
                    then: yup.number().min(0).max(30000).integer().required('v must be between 0 and 20 for G7'),
                    is: 'G1',
                    then: yup.number().min(0).max(30000).integer().required('v must be between 0 and 10 for G1'),
                    is: 'CUSTOM',
                    then: yup.number().min(0).max(100).integer().required('v must be between 0 and 25 for CUSTOM'),
                }),
            })
        ).when('bcType', {
            is: 'G1',
            then: yup.array().min(1).max(5).required('For G1, coefRows must contain between 2 and 5 items'),
            is: 'G7',
            then: yup.array().min(1).max(5).required('For G7, coefRows must contain between 3 and 6 items'),
            is: 'CUSTOM',
            then: yup.array().min(1).max(200).required('For CUSTOM, coefRows must contain between 1 and 10 items'),
        }),
    }),
});


// Validate the data
export const validateA7P = (data) => {
    try {
        const validData = schema.validateSync(data, { abortEarly: false })
        // console.log('Validation succeeded:', validData);
    } catch (error) {
        // console.log('Validation failed:', error.errors);
        throw error
    }
}
