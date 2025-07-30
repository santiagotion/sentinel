import * as admin from 'firebase-admin';
import { Keyword } from '../functions/models/types';

// Initialize Firebase Admin (you'll need to set up service account)
admin.initializeApp();
const db = admin.firestore();

// No default keywords - users will add them via the frontend
const sampleKeywords: Omit<Keyword, 'id'>[] = [];

async function seedKeywords() {
  console.log('🌱 Seeding sample keywords...');
  
  const batch = db.batch();
  
  sampleKeywords.forEach((keyword) => {
    const docRef = db.collection('keywords').doc();
    batch.set(docRef, {
      ...keyword,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });
  
  await batch.commit();
  
  console.log(`✅ Successfully seeded ${sampleKeywords.length} keywords`);
}

async function createIndexes() {
  console.log('📚 Creating Firestore indexes...');
  
  // Note: Indexes are typically created via firestore.indexes.json
  // This is just for reference - the actual indexes will be created during deployment
  
  const indexQueries = [
    // Test compound queries to trigger index creation
    db.collection('twitter_posts')
      .where('keyword', '==', 'test')
      .orderBy('timestamp', 'desc')
      .limit(1),
    
    db.collection('keywords')
      .where('isActive', '==', true)
      .orderBy('priority', 'desc')
      .limit(1)
  ];
  
  // Execute queries to ensure indexes exist
  for (const query of indexQueries) {
    try {
      await query.get();
    } catch (error) {
      console.log('⚠️  Index may need to be created:', (error as Error).message);
    }
  }
  
  console.log('✅ Index creation checks completed');
}

async function main() {
  try {
    await seedKeywords();
    await createIndexes();
    
    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { seedKeywords, createIndexes };