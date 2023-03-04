import { Person } from '../types';

export const prepareVisiblePeople = (
  peopleForRender: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
  sort: string | null,
  order: string | null,
) => {
  let visiblePeople = [...peopleForRender];

  if (query) {
    visiblePeople = visiblePeople.filter(
      person => {
        const allSearchField
        = person.name + person.motherName + person.fatherName;

        return allSearchField
          .toLowerCase().includes(query.toLowerCase());
      },
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length !== 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = String(Math.ceil(person.born / 100));

      return centuries.includes(century);
    });
  }

  if (sort) {
    visiblePeople.sort((p1, p2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return p1[sort].localeCompare(p2[sort]);

        case 'born':
        case 'died':
          return p1[sort] - p2[sort];

        default:
          return 0;
      }
    });
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
