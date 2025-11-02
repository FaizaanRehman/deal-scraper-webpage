import { refreshDeals } from '@/lib/dealService';

async function main() {
  try {
    console.log('🔄 Starting daily deal refresh...');
    await refreshDeals();
    console.log('✅ Deals refreshed successfully!');
  } catch (err) {
    console.error('❌ Failed to refresh deals:', err);
    process.exit(1);
  }
}

main();
