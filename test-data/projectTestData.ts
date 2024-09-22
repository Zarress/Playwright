import { faker } from '@faker-js/faker';
import { convertDateToLocaleString, getFormattedDate } from '../helpers/dateHelper';

export const simpleProjectData = {
    title: faker.lorem.words({min: 1, max: 10}),
    description: faker.lorem.words({min: 1, max: 20}),
    dueDate: convertDateToLocaleString(faker.date.between({from: '2000-01-01', to: '2050-12-31'}))
};

export const simpleTaskName = faker.lorem.words({min: 1, max: 20});