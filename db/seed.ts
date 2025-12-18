import { db } from './index';
import { flows } from './schema';
import 'dotenv/config';

async function seed() {
    console.log('🌱 Seeding database...');

    const mockUser = 'user_2pgmNf5l3mNjGqG5B5B5B5B5B5B'; // Placeholder Clerk ID

    const seedFlows = [
        {
            userId: mockUser,
            title: 'Java Mastery',
            description: 'Mastering Java core and spring boot.',
            tags: ['Java', 'Backend', 'OOP'],
        },
        {
            userId: mockUser,
            title: 'JavaScript Evolution',
            description: 'From ES6 to modern frameworks.',
            tags: ['JS', 'Frontend', 'Fullstack'],
        },
        {
            userId: mockUser,
            title: 'Python for Data Science',
            description: 'Using NumPy, Pandas and Scikit-Learn.',
            tags: ['Python', 'Data', 'AI'],
        },
    ];

    try {
        await db.insert(flows).values(seedFlows);
        console.log('✅ Seeding completed successfully!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        process.exit(0);
    }
}

seed();
