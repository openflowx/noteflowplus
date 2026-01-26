import { db } from './index';
import { flows, tags, flowTags } from './schema';
import 'dotenv/config';
import { eq } from 'drizzle-orm';

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
    await db.transaction(async (tx) => {
        for (const { tags: tagNames, ...flowData } of seedFlows) {
            const [newFlow] = await tx
                .insert(flows)
                .values(flowData)
                .returning({ id: flows.id });

            for (const tagName of tagNames) {
                let tag = await tx.query.tags.findFirst({
                    where: eq(tags.name, tagName),
                });

                if (!tag) {
                    [tag] = await tx.insert(tags).values({ name: tagName }).returning();
                }

                await tx
                    .insert(flowTags)
                    .values({
                        flowId: newFlow.id,
                        tagId: tag.id,
                    })
                    .onConflictDoNothing();
            }
        }
    });

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
} catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
}
