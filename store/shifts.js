export const state = () => ({
    list: [
        {
            title: 'Shift 1',
            description: 'Shift 1 description',
            info: [
                {
                    date: new Date('01-08-2023'),
                    start: new Date('01-08-2023'),
                    end: new Date('01-08-2023'),
                    price: 50,
                    type: 'Telephone'
                },
            ],
        },
    ]
  })
  export const mutations = {
    add(state, shift) {
        const info = shift.info.map((item, k) => {
            item.date = shift.dates[k]
            return item
        })
        shift.info = info
        state.list.push(shift)
    },
    remove(state, shift) {
        state.list.splice(state.list.indexOf(shift), 1)
    },
  }