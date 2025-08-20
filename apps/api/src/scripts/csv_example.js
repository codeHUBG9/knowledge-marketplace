#!/usr/bin/env node

/**
 * Example usage of the CSV Difference Processor
 * 
 * This script demonstrates how to use the csv_diff_processor.js utility
 * to remove rows from a larger CSV file that exist in a smaller CSV file.
 */

const path = require('path');
const CSVDiffProcessor = require('./csv_diff_processor');

async function main() {
    console.log('📊 CSV Difference Processor - Example Usage\n');
    
    // Example file paths (you should replace these with your actual file paths)
    const smallerFile = 'your_88_rows_file.csv';
    const largerFile = 'your_132_rows_file.csv';
    const outputFile = 'filtered_output.csv';
    
    console.log('📝 Example: How to use the CSV Difference Processor\n');
    
    console.log('1️⃣  Place your CSV files in the same directory as this script');
    console.log('2️⃣  Update the file paths in this example script');
    console.log('3️⃣  Run the processor with your files');
    console.log('');
    
    console.log('💻 Command line usage:');
    console.log('   cd apps/api');
    console.log(`   node src/scripts/csv_diff_processor.js ${smallerFile} ${largerFile} ${outputFile}`);
    console.log('');
    
    console.log('🔧 Programmatic usage:');
    console.log('   const CSVDiffProcessor = require("./csv_diff_processor");');
    console.log('   const processor = new CSVDiffProcessor();');
    console.log(`   await processor.process("${smallerFile}", "${largerFile}", "${outputFile}");`);
    console.log('');
    
    console.log('📋 What the processor does:');
    console.log('   • Reads your 88-row CSV file (reference)');
    console.log('   • Reads your 132-row CSV file (target)');
    console.log('   • Removes all rows from the 132-row file that exist in the 88-row file');
    console.log('   • Creates a new CSV file with only the unique rows');
    console.log('   • Expected result: approximately 44 unique rows (132 - 88)');
    console.log('');
    
    console.log('⚠️  Important notes:');
    console.log('   • Both CSV files must have the same column structure');
    console.log('   • Row comparison is exact (case-sensitive)');
    console.log('   • Make sure file paths are correct and files exist');
    console.log('');
    
    console.log('🎯 Ready to process your CSV files!');
    console.log('   Update the file paths above and run the processor.');
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { main };