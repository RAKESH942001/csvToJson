const citizens = require('./citizens');
const locations = require('./locations');
const regions = require('./regions');
const regionalcompensation = require('./regionalcompensation');
const gendercompensation = require('./gendercompensation');
const agecompensation = require('./ageCompensation');

const findRegion = (citizen, locations) => {
    const newRegion =
        locations.find((ele) => ele.location === citizen.location).region;
    const newRegType = regions.find((ele) => ele.region === newRegion).type;
    return { newRegion, newRegType };

}
const addfields = (citizens, locations) =>

    citizens.map((citizen) => {
        const citizenRegionType = findRegion(citizen, locations);

        return ({
            ...citizen,
            region: citizenRegionType.newRegion,
            regionType: citizenRegionType.newRegType,

        })
    });

const findcompensation = (citizen, regionalcompensation) => {
    const regCompensation =
        regionalcompensation.find((ele) => ele.regionType === citizen.regionType).baseCompensation;
    return regCompensation;
}

const addRegCompensation = (citizens, regionalcompensation) =>

    citizens.map((citizen) => {
        const citizenRegionCompensation = findcompensation(citizen, regionalcompensation);

        return ({
            ...citizen,
            baseCompensation: citizenRegionCompensation