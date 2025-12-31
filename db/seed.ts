import { db } from './index';
import { flows, tags, flowTags } from './schema';
import 'dotenv/config';
import { eq } from 'drizzle-orm';

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
        await db.transaction(async (tx) => {
            for (const { tags: tagNames, ...flowData } of seedFlows) {
                // 1. Insert flow
                const [newFlow] = await tx.insert(flows).values(flowData).returning({ id: flows.id });

                // 2. Handle tags
                for (const tagName of tagNames) {
                    // Check if tag exists
                    let tag = await tx.query.tags.findFirst({
                        where: eq(tags.name, tagName),
                    });

                    if (!tag) {
                        // Insert new tag
                        const [insertedTag] = await tx.insert(tags)
                            .values({ name: tagName })
                            .returning();
                        tag = insertedTag;
                    }

                    // 3. Link tag to flow in flowTags junction table
                    await tx.insert(flowTags).values({
                        flowId: newFlow.id,
                        tagId: tag.id,
                    }).onConflictDoNothing();
                }
            }
        });

        console.log('✅ Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seed();
