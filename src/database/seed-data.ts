
interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending: Lorem ipsum dolor, sit amet consectetur adipisicing elit. ' ,
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'In-Progress: Lorem dolo fetch pafrag kolome vjiahha fjfjfjfj kdjjaii' ,
            status: 'in-progress',
            createdAt: Date.now() - 10000000
        },
        {
            description: 'Finished: maria se siente sola todos los días por eso hay que estar pendiente' ,
            status: 'finished',
            createdAt: Date.now() - 1000000
        }
    ]
}